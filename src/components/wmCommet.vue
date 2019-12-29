<template>
  <view class="wm-comment">
    <text class="iconfont icon-user"></text>
    <view class="wm-comment-main">
      <view class="wm-comment-main-header">
        <view class="author">{{ comment.author }}</view>
        <view class="time">{{ comment.createTime | friendlyDate }}</view>
      </view>
      <view class="wm-comment-main-body">
        <view class="content">{{ comment.content }}</view>
        <view class="parise">
          <text class="iconfont icon-praise"></text>
          <text class="count">{{ comment.pariseCount }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    friendlyDate
  } from '@/common/util'
  
  export default {
    name: 'WmComment',
    props: {
      comment: {
        type: Object,
        required: true
      }
    },
    filters: {
      friendlyDate
    }
  }
</script>

<style lang="scss">
  .wm-comment {
    display: flex;
    min-height: 10rpx;

    .icon-user {
      font-size: 70rpx;
    }

    &-main {
      flex: 1;
      min-height: 10rpx;
      margin-left: 20rpx;

      &-header {
        display: flex;
        height: 70rpx;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        .author {
          font-size: 24rpx;
          color: #333;
        }

        .time {
          align-self: flex-start;
          font-size: 22rpx;
          color: #999;
        }
      }

      &-body {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 20rpx;

        .content {
          flex: 1;
        }

        .parise {
          display: flex;
          align-items: center;
          margin-left: 20rpx;

          .iconfont {
            font-size: 30rpx;
            margin-right: 12rpx;
          }

          .count {
            font-size: 24rpx;
            color: #333;
          }
        }
      }
    }
  }
</style>
