// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueScroller from 'vue-scroller'
import 'we-vue/lib/style.css'
import Common from '@/assets/common/http.js'
import we from 'we-vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.prototype.$http = Common
Vue.use(VueScroller)
Vue.use(we)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
