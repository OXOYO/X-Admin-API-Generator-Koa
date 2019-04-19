/**
 * Created by OXOYO on 2017/10/27.
 */

import Ctrl from './Ctrl'

const namespace = '/Platform/'

export default (router) => {
  router
    .post(namespace + 'user/signIn', Ctrl.user.doSignIn)
    .get(namespace + 'user/BaseInfo', Ctrl.user.getBaseInfo)
    .get(namespace + 'user/access/verify', Ctrl.user.doVerifyAccess)
    // .post(namespace + 'user/logout', Ctrl.user.doLogout)
    .get(namespace + 'resource/list/all', Ctrl.resource.getAllResourceList)
}
