<template>
  <div>
<!--    <h3>商品</h3>-->
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
  import comment from '../common/comment'
    export default {
        name: "goodscomment",
      data(){
          return {
            id:this.$route.params.id
          }
      },
      methods:{

      },
      components:{
          comment:comment
      }
    }
</script>

<style scoped lang="less">
  .page{
    padding: 0 5px;
  }
</style>
