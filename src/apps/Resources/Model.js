/**
 * Created by OXOYO on 2018/2/9.
 */

import db from '../../db'

const resourcesSchema = db.import('../../schema/resources')

export default {
  getResourceList: async (data) => {
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
    let statusInArr = data.enable || []
    if (statusInArr.length) {
      whereObj['enable'] = {
        $in: statusInArr
      }
    }
    // 处理position
    if (data.position) {
      whereObj['position'] = db.literal('instr(concat(\',\', resources.position, \',\'), concat(\',\', \'' + data.position + '\', \',\')) > 0')
    }
    // 处理资源类别
    let typeInArr = data.type || []
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
    let res = await resourcesSchema.findAndCountAll(options)
    return res
  },
  getAllResourceList: async (data) => {
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
    let statusInArr = data.enable || []
    if (statusInArr.length) {
      whereObj['enable'] = {
        $in: statusInArr
      }
    }
    // 处理侧边栏显示过滤
    let sidebarInArr = data.sidebar || []
    if (sidebarInArr.length) {
      whereObj['sidebar'] = {
        $in: sidebarInArr
      }
    }
    // 处理资源类别
    let typeInArr = data.type || []
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
    let res = await resourcesSchema.findAndCountAll(options)
    return res
  },
  doAddResource: async function (data) {
    let res = await resourcesSchema.findOrCreate({
      where: {
        name: data.name
      },
      defaults: data,
      logging: true
    })
    return res
  },
  // 删除资源
  doRemoveResource: async function (data) {
    let res = await resourcesSchema.destroy({
      where: {
        id: Object.values(data)
      },
      logging: true
    })
    return res
  },
  // 更新资源
  doEditResource: async function (data) {
    let res = await resourcesSchema.update(data, {
      where: {
        id: data.id
      },
      logging: true
    })
    return res
  }
}
