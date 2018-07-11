const getters = {
  sidebar: state => state.app.sidebar,
  lockScreen: state => state.app.lockScreen,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  company: state => state.user.company,
  name: state => state.user.name,
  username: state => state.user.username,
  roles: state => state.user.roles,
  otherinfo: state => state.user.otherinfo,
  permission_routers: state => state.permission.routers,
  sidebarRouters: state => state.permission.sidebarRouters,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs
}
export default getters
