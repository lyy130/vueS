<template>
    <div>
      <h4>发表评论</h4>
      <textarea  class="pinlun" name="" id="" cols="20" rows="10" placeholder="请输入要BB的内容(最多20个字)" v-model="msg"></textarea>
      <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
      <ul class="comment">
        <li v-for="(item,i) in comments" :key="item.add_time">
          <p>第{{i+1}}楼 用户：{{item.user_name}} 发表时间：{{item.add_time | dateFormat}}</p>
          <p>{{item.content === 'undefined' ? '此用户很懒，啥也没说':item.content}}</p>
        </li>
<!--        <li>-->
<!--          <p>第1楼 用户：匿名用户 发表时间：2017-09-20 11:49:05</p>-->
<!--          <p>傻逼</p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <p>第1楼 用户：匿名用户 发表时间：2017-09-20 11:49:05</p>-->
<!--          <p>傻逼</p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <p>第1楼 用户：匿名用户 发表时间：2017-09-20 11:49:05</p>-->
<!--          <p>傻逼</p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <p>第1楼 用户：匿名用户 发表时间：2017-09-20 11:49:05</p>-->
<!--          <p>傻逼</p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <p>第1楼 用户：匿名用户 发表时间：2017-09-20 11:49:05</p>-->
<!--          <p>傻逼</p>-->
<!--        </li>-->
      </ul>
      <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>

</template>

<script>
    import {Toast} from  'mint-ui'
    export default {
        name: "common",
      data(){
          return {
            pageIndex:1,    //默认展示第一页
            comments:[],    //所有的评论数据
            msg:''
          };
      },
      created(){
         this.getComments() ;
      },
      methods:{
          getComments(){
            this.$axios.get("api/getcomments/" +this.id+ "?pageindex=" + this.pageIndex).then(res => {
              if(res.data.status === 0){
                console.log(res)
                this.comments =   this.comments.concat( res.data.message)
                console.log(this.comments)
              } else{
                Toast("获取评论失败");
              }
            })
          },   //获取评论
          getMore(){
              this.pageIndex++;
              this.getComments();
          },
          //发表评论
        postComment(){
            //校验是否为空
            if(this.msg.trim().length === 0) {
              return Toast("评论不能为空")                                  /*--------------- 为啥return-------------------------------*/
            }
            this.$axios.post('api/postcomment/'+ this.$route.params.id,{
              content:this.msg.trim()
            }).then(res => {
              if(res.data.status ===0) {
                // 添加数据，先拼接出一个数据模板对象，再push 或者unshift
                var cmt = {user_name:'匿名用户',add_time:Date.now(),content:this.msg.trim()};
                this.comments.unshift(cmt);
                this.msg = "";
              }
            })
        }
      },
      props:["id"]
    }
</script>

<style scoped lang="less">
  .pinlun{
    height: 70px;
    margin-bottom: 0px;
  }
  .comment{
    list-style: none;
    padding-left: 0;
    margin-top: 6px;
    p{
      margin-bottom: 6px;
      &:first-of-type{
        background: #ccc;
        padding: 5px 0;
        color: black;
      }
      &:nth-of-type(2){
        padding-left: 20px;
        min-height: 21px;
      }
    }
  }
</style>
