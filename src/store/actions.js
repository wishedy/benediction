const actions = {
  saveToken: ({ commit, state }, token) => {
    commit('saveToken', token)
  }
}
export default actions
