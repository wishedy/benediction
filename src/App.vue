<script>
import { upDateWeChat } from '@/libs/utils'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapHomeMutations } = createNamespacedHelpers('Home')
export default {
  onLaunch: function () {
    console.log('App Launch')
    try {
      upDateWeChat()
    } catch (e) {
      console.log(e)
    }
    this.getPhoneNumberFormStore()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    ...mapHomeMutations(['setPhoneNumber']),
    // 将本地存储内的用户信息放入 vuex
    // 将本地存储内的手机号放入 vuex
    getPhoneNumberFormStore () {
      try {
        const phoneNumber = uni.getStorageSync('phoneNumber')
        if (phoneNumber) {
          this.setPhoneNumber(phoneNumber)
        }
      } catch (e) {
        // error
      }
    }
  }
}
</script>

<style>
	/*每个页面公共css */
</style>
