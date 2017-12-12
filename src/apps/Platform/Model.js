/**
 * Created by OXOYO on 2017/10/27.
 */

import db from '../../db'

const usersModel = '../../schema/users'
const usersSchema = db.import(usersModel)

export default {
  user: {
    // 系统登录
    doSignIn: async function (data) {
      let res = await usersSchema.findOne({
        where: {
          account: data.account,
          password: data.password
        },
        logging: true
      })
      return res
    },
    // 获取用户基本信息
    getBaseInfo: async function (userId) {
      let res = await usersSchema.findOne({
        where: {
          id: userId
        },
        logging: true
      })
      return res
    },
    // 获取管理员信息
    getOneAdmin: async function () {
      let res = await usersSchema.findOne({
        where: {
          type: 0
        },
        logging: true
      })
      return res
    }
  }
}
