/**
 * Created by OXOYO on 2017/10/27.
 */

import Model from './Model'

export default {
  // 获取角色列表
  getRoleList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    let userInfo = ctx.state.userInfo
    // 查询结果
    let res = await Model.getRoleList(reqQuery, userInfo)
    // 处理结果
    if (res) {
      res = {
        code: 200,
        msg: ctx.__('L00026'),
        data: {
          count: res.count,
          list: res.rows
        }
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L00027'),
        data: {}
      }
    }

    ctx.body = res
  },
  // 获取全部角色列表
  getAllRoleList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    let userInfo = ctx.state.userInfo
    // 查询结果
    let res = await Model.getAllRoleList(reqQuery, userInfo)
    // 处理结果
    if (res) {
      res = {
        code: 200,
        msg: ctx.__('L00026'),
        data: {
          count: res.count,
          list: res.rows
        }
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L00027'),
        data: {}
      }
    }

    ctx.body = res
  },
  // 添加角色
  doAddRole: async (ctx, next) => {
    await next()
    // 查询结果
    let userInfo = ctx.state.userInfo
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = {
      ...reqBody,
      create_user_id: userInfo.userId,
      create_time: timeNow,
      update_time: timeNow
    }
    if (reqBody.resource_id instanceof Array) {
      data['resource_id'] = reqBody.resource_id.join(',')
    }
    let res
    if (data.name) {
      res = await Model.doAddRole(data)
      // 最后一项为插入成功与否标识
      let [resTitle] = res
      let isSuccess = res.pop()
      // 处理结果
      if (isSuccess) {
        res = {
          code: 200,
          msg: ctx.__('L00028'),
          data: resTitle
        }
      } else if (resTitle) {
        res = {
          code: 5000,
          msg: ctx.__('L00029'),
          data: resTitle
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00030'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00031'),
        data: {}
      }
    }

    ctx.body = res
  },
  // 删除角色
  doRemoveRole: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let data = reqBody
    let res
    if ((Object.keys(data)).length) {
      res = await Model.doRemoveRole(data)
      // 处理结果
      if (res) {
        res = {
          code: 200,
          msg: ctx.__('L00032'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00033'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00034'),
        data: {}
      }
    }

    ctx.body = res
  },
  // 编辑角色
  doEditRole: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = {
      ...reqBody,
      update_time: timeNow
    }
    if (reqBody.resource_id instanceof Array) {
      data['resource_id'] = reqBody.resource_id.join(',')
    }
    let res
    if (data.id) {
      res = await Model.doEditRole(data)
      // 处理结果
      if (res && res[0]) {
        res = {
          code: 200,
          msg: ctx.__('L00035'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00036'),
          data: res
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00037'),
        data: {}
      }
    }

    ctx.body = res
  }
}
