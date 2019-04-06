/**
 * Created by OXOYO on 2017/10/27.
 */

import axios from 'axios'
import Model from './Model'
import utils from '../../utils/'
import config from '../../config'

export default {
  user: {
    // 执行登录
    doSignIn: async (ctx, next) => {
      await next()
      let reqBody = ctx.request.body
      let res
      if (reqBody && reqBody.account && reqBody.password) {
        // 执行平台内用户查询
        // 加密密码
        let password = utils.des.encrypt(config.system.secret, reqBody.password, 0)
        console.log('password', password)
        res = await Model.user.doSignIn({
          account: reqBody.account,
          password: password
        })
        let data = {
          userInfo: res
        }
        // 处理结果
        if (res) {
          let userInfo = {
            account: res.account,
            userId: res.id,
            type: res.type,
            status: res.status
          }
          let token = utils.auth.sign(userInfo)

          if (token) {
            // 设置返回token
            data[config.cookie.getItem('token')] = token
            res = {
              code: 200,
              msg: '登录成功！',
              data: data
            }
          } else {
            res = {
              code: 5000,
              msg: '登录失败，生成Token失败！',
              data: data
            }
          }
        } else {
          // 动态获取管理员
          let adminInfo = await Model.user.getOneAdmin()
          res = {
            code: 5000,
            msg: '登录失败！' + (adminInfo && adminInfo.account && adminInfo.name ? '请联系管理员 ' + adminInfo.name + ' (' + adminInfo.account + ')' : ''),
            data: data
          }
        }
      } else {
        res = {
          code: 5001,
          msg: '登录失败，上送参数有误！',
          data: {}
        }
      }
      ctx.body = res
    },
    // 获取用户基本信息
    getBaseInfo: async (ctx, next) => {
      await next()
      // TODO 处理参数
      let userInfo = ctx.state.userInfo
      let res
      if (userInfo && userInfo.userId) {
        // 查询结果
        res = await Model.user.getBaseInfo(userInfo.userId)
        // 处理结果
        if (res) {
          res = {
            code: 200,
            msg: '获取用户基本信息成功！',
            data: res
          }
        } else {
          res = {
            code: 5000,
            msg: '获取用户基本信息失败！',
            data: res
          }
        }
      } else {
        res = {
          code: 5001,
          msg: '获取用户基本信息失败，上送参数有误！',
          data: {}
        }
      }
      ctx.body = res
    }
  },
  components: {
    getBingWallpaper: async (ctx, next) => {
      await next()
      let reqQuery = ctx.query
      let bingApi = 'http://cn.bing.com/HPImageArchive.aspx'
      console.log('reqQuery', reqQuery)
      let payload = {
        format: reqQuery.format || 'js',
        idx: reqQuery.idx || 0,
        n: reqQuery.n || 1
      }
      let res
      try {
        res = await axios.get(bingApi, {
          params: payload
        })
        res = {
          code: 200,
          msg: '获取bing壁纸成功！',
          data: res.data
        }
      } catch (err) {
        res = {
          code: 5000,
          msg: '获取bing壁纸失败',
          data: err
        }
      }
      ctx.body = res || {}
    }
  }
}
