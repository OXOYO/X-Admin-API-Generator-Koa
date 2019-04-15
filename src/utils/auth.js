/**
 * Created by OXOYO on 2017/10/23.
 */

import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import PlatformModel from '../apps/Platform/Model'

export default {
  // 生成token
  sign: function (data) {
    let token = jsonwebtoken.sign(data, config.cookie.getItem('secret'), {
      algorithm: 'HS256',
      expiresIn: '1d'
    })
    return token
  },
  // token 验证
  verifyToken: async function (ctx, next) {
    let currentPath = ctx.path.slice(config.api.prefix.length)
    let unlessAPI = config.auth.unless.verifyToken.api
    if (!unlessAPI.length || unlessAPI.includes(currentPath)) {
      await next()
    } else {
      // 支持多种方式传递token
      let key = config.cookie.getItem('token')
      let token
      let decoded
      // 校验结果
      let verifyRes = {
        // 标识
        flag: false,
        // 数据
        data: {}
      }
      if (ctx.body && Object.prototype.hasOwnProperty.call(ctx.body, key)) {
        token = ctx.body[key]
      } else if (ctx.query && Object.prototype.hasOwnProperty.call(ctx.query, key)) {
        token = ctx.query[key]
      } else if (ctx.headers && Object.prototype.hasOwnProperty.call(ctx.headers, key)) {
        token = ctx.headers[key]
      } else {
        token = null
      }
      // 1.判断是否存在token
      if (token) {
        try {
          // 2.1.verify验证token
          decoded = jsonwebtoken.verify(token, config.cookie.getItem('secret'), { algorithm: 'HS256' })
          // 2.1.验证token是否过期
          if (decoded.exp * 1000 <= new Date()) {
            verifyRes = {
              flag: false,
              data: {
                code: 9999,
                msg: 'token过期！请重新登录！',
                data: {}
              }
            }
          } else {
            verifyRes = {
              flag: true,
              data: {}
            }
          }
        } catch (err) {
          verifyRes = {
            flag: false,
            data: {
              code: 9999,
              msg: 'token校验失败！请重新登录！',
              data: err
            }
          }
        }
      } else {
        verifyRes = {
          flag: false,
          data: {
            code: 9999,
            msg: 'token无效！请重新登录！',
            data: {}
          }
        }
      }
      // 判断校验结果，分别处理
      if (verifyRes.flag) {
        // token有效，传递给上下文
        ctx.state['userInfo'] = decoded
        await next()
      } else {
        // token无效，直接返回
        ctx.body = verifyRes.data
      }
    }
  },
  // 用户权限验证
  verifyAccess: async function (ctx, next) {
    let currentPath = ctx.path.slice(config.api.prefix.length)
    let resourceName = ctx.headers['current-name']
    let unlessAPI = config.auth.unless.verifyAccess.api
    let unlessResource = config.auth.unless.verifyAccess.resource
    let userInfo = ctx.state.userInfo
    // 过滤排除接口
    if (!unlessAPI.length || unlessAPI.includes(currentPath) || !unlessResource.length || unlessResource.includes(resourceName) || (userInfo && userInfo.type === 0)) {
      await next()
    } else {
      // FIXME 系统接口规范定义： GET 只读接口 其他均为写接口
      let permissionType = ['GET'].includes(ctx.method.toUpperCase()) ? 0 : 1
      if (resourceName) {
        let currentUserGroup = parseInt(ctx.headers['current-group'])
        if (userInfo && userInfo.userId && currentUserGroup) {
          let verifyFlag = false
          // 查询用户资源数据
          let userResourcesRes = await PlatformModel.user.getUserResources(userInfo.userId)
          let userResources = userResourcesRes.userResources || []
          let userGroups = userResourcesRes.user_groups || []
          let resource = userResources.find(item => item.name === resourceName)
          let group = userGroups.find(item => item.id === currentUserGroup)
          if (resource) {
            if (group) {
              let permissionMap = {}
              group.permission.split(',').map(item => {
                let [ id, ...permission ] = item.split('|').map(item => parseInt(item))
                permissionMap[id] = permission
              })
              verifyFlag = permissionMap[resource.id] && permissionMap[resource.id].includes(permissionType)
            }
          } else {
            // 查询所有资源数据
            let allResourcesRes = await PlatformModel.resource.getAllResourceList({
              enable: [1],
              type: ['module-system', 'module-app', 'module-link']
            })
            let parentResource = allResourcesRes.rows.find(item => item.name === resourceName)
            if (parentResource) {
              let resource = userResources.find(item => item.parent_id === parentResource.id)
              verifyFlag = !!resource
            }
          }
          // 处理结果
          if (verifyFlag) {
            await next()
          } else {
            // 动态获取管理员
            let adminInfo = await PlatformModel.user.getOneAdmin()
            let contactAdmin = adminInfo && adminInfo.account && adminInfo.name ? '请联系管理员：' + adminInfo.name + ' (' + adminInfo.account + ')' : ''
            ctx.body = {
              status: 5000,
              msg: '鉴权失败！' + contactAdmin,
              data: {
                verifyFlag
              }
            }
          }
        } else {
          ctx.body = {
            status: 9999,
            msg: '用户信息无效！请重新登录！',
            data: {}
          }
        }
      } else {
        ctx.body = {
          status: 5000,
          msg: '参数错误，用户权限验证失败！',
          data: {}
        }
      }
    }
  }
}
