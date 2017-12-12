/**
 * Created by OXOYO on 2017/10/27.
 */

import Ctrl from './Ctrl'
import auth from '../../auth'

const namespace = '/Platform/'

export default (router) => {
  router
    .post(namespace + 'user/signIn', Ctrl.user.doSignIn)
    .get(namespace + 'user/BaseInfo', auth.verifyToken, Ctrl.user.getBaseInfo)
    // .post(namespace + 'user/logout', Ctrl.user.doLogout)
    .get(namespace + 'components/wallpaper/bing', Ctrl.components.getBingWallpaper)
}
