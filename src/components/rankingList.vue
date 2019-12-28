<template>
  <ul class="detail-list">
    <li class="detail-item">
      <view class="detail-text">阿里</view>
      <view class="slider"></view>
      <view>70%</view>
      <view>赞</view>
    </li>
    <li class="detail-item">
      <view class="detail-text">蚂蚁金服</view>
      <view class="slider"></view>
      <view>70%</view>
      <view>赞</view>
    </li>
    <li class="detail-item">
      <view class="detail-text">蚂蚁金服大家都觉得</view>
      <view class="slider"></view>
      <view>70%</view>
      <view>赞</view>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'detailList'
  }
</script>

<style lang="css" scoped>
  .detail-list {
    margin: 22px 18px 0;
  }

  .detail-item {
    margin-bottom: 17px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
  }

  .slider {
    display: inline-block;
    width: 200px;
    height: 25px;
    background: #4A90E2;
    vertical-align: text-top;
  }

  .detail-text {
    width: 70px;
    text-align: left;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
