/**
 * 神策埋点
 * @url https://manual.sensorsdata.cn/sa/latest/page-17569743.html
 */

import sensors from 'sa-sdk-miniprogram'
const isDev = process.env.NODE_ENV === 'development'

const initSensor = ({
  commonPara = {} // 公共属性
} = {}) => {
  sensors.setPara({
    name: 'sensors',
    server_url: 'https://sensors-api.rouchi.com/sa' + (isDev ? '' : '?project=production'),
    // 全埋点控制开关
    autoTrack: {
      appLaunch: true, // 默认为 true，false 则关闭 $MPLaunch 事件采集
      appShow: true, // 默认为 true，false 则关闭 $MPShow 事件采集
      appHide: true, // 默认为 true，false 则关闭 $MPHide 事件采集
      pageShow: true, // 默认为 true，false 则关闭 $MPViewScreen 事件采集
      pageShare: true, // 默认为 true，false 则关闭 $MPShare 事件采集
      mpClick: true, // 默认为 false，true 则开启 $MPClick 事件采集
      mpFavorite: true // 默认为 true，false 则关闭 $MPAddFavorites 事件采集
    },
    // 自定义渠道追踪参数，如source_channel: ["custom_param"]
    source_channel: [],
    // 是否允许控制台打印查看埋点数据
    show_log: isDev,
    // 是否允许修改 onShareAppMessage 里 return 的 path，用来增加(登录 ID，分享层级，当前的 path)，在 app onShow 中自动获取这些参数来查看具体分享来源、层级等
    allow_amend_share_path: true
  })

  // 将所有事件都需要添加的属性注册为公共属性
  sensors.registerApp(commonPara)
  sensors.init()
  console.log('sensors init sucess')
}

/**
 * 设置公共埋点属性方法，设置的公共属性会在之前设置的公共属性基础上新增，
 * 属性 key 一样时，后设置的会覆盖之前的属性值
 * 当需要在内置埋点事件上添加一些属性时，可以使用此方法
 * @param {*} commonPara 公共埋点属性
 */
const setSensorCommonPara = (commonPara = {}) => {
  sensors.registerApp(commonPara)
}

/**
 * 手动埋点方法
 * @param {string} trackId 事件 id
 * @param {object} trackPara 事件属性
 */
const saTrack = (trackId, trackPara = {}) => {
  // eslint-disable-next-line no-undef
  getApp().sensors.track(trackId, trackPara)
}

export { initSensor, saTrack, setSensorCommonPara }

export default initSensor
