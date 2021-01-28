import Vue from 'vue'
import App from './App'
// 引入神策埋点
// 引入vuex
import store from './store' // 使用vconsole
// 全局组件
// 把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
