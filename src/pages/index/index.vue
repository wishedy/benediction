<template>
<view class="benediction-main">
<view class="benediction-content">
  <view class="benediction-item">万事如意</view>
  <view class="benediction-item">笑口常开</view>
  <view class="benediction-item">财运滚滚</view>
  <view class="benediction-item">紫气东来</view>
</view>
  <view class="benediction-handle">
    <view class="handle-item">
      <button class="button-wrapper" open-type="getUserInfo" @getuserinfo="getPerson">祝福亲友</button>
    </view>
    <view class="handle-item">保存祝福</view>
  </view>
</view>
</template>

<script>
// import { showToast } from '@/libs/utils'
export default {
  data () {
    return {
      message: ''
    }
  },
  onLoad (options) {
    const _this = this
    console.log(options)
    _this.initUserInfo()
    _this.initMenu()
    // showToast('加载完毕')
  },
  methods: {
    getPerson (e) {
      console.log(e.detail.userInfo)
    },
    initUserInfo () {
      // 查看是否授权
      wx.getSetting({
        success (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
              }
            })
          }
        }
      })
    },
    /**
     * 初始化微信菜单
     */
    initMenu () {
      try {
        uni.hideHomeButton()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.benediction-main{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url("https://jyxb-common-1252525514.cos.ap-shanghai.myqcloud.com/f0656aa2ec10fd5a4ea0e67101e6a74e.png") no-repeat center/cover;
  .benediction-content{
    position: absolute;
    width: 480rpx;
    height: 800rpx;
    top:200rpx;
    left: 40rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    .benediction-item{
      width: 64rpx;
      height: 600rpx;
      text-align: center;
      font-family: STKaiti,'Microsoft YaHei',STXingkai,KaiTi;
      font-size: 84rpx;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      letter-spacing: 8rpx;
      color: #FBEE3E;
    }
  }
  .benediction-handle{
    position: absolute;
    top:920rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 400rpx;
    height: 220rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .handle-item{
      width: 284rpx;
      height: 88rpx;
      text-align: center;
      line-height: 88rpx;
      background: #fff;
      font-size: 28rpx;
      border-radius: 8rpx;
      .button-wrapper{
        outline: none;
        border: none;
        background: none;
        line-height: 88rpx;
        font-size: 28rpx;
      }
    }

  }
}
</style>
