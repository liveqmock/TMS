import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

/**
 * 配置说明
 * icon 图标名称，对应src/icon/svg下的图标名字
 * hidden 是否隐藏不显示
 * meta 路由相关信息 ： stitle为边栏折叠时显示， noCache是否加入到路由的缓存列表里， istab 是否为页面内的tab切换
 */
export default {
  path: '/company',
  component: Layout,
  redirect: '/company/groupManage',
  name: '公司管理',
  icon: 'gongsiguanli',
  children: [
    { path: '/company/index', icon: 'information', hidden: true, name: '公司管理', component: _import('company/index'), meta: { title: '公司管理', stitle: '公司', noCache: true }},
    { path: '/company/myinfo', icon: 'information', hidden: true, name: '个人中心', component: _import('company/myinfo/index'), meta: { title: '个人中心', noCache: true }},
    { path: '/company/groupManage', icon: 'zuzhijiagou', hidden: false, name: '组织架构', component: _import('company/groupManage/index'), meta: { title: '组织架构', stitle: '组织', noCache: true }
    },
    { path: '/company/permissionManage', icon: 'quanxianguanli', hidden: false, name: '权限管理', component: _import('company/permissionManage/index'), meta: { title: '权限管理', stitle: '权限', noCache: true }},
    {
      path: '/company/employeeManage',
      icon: 'yuangongguanli',
      hidden: false,
      name: '员工管理',
      component: _import('company/employeeManage/index'),
      meta: { title: '员工管理', stitle: '员工', noCache: true }
    },
    {
      path: '/company/customerManage',
      icon: 'kehuguanli',
      hidden: false,
      name: '客户管理',
      component: _import('company/customerManage/index'),
      // redirect: '/company/customerManage/sender',
      meta: { title: '客户管理', stitle: '客户', noCache: true }
      /* children: [{ path: '/company/customerManage/sender', hidden: false, name: '发货人', component: _import('company/customerManage/sender/index'), meta: { title: '发货人', noCache: true }},
      { path: '/company/customerManage/receiver', hidden: false, name: '收货人', component: _import('company/customerManage/receiver/index'), meta: { title: '收货人', noCache: true }}] */
    },
    {
      path: '/company/driverManage',
      icon: 'sijiguanli',
      hidden: false,
      name: '司机管理',
      component: _import('company/driverManage/index'),
      meta: { title: '司机管理', stitle: '司机', noCache: true }
    },
    {
      path: '/company/trunkManage',
      icon: 'cheliangguanli',
      hidden: false,
      name: '车辆管理',
      component: _import('company/trunkManage/index'),
      meta: { title: '车辆管理', stitle: '车辆', noCache: true }
    },
    {
      path: '/company/carrierManage',
      icon: 'chengyunshang',
      hidden: false,
      name: '承运商管理',
      component: _import('company/carrierManage/index'),
      meta: { title: '承运商管理', stitle: '承运商', noCache: true }
    },
    { path: '/company/systemSetup', icon: 'xitongshezhi', hidden: false, name: '系统设置', component: _import('company/systemSetup/index'), meta: { title: '系统设置', stitle: '设置', noCache: true }},
    {
      path: '/company/printManage',
      icon: 'dayin',
      hidden: true,
      name: '打印模版管理',
      component: _import('company/printManage/index'),
      meta: { title: '打印模版管理', stitle: '打印', noCache: true }
    }
  ]
}
