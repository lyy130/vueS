<template>
    <div>
      <ul class="goods-list">
<!--        <router-link v-for="item in goodslist" :to="'/home/goodsinfo/' + item.id" tag="li">-->
<!--          <div class="img-box">-->
<!--            <img :src="item.img_url" alt="">-->
<!--            <h4>{{item.title}}</h4>-->
<!--          </div>-->
<!--          <div class="detain">-->
<!--            <div class="price">-->
<!--              <span class="new-price">￥{{item.sell_price}}</span>-->
<!--              <span class="old-price">￥{{item.market_price}}</span>-->
<!--            </div>-->
<!--            <div class="mai">-->
<!--              <span>热卖中</span>-->
<!--              <span>剩{{item.stock_quantity}}件</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </router-link>-->
        <li v-for="item in goodslist" :to="'/home/goodsinfo/' + item.id" @click="getgoodsindo(item.id)" :key="item.id">
          <div class="img-box">
            <img :src="item.img_url" alt="">
            <h4>{{item.title}}</h4>
          </div>
          <div class="detain">
            <div class="price">
              <span class="new-price">￥{{item.sell_price}}</span>
              <span class="old-price">￥{{item.market_price}}</span>
            </div>
            <div class="mai">
              <span>热卖中</span>
              <span>剩{{item.stock_quantity}}件</span>
            </div>
          </div>
        </li>
      </ul>
      <mt-button type="danger" size="large" @click="getGoodsMore">加载更多</mt-button>
    </div>
</template>

<script>
  import {Toast} from  'mint-ui'
    export default {
        name: "goodslist",
      data(){
          return{
            pageIndex: 1,   // 分页
            goodslist:[] //存放商品列表数据
          }
      },
      created(){
          this.getGoodsList();
      },
      methods:{
          //获取商品列表
          getGoodsList(){
            this.$axios.get('api/getgoods?pageindex=' + this.pageIndex).then(res => {
              if(res.data.status ===0) {
                console.log(res.data);
                Toast("加载成功。。。");
                  this.goodslist = this.goodslist.concat(res.data.message);
              }
            })
          },
        // 加载更多
        getGoodsMore(){
            this.pageIndex++;
            this.getGoodsList();
        },
        // 实现编程式导航
        getgoodsindo(id){
            this.$router.push({path:'goodsinfo/' + id})
        }
      }
    }
</script>

<style scoped lang="less">
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    width: 97%;
    margin: 0 auto;
    margin-top: 6px;
    margin-bottom: 16px;
    background: #EDEEEC;
    box-shadow: 0 0 3px 1px #EDEEEC;
    li{
      width: 47.5%;
      box-shadow: 0 0 3px 1px #c9c9c9;
      margin-right: 5%;
      box-sizing: border-box;
      margin-top: 10px;
      &:nth-of-type(1),&:nth-of-type(2){
        margin-top: 0;
      }
      .img-box{
        width: 100%;
        height: 251px;
        background: white;
        img{
          width: 100%;
          height: 193px;
        }
        h4{
          font-size: 15px;
          padding-right: 10px;
          box-sizing: border-box;
          padding-left: 2px;
        }
      }
      &:nth-of-type(2n){
        margin-right: 0;
      }
      .detain{
        padding: 7px 8px 13px 8px;
        .price{
          .new-price{
            color: red;
            margin-left: -2PX;
            margin-right: 5px;
          }
          .old-price{
            font-size: 13px;
            color: #aaa;
            text-decoration:line-through;
          }
        }
        .mai{
          display: flex;
          color: #aaa;
          justify-content: space-between;
        }
      }
    }
  }
</style>
