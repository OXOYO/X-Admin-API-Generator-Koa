/**
 * Created by OXOYO on 2017/10/27.
 */

import Model from './Model'

export default {
  // 获取账号列表
  getUserList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    // 查询结果
    let res = await Model.getUserList(reqQuery)
    // 处理结果
    if (res) {
      res = {
        status: 200,
        msg: '查询账号列表成功！',
        data: {
          count: res.length,
          list: res
        }
      }
    } else {
      res = {
        status: 5000,
        msg: '查询账号列表失败！',
        data: {}
      }
    }

    ctx.body = res || {}
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
    if (data && data.account && data.name) {
      res = await Model.doAddUser(data)
      // 最后一项为插入成功与否标识
      let [resAccount] = res
      let isSuccess = res.pop()
      // 处理结果
      if (isSuccess) {
        res = {
          status: 200,
          msg: '添加账号成功！',
          data: resAccount
        }
      } else if (resAccount) {
        res = {
          status: 5000,
          msg: '添加账号失败，该账号已存在！',
          data: resAccount
        }
      } else {
        res = {
          status: 5000,
          msg: '添加账号失败！',
          data: {}
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '添加账号失败，上送参数有误！',
        data: {}
      }
    }

    ctx.body = res || {}
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
          status: 200,
          msg: '删除账号成功！',
          data: res
        }
      } else {
        res = {
          status: 5000,
          msg: '删除账号失败！',
          data: {}
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '删除账号失败，上送参数有误！',
        data: {}
      }
    }

    ctx.body = res || {}
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
    if (data && data.account && data.name) {
      res = await Model.doEditUser(data)
      // 处理结果
      if (res && res[0]) {
        res = {
          status: 200,
          msg: '编辑账号成功！',
          data: res
        }
      } else {
        res = {
          status: 5000,
          msg: '编辑账号失败！',
          data: res
        }
      }
    } else {
      res = {
        status: 5001,
        msg: '编辑账号失败，上送参数有误！',
        data: {}
      }
    }

    ctx.body = res || {}
  }
}
