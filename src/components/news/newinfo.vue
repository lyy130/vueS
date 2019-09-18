<template>
  <div class="newinfo-container">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>{{newsinfo.add_time | dateFormat}}</span>
      <span>点击：{{newsinfo.click}}次</span>
    </p>
    <hr>
    <div class="content" v-html="newsinfo.content"></div>
<!--    评论子组件-->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
  import {Toast} from  'mint-ui'
  //导入评论子组件
  import comment from '../common/comment'
    export default {
        name: "newinfo",
      data(){
          return {
            id:this.$route.params.id,
            newsinfo:{}
          }
      },
      created(){
          this.getNewsInfo()
      },
      methods:{
          getNewsInfo(){
            this.$axios.get('api/getnew/' + this.id).then(res => {
              console.log(res)
              if (res.data.status === 0) {
                // 成功了
                Toast("加载成功。。。");
                this.newsinfo = res.data.message[0];
              } else {
                // 失败的
                Toast("加载轮播图失败。。。");
              }
            }).catch(err => { //请求失败就会捕获报错信息//err.response可拿到服务器返回的报错数据
            })
          }
      },
      components:{
          'comment-box':comment
      }
    }
</script>

<style scoped lang="less">
  .newinfo-container{
    padding: 0 4px;
    .title{
      font-size: 16px;
      text-align: center;
      margin: 15px 0;
      color: red;
    }
    .subtitle{
      font-size: 13px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
    .content{

    }
  }
</style>
