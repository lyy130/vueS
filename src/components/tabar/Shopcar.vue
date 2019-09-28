<template>
  <div>
   <div class="shopBox">
     <div class="shoplist" v-for="item in goodslist" :key="item.id">
       <van-switch v-model="checked" />
       <img :src="item.thumb_path" alt="">
       <div class="sp_detain">
         <p>{{item.title}}</p>
         <span class="price">￥{{item.sell_price}}</span>
<!--         服务器获取的数量为1，我们需要从本地获取数量，通过id获取，将id和数量为键值对 ，然后拼接为对象-->
         <van-stepper v-model="$store.getters.getsplist[item.id]" min="1" max="8" integer  />
         <span class="del">删除</span>
       </div>
     </div>
   </div>

<!--     结算-->
    <div class="js">
      <div class="js_sm">
        <p>总计（不含运费）</p>
        <p>已勾选商品0件，总价：￥0</p>
      </div>
      <div class="js_go">
        <span>去结算</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Shopcar",
      data(){
          return {
            checked:true,
            goodslist:[],
            value:1
          }
      },
      created(){
          this.getGoodsList()
      },
      methods:{
          getGoodsList(){
            //获取商品列表
            // 由于获取商品列表需要传递所有商品id值,需要遍历
            var idArr =[];
            this.$store.state.cart.forEach(item => {
              idArr.push(item.id);
              // 如果没有商品的情况
              if(idArr.length <=0) {
                return;
              }
            })
            this.$axios.get('api/goods/getshopcarlist/'+ idArr.join(',')).then(res =>{
              if(res.data.status===0) {
                  this.goodslist = res.data.message;
                  console.log( this.goodslist)
              }
            })
          }
      }
    }
</script>

<style lang="less">
  .shopBox{
    background: #ccc;
    overflow: hidden;
    .shoplist{
      margin: 13px 13px 13px 13px;
      padding: 13px;
      height: 108px;
      display: flex;
      justify-content: space-between;
      background: white;
      .van-switch {
        margin-top: 24px;
      }
      img{
        width: 64px;
        margin: 0 8px;
      }
      .sp_detain{
        span{
          font-size: 12px;
          &.price{
            color: red;
          }
          &.del{
            color: #0062cc;
          }
        }
      }
      .van-stepper{
        display: inline-block;
        vertical-align: middle;
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
    }
  }
  .js{
    padding: 23px 25px 23px 25px;
    display: flex;
    justify-content: space-between;
    .js_go{
      line-height: 58px;
      span{
        padding: 7px 10px;
        background: red;
        color: white;
      }
    }
  }
</style>
