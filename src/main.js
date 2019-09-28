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
import { Tabs, Tab, Lazyload, Panel, Stepper, Switch} from 'vant';
Vue.use(Tabs).use(Tab);   //缩略图
// options 为可选参数，无则不传
Vue.use(Lazyload);      //懒加载
Vue.use(Panel);        //带有标题的面板
Vue.use(Stepper);     //商品购买数量加号    步进器
Vue.use(Switch);
import 'vant/lib/index.css';

// 图片预览（vant）
// import { ImagePreview } from 'vant';                    /******************************************放在这不行(单独引入)******************************************/
// Vue.use(ImagePreview);

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次打开浏览器时，首先从本地吧购物车数据读出来放到store中
var cart = JSON.parse(localStorage.getItem('cart') || '[]')
//vuex实例
var store = new Vuex.Store({
  state:{
    cart:cart         //存商品对象   {id:商品id, count:商品数量, price:商品单价,selected:商品开关}
    // count:0
  },
  mutations:{
    increment(state,goodssp){
      //点击加入购物车，把商品i西南西保存到store中cart，如果已经存在，那么直接更新数量，如果没有那么就push
      var flag=false;  //默认没有找到商品
      state.cart.some(item => {
        if(item.id == goodssp.id){
          // item.count+= goodsinfo.count   /*  由于客户可能是字符串，需要转成数字*/
          item.count += parseInt(goodssp.count);
          flag = true;
          return true;          //终止循环
        }
      });
      // 如果循环完毕没有找到对应商品
      if(!flag){
        state.cart.push(goodssp)
      }
      console.log(state.cart);
      //当更新cart数组之后，存储到本地中
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    updateGoodsinfo(state,goodssp) {
      //修改购物车商品的数值
      //分析
    }
  },
  //由于加入购物车之后，导航栏徽标立刻改变，所以用getters
  getters:{
    getall(state){
      var c = 0;
      state.cart.forEach(item => {
        c+=item.count
      })
      return c
    },
    getsplist(state){
      var o = [];
      state.cart.forEach(item => {
        o[item.id] = item.count;
      })
      return o
    }
  }
})


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
  store,                           /* 挂在vuex实例上*/
  components: { App },
  template: '<App/>'
})
