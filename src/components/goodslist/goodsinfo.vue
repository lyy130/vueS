<template>
    <div>
      <div class="panel1">
        <van-panel title="标题" desc="" status="">
          <div>
            <swiper-box :lunbotuList="lunbotu"></swiper-box>
          </div>
          <div slot="footer">
            <van-button size="small">按钮</van-button>
            <van-button size="small" type="danger">按钮</van-button>
          </div>
        </van-panel>
      </div>

    </div>
</template>

<script>
  import Vue from 'vue';
  import { Button } from 'vant';
  Vue.use(Button);
  // 导入轮播图子组件
  import swiper from '../common/swiper'
    export default {
        name: "goodsinfo",
      data(){
          return{
            id:this.$route.params.id,
            lunbotu:[],
            isW100:false
          }
      },
      created(){
        this.getLunbotu();
      },
      methods:{
          getLunbotu(){
            this.$axios.get('api/getthumimages/' + this.id).then(res => {
              if(res.data.status ===0) {
                res.data.message.forEach(item => {
                  // item.img = item.src;
                  console.log(item)
                  this.lunbotu.push(item.src);
                })
              }
            })
          }
      },
      components:{
          'swiper-box':swiper
      }
    }
</script>

<style lang="less">
  body{
    background: #eee!important;
    .panel1{
      width: 97%;
      margin: 0 auto;
      margin-top: 18px;
      margin-bottom: 18px;
      .van-panel{
        padding-bottom: 20px;
        box-shadow: 0 0 2px 1px #b9b9b9;
        .van-panel__content{
          padding: 10px 16px;
        }
      }
    }
  }

</style>
