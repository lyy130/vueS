<template>
    <div>
      <mt-swipe :auto="4000">
<!--        这里的key是唯一的，图片和地址都是唯一的（一般为id）-->
        <mt-swipe-item v-for="item in lunbotuList">
          <img :src="item.img" alt="">
        </mt-swipe-item>
<!--        <mt-swipe-item>2</mt-swipe-item>-->
<!--        <mt-swipe-item>3</mt-swipe-item>-->
      </mt-swipe>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
<!--            <span class="mui-icon mui-icon-home"></span>-->
            <img src="../../assets/images/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/images/menu2.png" alt=""><span class="mui-badge">5</span></span>
            <div class="mui-media-body">图片分享</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/images/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/images/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/images/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/images/menu6.png" alt="">
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
<!--        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">-->
<!--          <a href="#">-->
<!--            <span class="mui-icon mui-icon-gear"></span>-->
<!--            <div class="mui-media-body">Setting</div>-->
<!--          </a>-->
<!--        </li>-->
<!--        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">-->
<!--          <a href="#">-->
<!--            <span class="mui-icon mui-icon-info"></span>-->
<!--            <div class="mui-media-body">about</div>-->
<!--          </a>-->
<!--        </li>-->
<!--        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">-->
<!--          <a href="#">-->
<!--            <span class="mui-icon mui-icon-more"></span>-->
<!--            <div class="mui-media-body">more</div>-->
<!--          </a>-->
<!--        </li>-->
      </ul>
    </div>
</template>

<script>
  import {Toast} from  'mint-ui'
    export default {
        name: "Home",
      data() {
          return {
            lunbotuList: [] // 保存轮播图的数组
          }
      },
      created(){
        this.getLun()
      },
      methods:{
        getLun(){
          this.$axios.get('http://www.liulongbin.top:3005/api/getlunbo',{
            // params:{  //post不需要params:这部分
            //   //请求参数
            // }
          }).then(res => {  //res是返回结果
            //你的下一步操作 例:
            // console.log(res)
            if (res.data.status === 0) {
              // 成功了
              Toast("加载成功。。。");
              this.lunbotuList = res.data.message;
            } else {
              // 失败的
              Toast("加载轮播图失败。。。");
            }
            // this.info = res.data  //存数据
          }).catch(err => { //请求失败就会捕获报错信息
            //err.response可拿到服务器返回的报错数据
          })
        }
      }
    }
</script>

<style scoped lang="less">
  @bgc1 :red;
  @bgc2 :blue;
  @bgc3 :pink;
.mint-swipe{
  height: 200px;
  .mint-swipe-item{
    &:nth-of-type(1){
      background: @bgc1;
    }
    &:nth-of-type(2){
      background: @bgc2;
    }
    &:nth-of-type(3){
      background: @bgc3;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
}
  .mui-table-view.mui-grid-view.mui-grid-9{
    background: #fff;
    li{
      border:none;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
