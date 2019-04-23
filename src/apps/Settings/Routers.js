/**
 * Created by OXOYO on 2017/10/27.
 */

import Ctrl from './Ctrl'

const namespace = '/Settings/'

export default (router) => {
  router
    .post(namespace + 'Profile/edit', Ctrl.Profile.doEdit)
}
