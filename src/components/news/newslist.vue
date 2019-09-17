<template>
    <div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
          <router-link :to="'/home/newinfo/'+ item.id">    <!-- //   不要忘记加 / 需要使用变量，所以需要绑定，然后字符需要加‘’-->
            <img class="mui-media-object mui-pull-left" :src="item.img_url">
            <div class="mui-media-body" style="text-align: left;">
              {{item.title}}
              <p class="mui-ellipsis">
                <span>发表时间：{{item.add_time | dateFormat}}</span>
                <span> 点击：{{item.click}}次</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
  import {Toast} from  'mint-ui'
    export default {
        name: "newslist",
      data(){
          return{
           newsList: []
          }
      },
      created(){
        this.getNewsList()
      },
      methods:{
          getNewsList(){
            this.$axios.get('/api/getnewslist').then(res => {
              console.log(res)
              if (res.data.status === 0) {
                // 成功了
                Toast("加载成功。。。");
                this.newsList = res.data.message;
              } else {
                // 失败的
                Toast("加载轮播图失败。。。");
              }
            }).catch(err => { //请求失败就会捕获报错信息//err.response可拿到服务器返回的报错数据
              })
          }
      }
    }
</script>

<style scoped lang="less">
  .mui-media{
    .mui-ellipsis{
      display: flex;
      justify-content: space-between;
      span{
        color: #226aff;
        font-size: 12px;
      }
    }
  }
</style>
