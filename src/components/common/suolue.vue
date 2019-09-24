<template>
    <div>
      <img @click="showImagePreview(inx)" :src="item" v-for="(item,inx) in images" class="img-suolue">
<!--      <button  @click="componentCall"></button>-->
      <van-image-preview v-model="show" :images="images" :swipe-duration="300" @change="onChange">
        <template v-slot:index>第{{ index+1 }}张</template>
      </van-image-preview>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { ImagePreview } from 'vant';
  Vue.use(ImagePreview);
  const images = [
    // 'https://img.yzcdn.cn/vant/apple-1.jpg',
    // 'https://img.yzcdn.cn/vant/apple-2.jpg',
    // 'https://img.yzcdn.cn/vant/apple-3.jpg',
    // 'https://img.yzcdn.cn/vant/apple-4.jpg'
  ];
  export default {
    data() {
      return {
        show: false,
        images,
        index: 0,
        photo:[]
      };
    },
    created(){
      this.getThumbs();
    },
    methods: {
      // componentCall() {
      //   this.show = true;
      // },

      onChange(index) {
        this.index = index;
      },
      getThumbs(){                       //获取缩略图
        this.$axios.get('api/getthumimages/' + this.id).then(res => {
          if(res.data.status ===0) {
            console.log(res.data);
            this.photo = res.data.message;
            console.log(this.photo);
            for(var i=0;i<this.photo.length;i++){
              this.images.push(this.photo[i].src)
            }
            console.log(this.images)
          }
        })
      },
      showImagePreview(position, timer) {
        const instance = ImagePreview({
          images:this.images,
          lazyLoad: true,
          swipeDuration: 300,
          asyncClose: !!timer,
          closeOnPopstate: true,
          startPosition: typeof position === 'number' ? position : 0
        });
        if (timer) {
          setTimeout(() => {
            instance.close();
          }, timer);
        }
      }
    },
    props:["id"]
  }
</script>

<style scoped lang="less">
  .page>div:nth-of-type(2){
    width: 100%;
    display: flex;
    flex-wrap:wrap ;
    .img-suolue{
      width: 33%;
      padding: 8px;
      box-sizing: border-box;
    }
  }
</style>
