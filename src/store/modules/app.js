import Cookies from 'js-cookie'
console.log("!+Cookies.get('lockScreenStatus')", !+Cookies.get('lockScreenStatus'),Cookies.get('lockScreenStatus'))
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    lockScreen: {
      opened: !!+Cookies.get('lockScreenStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    TOGGLE_LOCKSCREEN: (state, status) => {
      Cookies.set('lockScreenStatus', status)
      state.lockScreen.opened = !state.lockScreen.opened
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },

    // 锁定 屏幕
    LockScreen({ commit }) {
      return new Promise(resolve => {
        commit('TOGGLE_LOCKSCREEN', 1)
      })
    },

    // 解锁 屏幕
    UnLockScreen({ commit }) {
      return new Promise(resolve => {
        commit('TOGGLE_LOCKSCREEN', 0)
      })
    }
  }
}

export default app
