<template>
  <view class="info-bg">
    <view class="line-20"></view>
    <view class="header-username">
      <img src="../../../static/images/user.png" />
      <text class="right-float">图标</text>
    </view>
    <view class="info-list">
      <text class="left-float">基督教的</text>
      <text class="right-float">ttu</text>
      <i>66</i>
    </view>
  </view>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .info-bg {
    background-color: #f5f5f5;

  }

  .line-20 {
    height: 20px;
  }

  .header-username {
    padding: 10px 28px 12px 10px;
    border: 1px solid #eee;
    border-right: 0;
    border-left: 0;
    background-color: #fff;

    img {
      width: 46px;
      height: 46px;
      background-size: 100%;
      vertical-align: middle;
    }
  }

  .info-list {
    width: 100%;
    height: 47px;
    line-height: 47px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }

  .left-float {
    float: left;
  }

  .right-float {
    float: right;
  }
</style>
