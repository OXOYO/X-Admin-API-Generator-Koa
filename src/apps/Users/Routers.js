/**
 * Created by OXOYO on 2017/10/27.
 */

import Ctrl from './Ctrl'
import auth from '../../auth'

const namespace = '/Users/'

export default (router) => {
  router
    .get(namespace + 'list', auth.verifyToken, auth.verifyAdmin, Ctrl.getUserList)
    .post(namespace + 'add', auth.verifyToken, auth.verifyAdmin, Ctrl.doAddUser)
    .post(namespace + 'edit', auth.verifyToken, auth.verifyAdmin, Ctrl.doEditUser)
    .post(namespace + 'remove', auth.verifyToken, auth.verifyAdmin, Ctrl.doRemoveUser)
}
