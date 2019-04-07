/**
 * Created by OXOYO on 2019/4/3.
 *
 * Log配置
 */

export default {
  // 排除接口
  unless: {
    api: ['/SystemLog/list'],
    methods: ['OPTIONS']
  },
  // 配置
  options: {
    appenders: {
      default: {
        type: 'dateFile',
        filename: 'logs/default',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
      },
      result: {
        type: 'dateFile',
        filename: 'logs/result',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
      },
      error: {
        type: 'dateFile',
        filename: 'logs/error',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
      }
    },
    categories: {
      default: {
        appenders: ['default'],
        level: 'info'
      },
      result: {
        appenders: ['result'],
        level: 'info'
      },
      error: {
        appenders: ['error'],
        level: 'error'
      }
    }
  }
}
