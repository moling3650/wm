<template>
  <view class="title"><slot/></view>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'subtitle',
  };
</script>

<style scoped lang="css">
.title{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  text-align: left;
}
</style>
