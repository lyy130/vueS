<template>
    <div>
<!--      <mt-swipe :auto="4000">-->
<!--&lt;!&ndash;        这里的key是唯一的，图片和地址都是唯一的（一般为id）&ndash;&gt;-->
<!--        <mt-swipe-item v-for="item in lunbotuList" :key="item.id">-->
<!--          <img :src="item.img" alt="">-->
<!--        </mt-swipe-item>-->
<!--&lt;!&ndash;        <mt-swipe-item>2</mt-swipe-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <mt-swipe-item>3</mt-swipe-item>&ndash;&gt;-->
<!--      </mt-swipe>-->
      <swiper-box :lunbotuList="this.lunbotuList" :isW100="this.isW100"></swiper-box>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/home/newalist">
<!--            <span class="mui-icon mui-icon-home"></span>-->
            <img src="../../assets/images/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/home/photolist">
            <img src="../../assets/images/menu2.png" alt="">
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/home/goodslist">
            <img src="../../assets/images/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../assets/images/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../assets/images/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
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
  import swiper from '../common/swiper'
    export default {
        name: "Home",
      data() {
          return {
            lunbotuList: [], // 接收api轮播图的数组
            isW100: true
          }
      },
      created(){
        this.getLun()
      },
      methods:{
        getLun(){
          this.$axios.get('/api/getlunbo',{
            // params:{  //post不需要params:这部分
            //   //请求参数
            // }
          }).then(res => {  //res是返回结果
            // console.log(res)
            if (res.data.status === 0) {
              Toast("加载成功。。。");
              // 由于轮播插件只需要图片地址，我们获取的数据不是，所以需要遍历
              res.data.message.forEach(item => {
                // item.img = item.src;
                console.log(item.img);
                this.lunbotuList.push(item.img);
              })
              // this.lunbotuList = res.data.message;
              console.log(this.lunbotuList)
            } else {
              // 失败的
              Toast("加载轮播图失败。。。");
            }
            // this.info = res.data  //存数据
          }).catch(err => { //请求失败就会捕获报错信息
            //err.response可拿到服务器返回的报错数据
          })
        }
      },
      components:{
          'swiper-box':swiper
      }
    }

</script>
<style lang="less">
  .van-swipe{
    /*img{*/
    /*  width: 100%;*/
    /*}*/
  }
</style>
<style scoped lang="less">
  /*@bgc1 :red;
  @bgc2 :blue;
  @bgc3 :pink;*/
.mint-swipe{
  height: 200px;
  .mint-swipe-item{
   /* &:nth-of-type(1){
      background: @bgc1;
    }
    &:nth-of-type(2){
      background: @bgc2;
    }
    &:nth-of-type(3){
      background: @bgc3;
    }*/
    img{
      /*width: 100%;*/
      height: 100%;
    }
  }
}
  .mui-table-view.mui-grid-view.mui-grid-9{
    background: #fff;
    li{
      border:none;
      img{
        width: 56%;
        height: 100%;
      }
    }
  }

</style>
