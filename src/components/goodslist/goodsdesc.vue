<template>
    <div>
      <h3 class="title_sp">{{info.title}}</h3>
      <hr>
      <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
    export default {
        name: "goodsdesc",
      data(){
          return {
            info:{},
            id:this.$route.params.id
          }
      },
      created(){
          this.getGoodsDesc();
      },
      methods:{
          getGoodsDesc(){
            this.$axios.get('api/goods/getdesc/' + this.id).then(res => {
              if(res.data.status ==0) {
                this.info = res.data.message[0];
              }
            })
          }
      }
    }
</script>

<style lang="less">
  .page{
    padding: 0 5px;
    .title_sp{
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px;
    }
    .content{
      img{
        width: 100%!important;
        height: auto!important;
      }
    }
  }

</style>
