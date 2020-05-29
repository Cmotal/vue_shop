import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// import './plugins/element.js'
import './assets/css/global.css'
import '../src/assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
import NProgress from 'nprogress'

Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(config => {
  NProgress.start()
  return config
})

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
