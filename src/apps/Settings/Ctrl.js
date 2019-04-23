/**
 * Created by OXOYO on 2017/10/27.
 */

import Model from './Model'

export default {
  Profile: {
    // 编辑账号
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
        let hasSame = await Model.Profile.getOne(data)
        if (hasSame) {
          res = {
            code: 5000,
            msg: ctx.__('L00053'),
            data: hasSame
          }
        } else {
          res = await Model.Profile.doEdit(data)
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
}
