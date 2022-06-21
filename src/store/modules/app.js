

export default {
  namespaced: true,
  state: {
    sidebarOpened: true
  },
  mutations: {
    triggerSideBar(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}