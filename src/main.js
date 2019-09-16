// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Header ,Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import 'mint-ui/lib/style.css' //注意，此处样式要单独引入。
// import mui from './assets/dist/js/mui.min.js'
import './assets/dist/css/mui.min.css' //注意，此处样式要单独引入。
import './assets/dist/css/icons-extra.css' //注意，此处样式要单独引入。
// Vue.prototype.mui = mui
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,                          /* 挂载路由在实例上*/
  components: { App },
  template: '<App/>'
})
