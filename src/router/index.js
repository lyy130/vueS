import Vue from 'vue'
import Router from 'vue-router'        /*引入路由包*/
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/tabar/Home'
import member from '@/components/tabar/Menber'
import shopcar from '@/components/tabar/Shopcar'
import search from '@/components/tabar/Search'
import newslist from '@/components/news/newslist'
import newinfo from '@/components/news/newinfo'
import photolist from '@/components/photolist/photolist'
import photoinfo from '@/components/photolist/photoinfo'
import goodslist from '@/components/goodslist/goodslist'
// import home from '@/components/tabar/Home.vue'   /* 导入组件包*/


Vue.use(Router)        /*安装路由*/

export default new Router({                     /* 创建路由对象，并将其暴露出去*/
  routes: [
    {path: '/', redirect:'/home'},// component: HelloWorld
    {path: '/home',name: 'home', component: home }, /* 第一个是router-link对应的to值*/  /* 第二个是import后面的组建名*/
    {path: '/member', name: 'member', component: member},
    {path: '/shopcar', name: 'shopcar', component: shopcar},
    {path: '/search', name: 'search', component: search},
    {path:'/home/newalist',component:newslist},
    {path:'/home/newinfo/:id',component:newinfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/photoinfo/:id',component:photoinfo},
    {path:'/home/goodslist/',component:goodslist}
  ],
  linkActiveClass:'mui-active'  //覆盖默认的路由高亮的类
})
