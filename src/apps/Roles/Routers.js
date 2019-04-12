/**
 * Created by OXOYO on 2017/10/27.
 */

import Ctrl from './Ctrl'

const namespace = '/Roles/'

export default (router) => {
  router
    .get(namespace + 'list', Ctrl.getRoleList)
    .get(namespace + 'list/all', Ctrl.getAllRoleList)
    .post(namespace + 'add', Ctrl.doAddRole)
    .post(namespace + 'edit', Ctrl.doEditRole)
    .post(namespace + 'remove', Ctrl.doRemoveRole)
}
