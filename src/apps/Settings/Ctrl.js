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
              msg: ctx.__('L0006003'),
              data: hasSame
            }
          } else {
            res = await Model.Profile.doEdit(data)
            // 处理结果
            if (res && res[0]) {
              res = {
                code: 200,
                msg: ctx.__('L0006001'),
                data: res
              }
            } else {
              res = {
                code: 5000,
                msg: ctx.__('L0006002'),
                data: res
              }
            }
          }
        } else {
          res = {
            code: 9999,
            msg: ctx.__('L0006004'),
            data: {}
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L0006005'),
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
            msg: ctx.__('L0006012'),
            data: {}
          }
        } else if (data.newPassword !== data.confirmNewPassword) {
          res = {
            code: 5000,
            msg: ctx.__('L0006013'),
            data: {}
          }
        } else if (!config.system.passwordReg.test(reqBody.newPassword)) {
          res = {
            code: 5000,
            msg: ctx.__('L0006014'),
            data: {}
          }
        } else if (data.id === userInfo.userId) {
          // 确认旧密码是否正确
          let isRight = await Model.Account.confirmOldPassword(data)
          if (!isRight) {
            res = {
              code: 5000,
              msg: ctx.__('L0006008'),
              data: hasSame
            }
          } else {
            res = await Model.Account.doEdit(data)
            // 处理结果
            if (res && res[0]) {
              res = {
                code: 200,
                msg: ctx.__('L0006006'),
                data: res
              }
            } else {
              res = {
                code: 5000,
                msg: ctx.__('L0006007'),
                data: res
              }
            }
          }
        } else {
          res = {
            code: 9999,
            msg: ctx.__('L0006009'),
            data: {}
          }
        }
      } else {
        res = {
          code: 5001,
          msg: ctx.__('L0006010'),
          data: {}
        }
      }

      ctx.body = res
    }
  }
}
