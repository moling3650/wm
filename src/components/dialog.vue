<template>
  <view>
    <view class="weui-mask"></view>
    <view class="weui-dialog">
      <view class="weui-dialog__hd"><strong class="weui-dialog__title">{{ dialogObj.title }}</strong></view>
      <view class="weui-dialog__bd">{{ dialogObj.content }}</view>
      <view class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">{{ dialogObj.okText }}</a>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'dialog',
    props: {
      dialogObj: {
        type: Object,
        require: true
      }
    }
  }
</script>
