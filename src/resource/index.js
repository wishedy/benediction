/** *************纯粹的数据请求不包含文件上传******************/
import weChatAppApi from './core/create-api'
export const getUserInfo = (params = {}) => {
  return weChatAppApi.post('/v3/login/getUserInfoByToken')
}