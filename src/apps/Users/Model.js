/**
 * Created by OXOYO on 2017/10/27.
 */

import db from '../../db'

const usersModel = '../../schema/users'
const usersSchema = db.import(usersModel)

export default {
  getUserList: async (data) => {
    let options = {}
    // 处理分页
    let pageSize = data.pageSize || 10
    let currentPage = data.currentPage || 1
    options['limit'] = parseInt(pageSize)
    options['offset'] = parseInt((currentPage - 1) * pageSize)
    // 拼装where条件
    let whereObj = {}
    // 处理关键词过滤
    let filterType = data.filterType || null
    if (filterType && data.keywords) {
      // 模糊匹配
      whereObj[filterType] = {
        $like: '%' + data.keywords + '%'
      }
    }
    // 处理状态过滤
    let statusInArr = data.userStatus || []
    if (statusInArr.length) {
      whereObj['status'] = {
        $in: statusInArr
      }
    }
    // 处理用户级别
    let typeInArr = data.userType || []
    console.log('typeInArr', typeInArr, data)
    if (typeInArr.length) {
      whereObj['type'] = {
        $in: typeInArr
      }
    }
    // 处理options
    if ((Object.keys(whereObj)).length) {
      options['where'] = whereObj
    }
    // 处理排序
    options['order'] = [
      ['id', 'ASC']
    ]
    // 打印日志
    options['logging'] = true
    let res = await usersSchema.findAll(options)
    return res
  },
  // 添加账号
  doAddUser: async function (data) {
    let res = await usersSchema.findOrCreate({
      where: {
        account: data.account
      },
      defaults: data,
      logging: true
    })
    return res
  },
  doRemoveUser: async function (data) {
    // 删除账号
    let res = await usersSchema.destroy({
      where: {
        id: Object.values(data)
      },
      logging: true
    })
    return res
  },
  // 更新账号
  doEditUser: async function (data) {
    let res = await usersSchema.update(data, {
      where: {
        id: data.id
      },
      logging: true
    })
    return res
  }
}
