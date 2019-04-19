/**
 * Created by OXOYO on 2017/10/27.
 */

import Model from './Model'

export default {
  // 获取账号列表
  getUserList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    let userInfo = ctx.state.userInfo
    // 查询结果
    let res = await Model.getUserList(reqQuery, userInfo)
    // 处理结果
    if (res) {
      res = {
        code: 200,
        msg: ctx.__('L00041'),
        data: {
          count: res.count,
          list: res.rows
        }
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L00042'),
        data: {}
      }
    }

    ctx.body = res
  },
  // 添加账号
  doAddUser: async (ctx, next) => {
    await next()
    // 查询结果
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = {
      ...reqBody,
      create_time: timeNow,
      update_time: timeNow
    }
    let res
    if (data.account && data.name) {
      res = await Model.doAddUser(data)
      // 最后一项为插入成功与否标识
      let [resAccount] = res
      let isSuccess = res.pop()
      // 处理结果
      if (isSuccess) {
        res = {
          code: 200,
          msg: ctx.__('L00043'),
          data: resAccount
        }
      } else if (resAccount) {
        res = {
          code: 5000,
          msg: ctx.__('L00044'),
          data: resAccount
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00045'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00046'),
        data: {}
      }
    }

    ctx.body = res
  },
  // 删除账号
  doRemoveUser: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let data = reqBody
    let res
    if ((Object.keys(data)).length) {
      res = await Model.doRemoveUser(data)
      // 处理结果
      if (res) {
        res = {
          code: 200,
          msg: ctx.__('L00047'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00048'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00049'),
        data: {}
      }
    }

    ctx.body = res
  },
  // 编辑账号
  doEditUser: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = {
      ...reqBody,
      update_time: timeNow
    }
    let res
    if (data.account && data.name) {
      res = await Model.doEditUser(data)
      // 处理结果
      if (res && res[0]) {
        res = {
          code: 200,
          msg: ctx.__('L00050'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00051'),
          data: res
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00052'),
        data: {}
      }
    }

    ctx.body = res
  }
}
