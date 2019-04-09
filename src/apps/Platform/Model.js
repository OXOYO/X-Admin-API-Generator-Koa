/**
 * Created by OXOYO on 2017/10/27.
 */

import db from '../../db'

const usersSchema = db.import('../../schema/users')
const userGroupSchema = db.import('../../schema/user_group')
const resourcesSchema = db.import('../../schema/resources')

// 用户、用户组关联关系
const userGroupRelate = usersSchema.hasMany(userGroupSchema, {foreignKey: 'id', sourceKey: 'group_id'})
// 用户组、资源关联
// const roleResourceRelate = userGroupSchema.hasMany(resourcesSchema, {foreignKey: 'id', sourceKey: 'resource_id', as: 'userResources'})

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
        attributes: [ 'id', 'account', 'name', 'type', 'group_id', 'status', 'create_time', 'update_time' ],
        where: {
          id: userId
        },
        include: [
          {
            association: userGroupRelate,
            on: db.literal('instr(concat(\',\', users.group_id, \',\'), concat(\',\', user_groups.id, \',\')) > 0')
          }
        ],
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
  },
  resource: {
    getAllResourceList: async (data) => {
      let options = {}
      // 拼装where条件
      let whereObj = {}
      // 处理id过滤
      let idInArr = data.ids ? data.ids.split(',') : ''
      if (idInArr.length) {
        whereObj['id'] = {
          $in: idInArr
        }
      }
      // 处理position过滤
      let positionInArr = data.position || []
      if (positionInArr.length) {
        whereObj['position'] = {
          $in: positionInArr
        }
      }
      // 处理状态过滤
      let statusInArr = data.enable || []
      if (statusInArr.length) {
        whereObj['enable'] = {
          $in: statusInArr
        }
      }
      // 处理资源类别
      let typeInArr = data.type || []
      if (typeInArr.length) {
        whereObj['type'] = {
          $in: typeInArr
        }
      }
      // 处理parent_id
      if (data.parent_id) {
        whereObj['parent_id'] = data.parent_id
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
      let res = await resourcesSchema.findAndCountAll(options)
      return res
    }
  }
}
