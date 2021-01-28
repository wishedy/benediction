const actions = {
  saveTop: ({ commit, state }, num) => {
    commit('saveTop', num)
  },
  changeCodeStatusSuccess: ({ commit, state }) => {
    commit('changeCodeStatusSuccess')
  },
  saveQuery: ({ commit, state }, data) => {
    commit('saveQuery', data)
  },
  changePhoneStatusError: ({ commit, state }) => {
    commit('changePhoneStatusError')
  },
  openVideoUrl: ({ commit, state }, data) => {
    commit('openVideoUrl', data)
  },
  saveSearchData: ({ commit, state }, data) => {
    commit('saveSearchData', data)
  },
  changeActive: ({ commit, state }, id) => {
    commit('changeActive', id)
  }
}
export default actions
