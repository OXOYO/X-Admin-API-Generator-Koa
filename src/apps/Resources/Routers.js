/**
 * Created by OXOYO on 2018/2/9.
 */

import Ctrl from './Ctrl'

const namespace = '/Resources/'

export default (router) => {
  router
    .get(namespace + 'list', Ctrl.getResourceList)
    .get(namespace + 'list/all', Ctrl.getAllResourceList)
    .post(namespace + 'add', Ctrl.doAddResource)
    .post(namespace + 'edit', Ctrl.doEditResource)
    .post(namespace + 'sort', Ctrl.doSortResource)
    .post(namespace + 'remove', Ctrl.doRemoveResource)
}
