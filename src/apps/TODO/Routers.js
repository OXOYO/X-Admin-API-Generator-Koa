/**
 * Created by OXOYO on 2019/4/25.
 *
 *
 */

import Ctrl from './Ctrl'

const namespace = '/TODO/'

export default (router) => {
  router
    .get(namespace + 'task/list', Ctrl.Task.getList)
    .post(namespace + 'task/add', Ctrl.Task.doAdd)
    .post(namespace + 'task/edit', Ctrl.Task.doEdit)
    .post(namespace + 'task/remove', Ctrl.Task.doRemove)
    .get(namespace + 'category/list', Ctrl.Category.getList)
    .post(namespace + 'category/add', Ctrl.Category.doAdd)
    .post(namespace + 'category/edit', Ctrl.Category.doEdit)
    .post(namespace + 'category/remove', Ctrl.Category.doRemove)
}
