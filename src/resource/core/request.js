import { mergeConfig, dispatchRequest, jsonpRequest } from './utils.js'
import { getBasicAuth } from '@/libs/utils'
export default {
  // post请求
  post (url = '', data = {}, options = {}) {
    console.log(url, data, options)
    return this.request({
      method: 'POST',
      data: data,
      url: url,
      ...options
    })
  },

  // get请求
  get (url = '', data = {}, options = {}) {
    return this.request({
      method: 'GET',
      data: data,
      url: url,
      ...options
    })
  },

  // put请求
  put (url = '', data = {}, options = {}) {
    return this.request({
      method: 'PUT',
      data: data,
      url: url,
      ...options
    })
  },

  // delete请求
  delete (url = '', data = {}, options = {}) {
    return this.request({
      method: 'DELETE',
      data: data,
      url: url,
      ...options
    })
  },

  // jsonp请求(只限于H5使用)
  jsonp (url = '', data = {}, options = {}) {
    return this.request({
      method: 'JSONP',
      data: data,
      url: url,
      ...options
    })
  },

  // 接口请求方法
  async request (data) {
    // 请求数据
    let requestInfo
    // 是否运行过请求开始钩子
    let runRequestStart = false
    try {
      if (!data.url) {
        /*eslint-disable*/
        throw { message: '【request】缺失数据url', status: 0 }
      }
      // 数据合并
     const token =  uni.getStorageSync('token')

      requestInfo = mergeConfig(data)
      requestInfo.header['Authorization'] =getBasicAuth(token);
      console.log(data,requestInfo)
      // 代表之前运行到这里
      runRequestStart = true
      // 请求前回调
      if (this.requestStart) {
        const requestStart = this.requestStart(requestInfo)
        if (typeof requestStart === 'object') {
          const changekeys = ['data', 'header', 'isPrompt', 'load', 'isFactory']
          changekeys.forEach(key => {
            requestInfo[key] = requestStart[key]
          })
        } else {
          /*eslint-disable*/
          throw {
            message: '【request】请求开始拦截器未通过',
            status: 0,
            data: requestInfo.data,
            method: requestInfo.method,
            header: requestInfo.header,
            url: requestInfo.url
          }
        }
      }
      let requestResult = {}
      if (requestInfo.method === 'JSONP') {
        requestResult = await jsonpRequest(requestInfo)
      } else {
        requestResult = await dispatchRequest(requestInfo)
      }
      // 是否用外部的数据处理方法
      if (requestInfo.isFactory && this.dataFactory) {
        // 数据处理
        const result = await this.dataFactory({
          ...requestInfo,
          response: requestResult
        })
        return Promise.resolve(result)
      } else {
        return Promise.resolve(requestResult)
      }
    } catch (err) {
      this.requestError && this.requestError(err)
      return Promise.reject(err)
    } finally {
      // 如果请求开始未运行到，请求结束也不运行
      if (runRequestStart) {
        this.requestEnd && this.requestEnd(requestInfo)
      }
    }
  }
}
