import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/report',
  component: Layout,
  redirect: '/report/settleRecordTotal',
  icon: 'baobiao',
  name: '报表管理',
  noDropdown: false,
  children: [
    { path: '/report/settleRecordTotal', icon: 'information', hidden: false, name: '应收应付汇总表', component: _import('report/settleRecordTotal/index'), meta: { title: '应收应付汇总表', noCache: true }},
    { path: '/report/cashPayTotal', icon: 'information', hidden: false, name: '现金收支日报表', component: _import('report/cashPayTotal/index'), meta: { title: '现金收支日报表', noCache: true }},
    { path: '/report/batchDaily', icon: 'information', hidden: false, name: '发车日报表', component: _import('report/batchDaily/index'), meta: { title: '发车日报表', noCache: true }},
    { path: '/report/turnoverDaily', icon: 'information', hidden: false, name: '营业额日报表', component: _import('report/turnoverDaily/index'), meta: { title: '营业额日报表', noCache: true }},
    { path: '/report/turnoverMonth', icon: 'information', hidden: false, name: '营业额月报表', component: _import('report/turnoverMonth/index'), meta: { title: '营业额月报表', noCache: true }},
    { path: '/report/turnoverTotal', icon: 'information', hidden: false, name: '营业额汇总表', component: _import('report/turnoverTotal/index'), meta: { title: '营业额汇总表', noCache: true }},
    { path: '/report/operation', icon: 'information', hidden: false, name: '运营统计分析', component: _import('report/operation/index'), meta: { title: '运营统计分析', noCache: true }}
  ]
}
