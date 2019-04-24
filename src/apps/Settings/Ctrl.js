/**
 * Created by OXOYO on 2017/10/27.
 */

import Model from './Model'
import utils from '../../utils'
import config from '../../config'

export default {
  Profile: {
    // 编辑个人资料
    doEdit: async (ctx, next) => {
      await next()
      let reqBody = ctx.request.body
      let userInfo = ctx.state.userInfo
      let timeNow = new Date()
      let data = {
        ...reqBody,
        update_time: timeNow
      }
      let res
      if (data.id) {
        if (data.id === userInfo.userId) {
          let hasSame = await Model.Profile.getOne(data)
          if (hasSame) {
            res = {
              code: 5000,
              msg: ctx.__('L00055'),
              data: hasSame
            }
          } else {
            res = await Model.Profile.doEdit(data)
            // 处理结果
            if (res && res[0]) {
              res = {
                code: 200,
                msg: ctx.__('L00053'),
                data: res
              }
            } else {
              res = {
                code: 5000,
                msg: ctx.__('L00054'),
                data: res
              }
            }
          }
        } else {
          res = {
            code: 9999,
            msg: ctx.__('L00056'),
            data: {}
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L00057'),
          data: {}
        }
      }

      ctx.body = res
    }
  },
  Account: {
    // 编辑账号
    doEdit: async (ctx, next) => {
      await next()
      let reqBody = ctx.request.body
      let userInfo = ctx.state.userInfo
      let timeNow = new Date()
      let data = {
        id: reqBody.id,
        // 旧密码需要加密
        oldPassword: utils.des.encrypt(config.system.secret, reqBody.oldPassword, 0),
        newPassword: utils.des.encrypt(config.system.secret, reqBody.newPassword, 0),
        confirmNewPassword: utils.des.encrypt(config.system.secret, reqBody.confirmNewPassword, 0),
        update_time: timeNow
      }
      let res
      if (data.id) {
        if (data.oldPassword === data.newPassword) {
          res = {
            code: 5000,
            msg: ctx.__('L00064'),
            data: {}
          }
        } else if (data.newPassword !== data.confirmNewPassword) {
          res = {
            code: 5000,
            msg: ctx.__('L00065'),
            data: {}
          }
        } else if (!config.system.passwordReg.test(reqBody.newPassword)) {
          res = {
            code: 5000,
            msg: ctx.__('L00066'),
            data: {}
          }
        } else if (data.id === userInfo.userId) {
          // 确认旧密码是否正确
          let isRight = await Model.Account.confirmOldPassword(data)
          if (!isRight) {
            res = {
              code: 5000,
              msg: ctx.__('L00060'),
              data: hasSame
            }
          } else {
            res = await Model.Account.doEdit(data)
            // 处理结果
            if (res && res[0]) {
              res = {
                code: 200,
                msg: ctx.__('L00058'),
                data: res
              }
            } else {
              res = {
                code: 5000,
                msg: ctx.__('L00059'),
                data: res
              }
            }
          }
        } else {
          res = {
            code: 9999,
            msg: ctx.__('L00061'),
            data: {}
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L00062'),
          data: {}
        }
      }

      ctx.body = res
    }
  }
}
