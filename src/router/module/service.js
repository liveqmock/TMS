import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/service',
  component: Layout,
  redirect: '/service/index',
  name: '客服管理',
  icon: 'kehuguanli',
  hidden: true,
  children: [
    { path: '/service/index', name: '客服反馈', icon: 'zonghe', component: _import('service/index'), meta: { title: '客服反馈', noCache: true },
      children: [{
        path: '/service/index/longtime', name: '延时处理', component: _import('table/index'), meta: { role: ['admin'], title: '延时处理', noCache: true }
      },
      {
        path: '/service/index/longtime2', name: '延时处理2', component: _import('table/index'), meta: { role: ['admin'], title: '延时处理2', noCache: true }
      }]
    },
    {
      path: '/service/report', icon: 'baobiao', name: '报表管理', component: _import('report/index'), meta: { role: ['admin'], title: '报表管理', noCache: true }
    },
    {
      path: '/service/report2', icon: 'baobiao', name: '报表管理2', component: _import('report/index'), meta: { role: ['admin'], title: '报表管理2', noCache: true }
    }
  ]
}
