/**
 * Created by OXOYO on 2018/4/25.
 */

import Ctrl from './Ctrl'

const namespace = '/SystemLog/'

export default (router) => {
  router
    .get(namespace + 'list', Ctrl.getLogList)
}
