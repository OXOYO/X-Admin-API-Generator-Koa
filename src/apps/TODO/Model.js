/**
 * Created by OXOYO on 2019/4/25.
 *
 *
 */
import db from '../../db'

const todoTaskSchema = db.import('../../schema/todo_task')
const todoCategorySchema = db.import('../../schema/todo_category')

export default {
  Task: {
    getList: async (data, userInfo) => {
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
      if (typeInArr.length) {
        whereObj['type'] = {
          $in: typeInArr
        }
      }
      // 处理星级
      if (data.star !== undefined) {
        whereObj['star'] = data.star
      }
      // 处理分类
      if (data.category_id !== undefined) {
        whereObj['category_id'] = data.category_id
      }
      // 处理创建者
      if (userInfo) {
        whereObj['create_user_id'] = userInfo.userId
      }
      // TODO 处理日期范围
      // if (data.dateRange) {
      //
      // }

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
      let res = await todoTaskSchema.findAndCountAll(options)
      return res
    },
    doAdd: async function (data) {
      let res = await todoTaskSchema.create(data, {
        logging: true
      })
      return res
    },
    doRemove: async function (data) {
      let res = await todoTaskSchema.destroy({
        where: {
          id: data.id
        },
        logging: true
      })
      return res
    },
    doEdit: async function (data) {
      let res = await todoTaskSchema.update(data, {
        where: {
          id: data.id
        },
        logging: true
      })
      return res
    }
  },
  Category: {
    getList: async (data, userInfo) => {
      let options = {}
      // 拼装where条件
      let whereObj = {}
      // 处理创建者
      if (userInfo) {
        whereObj['create_user_id'] = {
          // 系统默认与用户创建的
          $in: [0, userInfo.userId]
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
      let res = await todoCategorySchema.findAndCountAll(options)
      return res
    },
    doAdd: async function (data) {
      let res = await todoCategorySchema.findOrCreate({
        where: {
          name: data.name
        },
        defaults: data,
        logging: true
      })
      return res
    },
    doRemove: async function (data) {
      let res = await todoCategorySchema.destroy({
        where: {
          id: data.id
        },
        logging: true
      })
      return res
    },
    doEdit: async function (data) {
      let res = await todoCategorySchema.update(data, {
        where: {
          id: data.id
        },
        logging: true
      })
      return res
    }
  }
}
