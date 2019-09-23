// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$axios = axios
import { Header ,Swipe, SwipeItem, Button} from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
import 'mint-ui/lib/style.css' //注意，此处样式要单独引入。

/*设置公共的url*/
import global_ from './components/base/base'
Vue.prototype.GLOBAL = global_;                                 
axios.defaults.baseURL=global_.BASE_URL;
Vue.prototype.$ajax = axios;

//mui的引入
// import mui from './assets/dist/js/mui.min.js'
import './assets/dist/css/mui.min.css' //注意，此处样式要单独引入。
import './assets/dist/css/icons-extra.css' //注意，此处样式要单独引入。
// Vue.prototype.mui = mui

//vant引入
import { Tabs, Tab, Lazyload } from 'vant';
Vue.use(Tabs).use(Tab);
// options 为可选参数，无则不传
Vue.use(Lazyload);
import 'vant/lib/index.css';

// 图片预览（vant）
// import { ImagePreview } from 'vant';                    /******************************************放在这不行(单独引入)******************************************/
// Vue.use(ImagePreview);

Vue.config.productionTip = false

//导入格式化时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,                          /* 挂载路由在实例上*/
  components: { App },
  template: '<App/>'
})
