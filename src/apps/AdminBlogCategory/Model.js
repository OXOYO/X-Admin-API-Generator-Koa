/**
 * Created by OXOYO on 2019/4/29.
 *
 *
 */
import db from '../../db'

const blogCategorySchema = db.import('../../schema/blog_category')

export default {
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
    // 处理创建者
    if (userInfo) {
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
    // 打印日志
    options['logging'] = true
    let res = await blogCategorySchema.findAndCountAll(options)
    return res
  },
  doAdd: async function (data) {
    let res = await blogCategorySchema.findOrCreate({
      where: {
        name: data.name
      },
      defaults: data,
      logging: true
    })
    return res
  },
  doRemove: async function (data) {
    let res = await blogCategorySchema.destroy({
      where: {
        id: data.id
      },
      logging: true
    })
    return res
  },
  doEdit: async function (data) {
    let res = await blogCategorySchema.update(data, {
      where: {
        id: data.id
      },
      logging: true
    })
    return res
  }
}
