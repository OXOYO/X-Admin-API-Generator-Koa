/**
 * Created by OXOYO on 2018/2/9.
 */

import Model from './Model'

export default {
  getResourceList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    // 查询结果
    let res = await Model.getResourceList(reqQuery)
    // 处理结果
    if (res) {
      res = {
        code: 200,
        msg: ctx.__('L00011'),
        data: {
          count: res.count,
          list: res.rows
        }
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L00012'),
        data: {}
      }
    }

    ctx.body = res
  },
  getAllResourceList: async (ctx, next) => {
    await next()
    let reqQuery = ctx.query
    // 查询结果
    let res = await Model.getAllResourceList(reqQuery)
    // 处理结果
    if (res) {
      res = {
        code: 200,
        msg: ctx.__('L00011'),
        data: {
          count: res.count,
          list: res.rows
        }
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L00012'),
        data: {}
      }
    }

    ctx.body = res
  },
  doAddResource: async (ctx, next) => {
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
    if (data.name) {
      res = await Model.doAddResource(data)
      // 最后一项为插入成功与否标识
      let [resData] = res
      let isSuccess = res.pop()
      // 处理结果
      if (isSuccess) {
        res = {
          code: 200,
          msg: ctx.__('L00013'),
          data: resData
        }
      } else if (resData) {
        res = {
          code: 5000,
          msg: ctx.__('L00014'),
          data: resData
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00015'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00016'),
        data: {}
      }
    }

    ctx.body = res
  },
  doRemoveResource: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let data = reqBody
    let res
    if ((Object.keys(data)).length) {
      res = await Model.doRemoveResource(data)
      // 处理结果
      if (res) {
        res = {
          code: 200,
          msg: ctx.__('L00017'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00018'),
          data: {}
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00019'),
        data: {}
      }
    }

    ctx.body = res
  },
  doEditResource: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = {
      ...reqBody,
      update_time: timeNow
    }
    let res
    if (data.id) {
      res = await Model.doEditResource(data)
      // 处理结果
      if (res && res[0]) {
        res = {
          code: 200,
          msg: ctx.__('L00020'),
          data: res
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00021'),
          data: res
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00022'),
        data: {}
      }
    }

    ctx.body = res
  },
  doSortResource: async (ctx, next) => {
    await next()
    let reqBody = ctx.request.body
    let timeNow = new Date()
    let data = reqBody.map(item => {
      item['update_time'] = timeNow
      return item
    })
    let res
    if (data && data.length) {
      let successArr = []
      let failArr = []
      let handler = async function () {
        for (let i = 0, len = data.length; i < len; i++) {
          let item = data[i]
          let resUpdate = await Model.doEditResource(item)
          if (resUpdate[0]) {
            successArr.push(item)
          } else {
            failArr.push(item)
          }
        }
      }
      await handler()
      // 处理结果
      if (successArr.length + failArr.length === data.length) {
        res = {
          code: 200,
          msg: ctx.__('L00023'),
          data: {
            success: successArr,
            fail: failArr
          }
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L00024'),
          data: {
            success: successArr,
            fail: failArr
          }
        }
      }
    } else {
      res = {
        code: 5001,
        msg: ctx.__('L00025'),
        data: {}
      }
    }

    ctx.body = res
  }
}
