<template>
  <view class="wm-comment">
    <text class="iconfont icon-user"></text>
    <view class="wm-comment-main">
      <view class="wm-comment-main-header">
        <view class="author">{{ comment.nickname }}</view>
        <view class="time">{{ comment.createTime | friendlyDate }}</view>
      </view>
      <view class="wm-comment-main-body">
        <view class="content">{{ comment.content }}</view>
        <view class="praise">
          <text class="iconfont" :class="!comment.isPraise ? 'icon-praise' : 'icon-praise-fill'"></text>
          <text class="count">{{ comment.praiseCount }}</text>
        </view>
      </view>
      <view class="wm-comment-main-footer" v-if="comment.replyCount > 0 && !comment.replies">
        <text class="text color-default" @click.stop="$emit('view-reply', comment)">查看{{ comment.replyCount }}条回复</text>
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
    margin: 20rpx 0;

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
        justify-content: space-between;
        margin-top: 20rpx;

        .content {
          flex: 1;
          font-size: 26rpx;
        }

        .praise {
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

      &-footer {
        margin: 20rpx 0;

        .text {
          font-size: 22rpx;
        }
      }
    }
  }
</style>
