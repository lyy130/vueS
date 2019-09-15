import Vue from 'vue'
import Router from 'vue-router'        /*引入路由包*/
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/tabar/Home'
import member from '@/components/tabar/Menber'
import shopcar from '@/components/tabar/Shopcar'
import search from '@/components/tabar/Search'

// import home from '@/components/tabar/Home.vue'   /* 导入组件包*/


Vue.use(Router)        /*安装路由*/

export default new Router({                     /* 创建路由对象，并将其暴露出去*/
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',                                          /* 这个是router-link对应的to值*/
      name: 'home',
      component: home                                       /* 这个是import后面的组建名*/
    },
    {
      path: '/member',
      name: 'member',
      component: member
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: shopcar
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ],
  linkActiveClass:'mui-active'  //覆盖默认的路由高亮的类
})
