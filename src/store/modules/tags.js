export const TAGS_VIEW = 'tagsView'

export default {
  namespaced: true,
  state: {
    tagsViewList: sessionStorage.getItem(TAGS_VIEW) ? JSON.parse(sessionStorage.getItem(TAGS_VIEW)) : []
  },
  mutations: {
    addTagsViewList(state, payload) {
      const isFind = state.tagsViewList.find(i => i.path === payload.path)
      if (!isFind) {
        state.tagsViewList.push(payload)
        sessionStorage.setItem(TAGS_VIEW, JSON.stringify(state.tagsViewList))
      }
    },
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      sessionStorage.setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
