import request from './request.js'
export default {
  post (url, params, header) {
    return request.post(url, params, header ? {
      isPrompt: true, // （默认 true 说明：本接口抛出的错误是否提示）
      load: false, // （默认 true 说明：本接口是否提示加载动画）
      header: header, // 默认 无 说明：请求头,
      isFactory: true // （默认 true 说明：本接口是否调用公共的数据处理方法，设置false后isPrompt参数将失去作用）
    } : {
      isPrompt: true, // （默认 true 说明：本接口抛出的错误是否提示）
      load: false, // （默认 true 说明：本接口是否提示加载动画）
      isFactory: true // （默认 true 说明：本接口是否调用公共的数据处理方法，设置false后isPrompt参数将失去作用）
    })
  },

  get (url, params, header) {
    return request.get(url, params, header ? {
      isPrompt: true, // （默认 true 说明：本接口抛出的错误是否提示）
      load: false, // （默认 true 说明：本接口是否提示加载动画）
      header: header, // 默认 无 说明：请求头,
      isFactory: true // （默认 true 说明：本接口是否调用公共的数据处理方法，设置false后isPrompt参数将失去作用）
    } : {
      isPrompt: true, // （默认 true 说明：本接口抛出的错误是否提示）
      load: false, // （默认 true 说明：本接口是否提示加载动画）
      isFactory: true // （默认 true 说明：本接口是否调用公共的数据处理方法，设置false后isPrompt参数将失去作用）
    })
  }
}
