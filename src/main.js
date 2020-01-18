import Vue from 'vue'
import App from './App'
import api from '@/api/index'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$api = api
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
