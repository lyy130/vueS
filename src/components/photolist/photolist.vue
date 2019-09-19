<template>
    <div>
      <van-tabs swipeable >
        <van-tab v-for="item in cates"  :key="item.id">
          <div class="tab-title" slot="title" @click="getPhotoListByCateId(item.id)">{{ item.title }}</div>
<!--          <div class="tab-content">{{ item.content }}</div>-->
        </van-tab>
        <img v-for="item in list" v-lazy="item.img_url" :key="item.id" >
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
</style>
<style scoped lang="less">
  .page{
    padding: 0 4px;
  }
</style>
