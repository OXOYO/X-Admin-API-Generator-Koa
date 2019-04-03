/**
 * Created by OXOYO on 2017/10/23.
 */

import Koa from 'koa'
import qs from 'koa-qs'
import middleware from './middleware'

// 实例化app
const app = new Koa()

// 开启代理
app.proxy = true
// 注册qs
qs(app)
// 注册中间件
middleware(app)

// 监听error
app.on('error', function (err, ctx) {
  console.log('Service error', err)
})

exports = module.exports = app
