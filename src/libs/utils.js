import { getMpPhone, getUserInfo, ccTokenValidate } from '@/resource'
import { CC_TIME_KEY, STUDENT_TIME_KEY, EXPIRE_TIME } from '@/libs/constants'
import md5 from 'js-md5'
const Base64 = require('js-base64').Base64
export const getBasicAuth = (token) => {
  return token ? 'Basic ' + Base64.encode(token + ':') : ''
}
export const getWxPhoneNumber = (e, code) => {
  const ivObj = e.detail.iv
  const telObj = e.detail.encryptedData
  const accountInfo = uni.getAccountInfoSync()
  const appId = accountInfo.miniProgram.appId
  // ------执行Login---------
  /*eslint-disable*/
  return new Promise(async (resolve,reject)=>{
    //用code传给服务器调换session_key
    const param = {
      appId,
      code: code,
      encryptedData: telObj,
      iv: ivObj
    }
    try {
      const  response = await getMpPhone(param)
      if(response){
        //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
        if (e.detail.errMsg === 'getPhoneNumber:user deny') { //用户点击拒绝
          reject({...response,message:e.detail.errMsg})

        }else if((e.detail.errMsg).indexOf('fail')>-1){
          reject({...response,message:e.detail.errMsg})
        } else if(e.detail.errMsg==='getPhoneNumber:ok') { //允许授权执行跳转
          let phoneTest = true
          const phone = parseInt(response.phoneNumber,10)+''
          if (!(/^1[3456789]\d{9}$/.test(phone))) {
            phoneTest = false
          }
          if(phoneTest){
            resolve(response)
          }else{
            const getCodeAgain =  ()=>{
              wx.login({
                success: async (res) => {
                  const requestData = {
                    code: res.code,
                    encryptedData: telObj,
                    iv: ivObj
                  }
                  const  responseData = await getMpPhone(requestData)
                  const phoneNumber = parseInt(responseData.phone,10)+''
                  let phoneTest = true
                  if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
                    phoneTest = false
                  }
                  if(phoneTest){
                    resolve(response)
                  }else{
                    reject({...response,message:'获取手机号失败'})
                  }
                }
              })
            }
            getCodeAgain()
          }

        }
      }else{
        reject(response)

      }
    }catch (e) {
      reject(e)
    }
  })
}
export const  getEleHeight=(demo,_this)=> {
  return new Promise((resolve,reject)=>{
    const query = uni.createSelectorQuery().in(_this)
    query.select(demo).boundingClientRect(data => {
      if(data){
        resolve(data)
      }else{
        reject(demo+'获取不到id rect的值为'+data)
      }
    }).exec()
  })
}
export const createSecretKey = () =>{
  /*eslint-disable*/
  function MathRand () {
    let Num = ''
    for (let i = 0; i < 5; i++) {
      Num += Math.floor(Math.random() * 10)
    }
    return Num
  }
  const afs_code = MathRand()
  const timestamp = (new Date()).valueOf()
  const afs_nvc_val_ori = afs_code + 500 + timestamp
  const afs_nvc_val = Base64.encode(md5(afs_nvc_val_ori))
  return {
    afs_code: afs_code,
    afs_ts: timestamp,
    afs_nvc_val: afs_nvc_val
  }
}
export const getBrowserInfo = ()=>{
  let result = {}
  try {
    const res = uni.getSystemInfoSync();
    console.log(res.model);
    console.log(res.pixelRatio);
    console.log(res.windowWidth);
    console.log(res.windowHeight);
    console.log(res.language);
    console.log(res.version);
    console.log(res.platform);
    result = res
    result.message='get:ok'
  } catch (e) {
    result = e
    result.message='get:error'
    result.platform=''
    // error
  }
  return result
}
export const upDateWeChat = () => {
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate, "判断是不是更新")
    if (res.hasUpdate) {
      // 更新新版本；
      updateManager.onUpdateReady(function (res) {
        if (res.confirm) {
          // 下载准备好了，准备重启小程序
          updateManager.applyUpdate()
        }
      })
      updateManager.onUpdateFailed(function (res) {
        // 新的版本下载失败
      })
    }
  })
}
// 设置 token，记录 token 的设置时间
export const setToken = (token, type = 1) => {
  uni.setStorageSync('token', token)
  const timestamp = new Date().getTime()
  if(parseInt(type, 10) === 1){
    //1cc,2学生
    uni.setStorageSync(CC_TIME_KEY, timestamp)
  }else if(parseInt(type, 10) === 2){
    uni.setStorageSync(STUDENT_TIME_KEY, timestamp)
  }
}
export const checkToken = (type) =>{
  const token =  uni.getStorageSync('token')
  const timestamp=new Date().getTime()
  //首先判断存在token与否
  return new Promise((resolve,reject)=>{
    if(token){
      //存在token，判断token对否过期
      let time = null
      if(parseInt(type,10)===1){
        //1cc,2学生
        time = uni.getStorageSync(CC_TIME_KEY)
      }else if(parseInt(type,10)===2){
        time = uni.getStorageSync(STUDENT_TIME_KEY)
      }
      const checkUserInfo = async ()=>{
        if(parseInt(type,10)===1){
          //1cc,2学生
          const response = await ccTokenValidate()
          if(response){
            resolve(response)
          }
        }else if(parseInt(type,10)===2){
          try {
            const res = await getUserInfo()
            if(res){
              resolve(res)
            }
          }catch (e){
            console.log(e)
            /*eslint-disable*/
            reject({
              code:2,
              message:'获取用户信息失败'
            })
          }
        }
      }
      const expireOnOff = timestamp-time<EXPIRE_TIME
      if(time){
        //如果存在时间判断时间是否有效
        if(expireOnOff){
          //在有效期内
          checkUserInfo()
        }else{
          //不在有效期内
          /*eslint-disable*/
          reject({
            code:1,
            message:'token已过期'
          })
        }
      }else{
        checkUserInfo()
      }
    }else{
      //不存在token
      /*eslint-disable*/
      reject({
        code:0,
        message:'token未缓存'
      })
    }
  })

}
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
export const showToast = title => {
  uni.showToast({
    title,
    icon: 'none',
    duration: 3000
  })
}
// 保存图片到相册
export const saveImageToPhotosAlbum = src => {
  uni.showLoading({
    title: '正在保存...',
    mask:true
  })
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: src,
      success: (res) => {
        if (res.statusCode === 200) {
          uni.authorize({
            scope: 'scope.writePhotosAlbum',
            success () {
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath, // 传入临时地址
                success () {
                  uni.hideLoading()
                  showToast('保存成功')
                  resolve()
                },
                fail (e) {
                  uni.hideLoading()
                  showToast('保存图片失败')
                  console.error('Fail: saveImageToPhotosAlbum')
                  reject(e)
                }
              })
            },
            fail (e) {
              uni.hideLoading()
              showToast('海报保存失败，请退出小程序后，重新授权相册权限，可成功保存海报')
              console.error('Fail: authorize')
              reject(e)
            }
          })
        } else {
          uni.hideLoading()
          showToast('下载图片失败, CODE:' + res.statusCode)
          console.error('Fail: downloadFile code:' + res.statusCode)
          reject(new Error('Fail: downloadFile code:' + res.statusCode))
        }
      },
      fail (e) {
        uni.hideLoading()
        showToast('下载图片失败')
        console.error('Fail: downloadFile')
        reject(e)
      }
    })
  })
}
