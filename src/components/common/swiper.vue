<template>
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
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
            images: [
              'https://img.yzcdn.cn/vant/apple-1.jpg',
              'https://img.yzcdn.cn/vant/apple-2.jpg'
            ]
          }
        },
      // props:["lunbotu"]
    }
</script>

<style scoped>

</style>
