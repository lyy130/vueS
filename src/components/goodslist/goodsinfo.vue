<template>
    <div>
<!--      //加入购物车小球-->
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>

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
                <van-stepper v-model="value" min="1" :max="goodsinfo.stock_quantity" integer/>
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
            ballFlag: false, // 控制小球的隐藏和显示的标识符
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
          // 先拼接一个保存到store中商品数据
          var goodssp = {id:this.id,count:this.value,price:this.goodsinfo.sell_price,selected:true}
          // this.ballFlag = !this.ballFlag;
          this.$store.commit('increment',goodssp);
          console.log(goodssp)
        },
        beforeEnter(el) {
          el.offsetWidth;
          el.style.transform = "translate(0, 0)";
          el.style.display = "block";
          el.style.opacity = "1";
        },
        enter(el, done){
          el.offsetWidth;
          el.style.display = "block";
          el.style.opacity = "1";
          // el.style.transform = "translate(150px, 450px)"
          el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)"

          // 经过分析：先得出购物车徽标的坐标，然后在得到小球的坐标，然后去横纵坐标差值，不管分辨率以及滑动，始终得到的是差值
          //               获取页面距离：domObject.getBoundingClientRect()


          //获取小球的在页面中的距离/
          const ballPosition = this.$refs.ball.getBoundingClientRect();
          // 由于购物车导航栏属于父组件，用$ref拿不到，可以通过父子组件传值，但麻烦，如果只是简单的业务逻辑不涉及到数据，可以使用dom
          const badgePosition = document.getElementById('badge').getBoundingClientRect();

          const xDist = badgePosition.left-ballPosition.left;
          const yDist = badgePosition.top-ballPosition.top;

          el.style.transform = `translate(${xDist}px,${yDist}px)`;
          done()
        },
        afterEnter(el){
          el.offsetWidth;
          this.ballFlag = !this.ballFlag;
        },
        step1(){
          this.$refs.step1.val()
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
      z-index: 99;
      top: 437px;
      left: 108px;
      border-radius: 50%;
      /*transform: translate(128px, 181px);*/                       /*  先测试小球位置，然后移动到钩子中*/
    }
  }

</style>
