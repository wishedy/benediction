function getUrlParams (url) {
  const query = url.split('?')[1]; if (query) {
    const queryArr = query.split('&')
    const obj = {}
    queryArr.forEach(function (item) {
      const key = item.split('=')[0]
      const value = item.split('=')[1]
      obj[key] = value
    })
    return obj
  }
}
const mutations = {
  saveTop (state, num) {
    state.top = num
  },
  changeActive (state, id) {
    for (let num = 0; num < state.searchList.length; num++) {
      const item = state.searchList[num]
      for (let innerNum = 0; innerNum < item.list.length; innerNum++) {
        const innerItem = item.list[innerNum]
        if (innerItem.id === id) {
          item.activeId = id
          console.log('修改了')
          break
        }
      }
    }
  },
  changePhoneStatusError (state) {
    state.phoneError = true
  },
  saveQuery (state, data) {
    let link = ''
    console.log(data)
    if (data.q) {
      link = decodeURIComponent(data.q)
      state.query = getUrlParams(link)
    } else {
      data.utm_campaign = 'A6qSd'
      data.utm_term = 'jseqzrll'
      state.query = data
    }
  },
  changeCodeStatusSuccess (state) {
    state.codeStatus = true
  },
  openVideoUrl (state, data) {
    console.log(state, 'state')
    state.videoUrl = data
  },
  saveSearchData (state, data) {
    const formattConfig = (list) => {
      const resultList = []
      const originalList = JSON.parse(JSON.stringify(list))
      const timestamp = new Date().getTime()
      for (let num = 0; num < originalList.length; num++) {
        const item = originalList[num]
        item.id = timestamp + '0' + num
        item.activeId = ''
        item.list = []
        for (const key in item.types) {
          const innerId = timestamp + '1' + num + '1' + key
          if (parseInt(key, 10) === 1) {
            item.activeId = innerId
          }
          item.list.push({
            title: item.types[key],
            id: innerId
          })
        }
        resultList.push(item)
      }
      return resultList
    }
    state.searchList = formattConfig(data)
  },
  setPhoneNumber (state, data) {
    state.phoneNumber = data
  }
}
export default mutations
