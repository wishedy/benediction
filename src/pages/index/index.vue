<template>
<view>首页数据</view>
</template>

<script>
import { showToast } from '@/libs/utils'
export default {
  data () {
    return {
      message: ''
    }
  },
  onLoad (options) {
    console.log(options)
    showToast('加载完毕')
  },
  methods: {
    /**
     * 初始化微信菜单
     */
    initMenu () {
      try {
        uni.hideShareMenu()
        uni.hideHomeButton()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
