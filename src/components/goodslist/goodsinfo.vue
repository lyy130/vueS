<template>
    <div>
<!--      //加入购物车小球-->
      <transitoin>
        <div class="ball" v-if="ballFlag"></div>
      </transitoin>

<!--      商品轮播区域-->
      <div class="panel1">
        <van-panel title="" desc="" status="">
          <div>
            <swiper-box :lunbotuList="lunbotu"></swiper-box>
          </div>
<!--          <div slot="footer">-->
<!--            <van-button size="small">按钮</van-button>-->
<!--            <van-button size="small" type="danger">按钮</van-button>-->
<!--          </div>-->
        </van-panel>
      </div>
<!--商品购买区域-->
      <div class="panel2">
        <van-panel :title="goodsinfo.title" desc="" status="">
            <div slot="footer">
              <div class="price">
                <span>市场价：</span>
                <span class="s_price">￥{{goodsinfo.market_price}}</span>
                <span>销售价：</span>
                <span class="x_price">{{goodsinfo.sell_price}}</span>
              </div>
              <div>
                <span style="display: inline-block;margin-top: 8px;vertical-align: middle;font-size: 12px">购买数量:</span>
                <van-stepper v-model="value" min="1" max="8" integer/>
              </div>
              <van-button size="small" type="info">立即购买</van-button>
              <van-button size="small" type="danger" @click="goshop">加入购物车</van-button>
            </div>
        </van-panel>
      </div>
<!--商品参数区域-->
      <div class="panel3">
        <van-panel title="商品参数" desc="" status="">
            <div>
              <span>商品货号</span>
              <span>{{goodsinfo.goods_no}}</span>
            </div>
            <div>
              <span>库存情况</span>
              <span>{{goodsinfo.stock_quantity}}件</span>
            </div>
            <div>
              <span>上架时间</span>
              <span>{{goodsinfo.add_time | dateFormat}}</span>
            </div>
          <div slot="footer">
            <van-button size="large" type="info" plain @click="goDesc(id)">图文介绍</van-button>
            <van-button size="large" type="danger" plain @click="goodscomment(id)">商品评论</van-button>
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
            isW100:false,
            value: 1,
            goodsinfo:{},
            ballFlag:true
          }
      },
      created(){
        this.getLunbotu();
        this.getGoodsInfo();
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
          },
        getGoodsInfo(){
            this.$axios.get('api/goods/getinfo/' + this.id).then(res => {
              if(res.data.status === 0) {
                this.goodsinfo = res.data.message[0];
              }
            })
        },
        goDesc(id){
            this.$router.push({path:'/home/goodsdesc/'+ id});
        },
        goodscomment(id){
          this.$router.push({path:'/home/goodscomment/'+ id});
        },
        goshop(){
            this.ballFlag = !this.ballFlag;
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
    .van-cell{
      .van-cell__title{
        flex: none;
      }
    }
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
    .panel2{
      .price{
        span{
          font-size: 12px;
          &.s_price{
            text-decoration: line-through;
          }
          &.x_price{
            color: red;
          }
        }
      }
      .van-stepper{
        display: inline-block;
        .van-stepper__input{
          width: 32px;
          height: 28px;
          padding: 0;
          background-color: #f2f3f5;
          border: 0;
          border-width: 1px 0;
          border-radius: 0;
          -webkit-appearance: none;
          margin-bottom: 0px;
        }
      }
      .van-panel__footer{
        padding-top: 18px;
        padding-bottom: 15px;
        .van-button{
          margin-top: 8px;
        }
      }
    }
    .panel3{
      .van-panel__content{
        padding: 18px 16px 15px 16px;
        span{
          font-size: 12px;
          color: #aaa;
          margin-bottom: 20px;
        }
      }
      .van-panel__footer{
        padding-top: 14px;
        .van-button{
          margin-bottom: 20px;
        }
      }
    }
    .ball{
      width: 20px;
      height: 20px;
      background: red;
      position: absolute;
      z-index: 1000;
      top: 437px;
      left: 108px;
      border-radius: 50%;
    }
  }

</style>
