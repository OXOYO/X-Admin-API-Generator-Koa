/**
 * Created by OXOYO on 2019/4/25.
 *
 *
 */
import Model from './Model'

export default {
  Task: {
    // 获取任务列表
    getList: async (ctx, next) => {
      await next()
      let reqQuery = ctx.query
      let userInfo = ctx.state.userInfo
      // 查询结果
      let res = await Model.Task.getList(reqQuery, userInfo)
      // 处理结果
      if (res) {
        res = {
          code: 200,
          msg: ctx.__('L0007001'),
          data: {
            count: res.count,
            list: res.rows
          }
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L0007002'),
          data: {}
        }
      }
      ctx.body = res
    },
    // 添加任务
    doAdd: async (ctx, next) => {
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
      let res
      if (data.content) {
        res = await Model.Task.doAdd(data)
        // 处理结果
        if (res) {
          res = {
            code: 200,
            msg: ctx.__('L0007003'),
            data: res
          }
        } else {
          res = {
            code: 5000,
            msg: ctx.__('L0007004'),
            data: {}
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L0007005'),
          data: {}
        }
      }

      ctx.body = res
    },
    // 编辑任务
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
        res = await Model.Task.doEdit(data)
        // 处理结果
        if (res && res[0]) {
          res = {
            code: 200,
            msg: ctx.__('L0007006'),
            data: res
          }
        } else {
          res = {
            code: 5000,
            msg: ctx.__('L0007007'),
            data: res
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L0007008'),
          data: {}
        }
      }

      ctx.body = res
    },
    // 删除任务
    doRemove: async (ctx, next) => {
      await next()
      let reqBody = ctx.request.body
      let data = reqBody
      let res
      if (data.id) {
        res = await Model.Task.doRemove(data)
        // 处理结果
        if (res) {
          res = {
            code: 200,
            msg: ctx.__('L0007009'),
            data: res
          }
        } else {
          res = {
            code: 5000,
            msg: ctx.__('L0007010'),
            data: {}
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L0007011'),
          data: {}
        }
      }

      ctx.body = res
    }
  },
  Category: {
    // 获取分类列表
    getList: async (ctx, next) => {
      await next()
      let reqQuery = ctx.query
      let userInfo = ctx.state.userInfo
      // 查询结果
      let res = await Model.Category.getList(reqQuery, userInfo)
      // 处理结果
      if (res) {
        res = {
          code: 200,
          msg: ctx.__('L0007012'),
          data: {
            count: res.count,
            list: res.rows
          }
        }
      } else {
        res = {
          code: 5000,
          msg: ctx.__('L0007013'),
          data: {}
        }
      }

      ctx.body = res
    },
    // 添加分类
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
        res = await Model.Category.doAdd(data)
        // 最后一项为插入成功与否标识
        let [resTitle] = res
        let isSuccess = res.pop()
        // 处理结果
        if (isSuccess) {
          res = {
            code: 200,
            msg: ctx.__('L0007014'),
            data: resTitle
          }
        } else if (resTitle) {
          res = {
            code: 5000,
            msg: ctx.__('L0007015'),
            data: resTitle
          }
        } else {
          res = {
            code: 5000,
            msg: ctx.__('L0007016'),
            data: {}
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L0007017'),
          data: {}
        }
      }

      ctx.body = res
    },
    // 编辑分类
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
        res = await Model.Category.doEdit(data)
        // 处理结果
        if (res && res[0]) {
          res = {
            code: 200,
            msg: ctx.__('L0007018'),
            data: res
          }
        } else {
          res = {
            code: 5000,
            msg: ctx.__('L0007019'),
            data: res
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L0007020'),
          data: {}
        }
      }

      ctx.body = res
    },
    // 删除分类
    doRemove: async (ctx, next) => {
      await next()
      let reqBody = ctx.request.body
      let data = reqBody
      let res
      if (data.id) {
        res = await Model.Category.doRemove(data)
        // 处理结果
        if (res) {
          res = {
            code: 200,
            msg: ctx.__('L0007021'),
            data: res
          }
        } else {
          res = {
            code: 5000,
            msg: ctx.__('L0007022'),
            data: {}
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L0007023'),
          data: {}
        }
      }

      ctx.body = res
    }
  }
}
