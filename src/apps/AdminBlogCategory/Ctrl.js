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
        msg: ctx.__('L0008001'),
        data: {
          count: res.count,
          list: res.rows
        }
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L0008002'),
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
          msg: ctx.__('L0008003'),
          data: resTitle
        }
      } else if (resTitle) {
        res = {
          code: 5000,
          msg: ctx.__('L0008004'),
          data: resTitle
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L0008005'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L0008006'),
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
          msg: ctx.__('L0008007'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L0008008'),
          data: res
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L0008009'),
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
          msg: ctx.__('L0008010'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L0008011'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L0008012'),
        data: {}
      }
    }

    ctx.body = res
  }
}
