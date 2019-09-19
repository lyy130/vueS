<template>
    <div>
      <van-tabs>
        <van-tab v-for="index in 8" :title="'标签 ' + index">
          内容 {{ index }}
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "photolist"
    }
</script>

<style scoped lang="less">
  .page{
    padding: 0 4px;
  }
</style>
