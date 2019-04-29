/**
 * Created by OXOYO on 2019/4/29.
 *
 *
 */
import Model from './Model'

export default {
  getList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    let userInfo = ctx.state.userInfo
    // 查询结果
    let res = await Model.getList(reqQuery, userInfo)
    // 处理结果
    if (res) {
      res = {
        code: 200,
        msg: ctx.__('L00078'),
        data: {
          count: res.count,
          list: res.rows
        }
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L00079'),
        data: {}
      }
    }

    ctx.body = res
  },
  doAdd: async (ctx, next) => {
    await next()
    let userInfo = ctx.state.userInfo
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = {
      ...reqBody,
      create_user_id: userInfo.userId,
      create_time: timeNow,
      update_time: timeNow
    }
    let res
    if (data.name) {
      res = await Model.doAdd(data)
      // 最后一项为插入成功与否标识
      let [resTitle] = res
      let isSuccess = res.pop()
      // 处理结果
      if (isSuccess) {
        res = {
          code: 200,
          msg: ctx.__('L00080'),
          data: resTitle
        }
      } else if (resTitle) {
        res = {
          code: 5000,
          msg: ctx.__('L00081'),
          data: resTitle
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00082'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00071'),
        data: {}
      }
    }

    ctx.body = res
  },
  doEdit: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = {
      ...reqBody,
      update_time: timeNow
    }
    let res
    if (data.id) {
      res = await Model.doEdit(data)
      // 处理结果
      if (res && res[0]) {
        res = {
          code: 200,
          msg: ctx.__('L00083'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00084'),
          data: res
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00085'),
        data: {}
      }
    }

    ctx.body = res
  },
  doRemove: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let data = reqBody
    let res
    if (data.id) {
      res = await Model.doRemove(data)
      // 处理结果
      if (res) {
        res = {
          code: 200,
          msg: ctx.__('L00086'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00087'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00088'),
        data: {}
      }
    }

    ctx.body = res
  }
}
