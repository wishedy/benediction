const getters = {
  top (state) {
    return state.top
  },
  codeStatus (state) {
    return state.codeStatus
  },
  identityId (state) {
    return state.identityId
  },
  query (state) {
    return state.query
  },
  searchForm (state) {
    const form = {}
    for (let num = 0; num < state.searchList.length; num++) {
      const item = state.searchList[num]
      for (let innerNum = 0; innerNum < item.list.length; innerNum++) {
        const innerItem = item.list[innerNum]
        if (innerItem.id === item.activeId) {
          form[item.key] = innerNum + 1
        }
      }
    }
    return form
  },
  phoneError (state) {
    return state.phoneError
  },
  searchList (state) {
    return state.searchList
  },
  phoneNumber (state) {
    return state.phoneNumber
  },
  videoUrl (state) {
    return state.videoUrl
  }
}
export default getters
