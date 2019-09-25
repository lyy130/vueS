<template>
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in lunbotuList" :key="index">
          <img v-lazy="image" :class="{isW100}"/>
        </van-swipe-item>
      </van-swipe>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { Swipe, SwipeItem } from 'vant';
  Vue.use(Swipe).use(SwipeItem);
    export default {
        name: "swiper",
        data() {
          return {
           // img:this.img1
          }
        },
      created(){

      },
      methods:{

      },
      props:["lunbotuList","isW100"]
    }
</script>

<style lang="less">
  .van-swipe{
    height: 200px;
    text-align: center;
    img{
      height: 100%;
    }
  }
  .isW100{
    width: 100%;                       //通过动态绑定class的方式添加类
  }
</style>
