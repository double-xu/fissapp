// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import mandMobile from 'mand-mobile'
import App from './App'
import router from './router'
import axios from 'axios'

import 'normalize.css'
import store from './router/store'
import 'mand-mobile/lib/mand-mobile.css'

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

store.commit('initialiseStore');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // beforeCreate() {//放到这里会导致第一次登陆时，无法判断
  //   console.log("store before create 方法执行");
	// 	this.$store.commit('initialiseStore');
	// }
})
