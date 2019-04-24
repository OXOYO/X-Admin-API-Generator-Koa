/**
 * Created by OXOYO on 2017/10/27.
 */

import db from '../../db'

const usersSchema = db.import('../../schema/users')

export default {
  Profile: {
    // 查重
    getOne: async function (data) {
      let res = await usersSchema.findOne({
        where: {
          account: data.account
        },
        logging: true
      })
      return res
    },
    // 更新账号
    doEdit: async function (data) {
      let res = await usersSchema.update(data, {
        where: {
          id: data.id
        },
        logging: true
      })
      return res
    }
  },
  Account: {
    // 确认旧密码
    confirmOldPassword: async function (data) {
      let res = await usersSchema.findOne({
        where: {
          id: data.id,
          password: data.oldPassword
        },
        logging: true
      })
      return res
    },
    // 更新账号
    doEdit: async function (data) {
      let res = await usersSchema.update(
        {
          password: data.newPassword
        },
        {
          where: {
            id: data.id
          },
          logging: true
        }
      )
      return res
    }
  }
}
