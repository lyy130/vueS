<template>
    <div>
      <van-tabs swipeable >
        <van-tab v-for="item in cates"  :key="item.id">
          <div class="tab-title" slot="title" @click="getPhotoListByCateId(item.id)">{{ item.title }}</div>
<!--          <div class="tab-content">{{ item.content }}</div>-->
        </van-tab>
        <router-link v-for="item in list" :key="item.id" class="lazy_box" tag="div" :to="'/home/photoinfo/' + item.id">
          <img  v-lazy="item.img_url">
          <div>
            <h4>{{item.title}}</h4>
            <p v-html="item.content" class="content"></p>
          </div>
        </router-link>

      </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "photolist",
      data(){
          return {
            cates:[],//所有分类数组
            list:[],//图片列表数据
          }
      },
      created(){
          this.getAllCategory();
          //默认显示全部
          this.getPhotoListByCateId(0);
      },
      methods:{
        getAllCategory(){
          this.$axios.get('api/getimgcategory').then(res => {
            if(res.data.status === 0) {
              console.log(res)
              res.data.message.unshift({title:"全部",id:0});
              this.cates = res.data.message;
            }
          })
        },
        //根据分类id获取图片列表
        getPhotoListByCateId(cateId){
          this.$axios.get('/api/getimages/' + cateId).then(res => {
            if(res.data.status ===0) {
              console.log(res.data)
              this.list = res.data.message;
            }
          })
        }
      }
    }
</script>
<style lang="less">
  .van-tabs__nav{
    .van-tab--active{
      color: red!important;
    }
    .van-tabs__line{
      background-color: transparent;
    }
  }
  .van-tabs__content{
    img{
      width: 100%;
      height: auto;
    }
    .lazy_box{
      position: relative;
      div{
        position: absolute;
        bottom: 5px;
        background: black;
        opacity: 0.6;
        padding: 6px 5px 6px 5px;
        h4{
          font-size: 15px;
          color: white;
        }
        .content{
          color: white;
          overflow: hidden;
          max-height: 100px;
          margin: 0;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp:4 ;
          -webkit-box-orient: vertical;
          p,span{
            margin: 0;
            padding: 0;
          }
        }
      }
    }
  }
</style>
<style scoped lang="less">
  .page{
    padding: 0 4px;
  }
</style>
