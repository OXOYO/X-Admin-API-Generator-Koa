/**
 * Created by OXOYO on 2017/10/27.
 */

import db from '../../db'

const userGroupSchema = db.import('../../schema/user_group')
const usersSchema = db.import('../../schema/users')

// 角色、资源关联
// const roleResourceRelate = userGroupSchema.hasMany(resourcesSchema, {foreignKey: 'id', sourceKey: 'resource_id', as: 'resources'})
// 角色、创建人关联
const roleCreateUserRelate = userGroupSchema.belongsTo(usersSchema, {foreignKey: 'create_user_id', targetKey: 'id', as: 'create_user'})

export default {
  getRoleList: async (data, userInfo) => {
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
    let statusInArr = data.status || []
    if (statusInArr.length) {
      whereObj['status'] = {
        $in: statusInArr
      }
    }
    // 处理创建者，普通管理员只能查找自己创建的普通用户
    if (userInfo && userInfo.type === 1) {
      whereObj['create_user_id'] = userInfo.userId
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
      // FIXME !!! 为配合读写分离权限控制逻辑，现取消关联查询资源详情的功能
      // 关联资源
      // {
      //   association: roleResourceRelate,
      //   on: db.literal('instr(concat(\',\', user_group.resource_id, \',\'), concat(\',\', resources.id, \',\')) > 0')
      // },
      // 关联用户
      {
        association: roleCreateUserRelate,
        attributes: ['id', 'name', 'account']
      }
    ]
    // 当存在1:N关联关系时用findAndCountAll查询需使用distinct参数去重
    options['distinct'] = true
    // 打印日志
    options['logging'] = true
    let res = await userGroupSchema.findAndCountAll(options)
    return res
  },
  // 获取全部角色列表
  getAllRoleList: async (data, userInfo) => {
    let options = {}
    // 拼装where条件
    let whereObj = {}
    // 处理关键词过滤
    // let filterType = data.filterType || null
    // if (filterType && data.keywords) {
    //   // 模糊匹配
    //   whereObj[filterType] = {
    //     $like: '%' + data.keywords + '%'
    //   }
    // }
    // 处理状态过滤
    let statusInArr = data.status || []
    if (statusInArr.length) {
      whereObj['status'] = {
        $in: statusInArr
      }
    }
    // 处理创建者，普通管理员只能查找自己创建的普通用户
    // FIXME 取消通过接口过滤，改用前端过滤
    // if (userInfo && userInfo.type === 1) {
    //   whereObj['create_user_id'] = userInfo.userId
    // }
    // 处理options
    if ((Object.keys(whereObj)).length) {
      options['where'] = whereObj
    }
    // 关联关系
    options['include'] = [
      // 关联用户
      {
        association: roleCreateUserRelate,
        attributes: ['id', 'name', 'account']
      }
    ]
    // 处理排序
    options['order'] = [
      ['id', 'ASC']
    ]
    // 打印日志
    options['logging'] = true
    let res = await userGroupSchema.findAndCountAll(options)
    return res
  },
  // 添加角色
  doAddRole: async function (data) {
    let res = await userGroupSchema.findOrCreate({
      where: {
        name: data.name
      },
      defaults: data,
      logging: true
    })
    return res
  },
  doRemoveRole: async function (data) {
    // 删除角色
    let res = await userGroupSchema.destroy({
      where: {
        id: Object.values(data)
      },
      logging: true
    })
    return res
  },
  // 更新角色
  doEditRole: async function (data) {
    let res = await userGroupSchema.update(data, {
      where: {
        id: data.id
      },
      logging: true
    })
    return res
  }
}
