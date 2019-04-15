/**
 * Created by OXOYO on 2017/10/27.
 */

import db from '../../db'

const usersSchema = db.import('../../schema/users')
const userGroupSchema = db.import('../../schema/user_group')

// 用户、用户组关联，支持一个用户拥有多个用户组
const userGroupRelate = usersSchema.hasMany(userGroupSchema, {foreignKey: 'id', sourceKey: 'group_id'})
// 用户、创建人关联
const userCreateUserRelate = usersSchema.belongsTo(usersSchema, {foreignKey: 'create_user_id', targetKey: 'id', as: 'create_user'})

export default {
  getUserList: async (data, userInfo) => {
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
    // 处理创建者，普通管理员只能查找自己创建的普通用户
    if (userInfo && userInfo.type === 1) {
      whereObj['create_user_id'] = userInfo.userId
    }
    // 处理grout_id
    if (data.group_id) {
      whereObj['group_id'] = db.literal('instr(concat(\',\', users.group_id, \',\'), concat(\',\', ' + data.group_id + ', \',\')) > 0')
    }
    // 处理options
    if ((Object.keys(whereObj)).length) {
      options['where'] = whereObj
    }
    // 处理排序
    options['order'] = [
      ['id', 'ASC']
    ]
    // 关联关系
    options['include'] = [
      {
        association: userGroupRelate,
        on: db.literal('instr(concat(\',\', users.group_id, \',\'), concat(\',\', user_groups.id, \',\')) > 0')
      },
      // 关联创建人
      {
        association: userCreateUserRelate,
        attributes: ['id', 'name', 'account']
      }
    ]
    // 当存在1:N关联关系时用findAndCountAll查询需使用distinct参数去重
    options['distinct'] = true
    // 打印日志
    options['logging'] = true
    let res = await usersSchema.findAndCountAll(options)
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
