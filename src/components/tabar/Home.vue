<template>
    <div>
      <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped lang="less">
  @bgc1 :red;
  @bgc2 :blue;
  @bgc3 :pink;
.mint-swipe{
  height: 200px;
  .mint-swipe-item{
    &:nth-of-type(1){
      background: @bgc1;
    }
    &:nth-of-type(2){
      background: @bgc2;
    }
    &:nth-of-type(3){
      background: @bgc3;
    }
  }
}
</style>
