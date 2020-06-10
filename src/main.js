// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import $ from 'jquery'
Vue.config.productionTip = false

Vue.prototype.$axios = Axios
/* eslint-disable no-new */
Vue.prototype.HOST = '/novel'
// Vue.prototype.HOST = '/api'
// Axios.defaults.baseURL = '/api'
Vue.prototype.sourceUrl = 'http://www.xbiquge.la';

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

import VueSession from 'vue-session'
Vue.use(VueSession)

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
