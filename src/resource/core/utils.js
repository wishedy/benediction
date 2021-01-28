// 获取合并的数据
import baseConfig from '@/config'

export const mergeConfig = function (options) {
  // 判断url是不是链接
  const urlType = /^(http|https):\/\//.test(options.url)
  const config = Object.assign({
    timeout: options.timeout || 6000
  }, options)
  console.log(urlType, baseConfig.baseUrl + options.url)
  config.url = urlType ? options.url : baseConfig.baseUrl + options.url
  // 请求头
  if (options.header) {
    config.header = Object.assign({}, options.header)
  } else {
    config.header = Object.assign({}, {
      'Content-Type': 'application/json;charset=UTF-8'
      // 'project_token': base.projectToken, //项目token（可删除）
    })
  }
  return config
}
// 请求
export const dispatchRequest = function (requestInfo) {
  return new Promise((resolve, reject) => {
    let requestAbort = true
    const requestData = {
      url: requestInfo.url,
      header: requestInfo.header, // 加入请求头
      success: (res) => {
        requestAbort = false
        if (process.env.NODE_ENV !== 'production') {
          console.timeEnd(requestInfo.method.toUpperCase() + ' ' + requestInfo.url)
        }
        if (res.statusCode >= 200 && res.statusCode < 300 && (!res.data.code || res.data.code === 200)) {
          return resolve(res.data.data || res.data)
        }
        if (res.data.code === 401 || res.data.code === 402 || res.data.code === 403) {
          /* if(res.config.url!=='/v2/login/updateToken'){
              //update TOKEN失败不做处理
              logout()
          } */
          return
        }
        console.log(res.data.message || '网络错误')
        return reject(res.data)
      },
      fail: (err) => {
        requestAbort = false
        if (err.message === 'request:fail abort') {
          /*eslint-disable*/
          reject({
            message: '请求超时，请重新尝试',
            statusCode: 0
          })
        } else {
          reject(err)
        }
      }
    }
    // 请求类型
    if (requestInfo.method) {
      requestData.method = requestInfo.method
    }
    if (requestInfo.data) {
      requestData.data = requestInfo.data
    }
    // #ifdef MP-WEIXIN || MP-ALIPAY
    if (requestInfo.timeout) {
      requestData.timeout = requestInfo.timeout
    }
    // #endif
    if (requestInfo.dataType) {
      requestData.dataType = requestInfo.dataType
    }
    // #ifndef APP-PLUS || MP-ALIPAY
    if (requestInfo.responseType) {
      requestData.responseType = requestInfo.responseType
    }
    // #endif
    // #ifdef H5
    if (requestInfo.withCredentials) {
      requestData.withCredentials = requestInfo.withCredentials
    }
    // #endif
    const requestTask = uni.request(requestData)
    setTimeout(() => {
      if (requestAbort) {
        requestTask.abort()
      }
    }, requestInfo.timeout)
  })
}
// jsonp请求
export const jsonpRequest = function (requestInfo) {
  return new Promise((resolve, reject) => {
    let dataStr = ''
    Object.keys(requestInfo.data).forEach(key => {
      dataStr += key + '=' + requestInfo.data[key] + '&'
    })
    // 匹配最后一个&并去除
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
    }
    requestInfo.url = requestInfo.url + '?' + dataStr
    const callbackName = 'callback' + Math.ceil(Math.random() * 1000000)
    // #ifdef H5
    window[callbackName] = function (data) {
      resolve(data)
    }
    const script = document.createElement('script')
    script.src = requestInfo.url + '&callback=' + callbackName
    document.head.appendChild(script)
    // 及时删除，防止加载过多的JS
    document.head.removeChild(script)
    // #endif
  })
}
