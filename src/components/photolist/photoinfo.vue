<template>
    <div>
      <h3 style="text-align: center;color: #0CA9D9">{{photoinfo.title}}</h3>
      <div class="title_xia">
        <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
        <span>点击：{{photoinfo.click}}次</span>
      </div>
      <hr>

<!--      缩略图区域-->
      <suolue-box :id="this.id"></suolue-box>

      <div v-html="photoinfo.content" class="content"></div>
<!--      评论组件-->
      <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
  //导入评论子组件
  import comment from '../common/comment'
  import suolue from '../common/suolue'
    export default {
        name: "photoinfo",
      data(){
          return {
            id:this.$route.params.id,
            photoinfo:{}  //图片详情
          };
      },
      created(){
        this.getPhotoInfo();
      },
      methods:{
        getPhotoInfo(){                  //获取图片详情
          this.$axios.get('api/getimageInfo/' + this.id).then(res => {
            if(res.data.status ===0) {
              console.log(res.data);
              this.photoinfo = res.data.message[0];
            }
          })
        }
      },
      components:{
        'comment-box':comment,
        'suolue-box':suolue
      }
    }
</script>

<style scoped lang="less">
  .page{
    padding: 0 5px;
    hr{
      margin: 0;padding: 0;
    }
    h3{
      font-size: 16px;
      padding: 19px 0 15px 0;
      margin: 0;
    }
  }
  .title_xia{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    span{
      color: #aaa;
      font-size: 12px;
    }
  }
  .content{
    line-height: 30px;
    font-size: 15px;
  }
</style>
