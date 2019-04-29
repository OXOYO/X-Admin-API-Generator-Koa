/**
 * Created by OXOYO on 2019/4/29.
 *
 *
 */

import Ctrl from './Ctrl'

const namespace = '/AdminBlogCategory/'

export default (router) => {
  router
    .get(namespace + 'list', Ctrl.getList)
    .post(namespace + 'add', Ctrl.doAdd)
    .post(namespace + 'edit', Ctrl.doEdit)
    .post(namespace + 'remove', Ctrl.doRemove)
}
