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
            code: res.code
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
    },
    doVerifyAccess: async (ctx, next) => {
      await next()
      let reqQuery = ctx.query
      let userInfo = ctx.state.userInfo
      // 资源名称
      let resourceName = reqQuery.name || ''
      let res
      if (userInfo && userInfo.userId && resourceName) {
        let verifyFlag = false
        let userResources
        let userResourcesRes
        if (userInfo.type === 0) {
          verifyFlag = true
        } else {
          // 查询用户资源数据
          userResourcesRes = await Model.user.getUserResources(userInfo.userId)
          userResources = userResourcesRes.userResources || []
          let resource = userResources.find(item => item.name === resourceName)
          if (resource) {
            verifyFlag = true
          } else {
            // 查询所有资源数据
            let allResourcesRes = await Model.resource.getAllResourceList({
              enable: [1],
              type: ['module-system', 'module-app', 'module-link']
            })
            let parentResource = allResourcesRes.rows.find(item => item.name === resourceName)
            let resource = userResources.find(item => item.parent_id === parentResource.id)
            verifyFlag = !!resource
          }
        }
        // 处理结果
        if (verifyFlag) {
          res = {
            code: 200,
            msg: '鉴权成功！',
            data: {
              verifyFlag,
              resources: userResources,
              dd: userResourcesRes
            }
          }
        } else {
          // 动态获取管理员
          let adminInfo = await Model.user.getOneAdmin()
          let contactAdmin = adminInfo && adminInfo.account && adminInfo.name ? '请联系管理员：' + adminInfo.name + ' (' + adminInfo.account + ')' : ''
          res = {
            code: 200,
            msg: '鉴权失败！' + contactAdmin,
            data: {
              verifyFlag
            }
          }
        }
      } else {
        res = {
          code: 5001,
          msg: '鉴权失败，上送参数有误！',
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
  },
  resource: {
    getAllResourceList: async (ctx, next) => {
      await next()
      let reqQuery = ctx.query
      // 查询结果
      let res = await Model.resource.getAllResourceList(reqQuery)
      // 处理结果
      if (res) {
        res = {
          code: 200,
          msg: '查询资源列表成功！',
          data: {
            count: res.count,
            list: res.rows
          }
        }
      } else {
        res = {
          code: 5000,
          msg: '查询资源列表失败！',
          data: {}
        }
      }
      ctx.body = res
    }
  }
}
