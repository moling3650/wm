<template>
  <view class="view border" @click="click">
    <view class="cover-wrap">
      <image class="cover" :src="item.coverUrl || defaultImg"></image>
    </view>
    <view class="container">
      <view class="header">
        <p class="title">{{ item.title }}</p>
      </view>
      <view class="footer">
        <view class="tags">
          <text class="tag" v-if="item.tags">{{ item.tags }}</text>
        </view>
        <view class="praise">
          <view class="iconfont" :class="!item.isPraise ? 'icon-praise' : 'icon-praise-fill'" @click.stop="savePraise(item)"></view>
          <text class="count">{{ item.praiseCount }}</text>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    name: 'NewsItem',
    data() {
      return {
        defaultImg: 'https://image.dugoogle.com/uploads/allimg/190621/18-1Z621160T90-L.jpg'
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {

      click() {
        this.$emit('click')
      },

      savePraise(news) {
        this.$api.savePraise({
          targetType: 1,
          targetId: news.id,
          title: news.title,
        }).then(_ => {
          this.$emit('praised')
          uni.showToast({
            title: '点赞成功',
            icon: 'none'
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .view {
    width: 344rpx;
    flex-direction: column;
    border-radius: 10rpx;
    border: 2rpx solid #E6E6E6;
  }

  .cover-wrap {
    width: 100%;
    height: 354rpx;

    .cover {
      width: 100%;
      height: 100%;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 216rpx;

    .header {
      height: 136rpx;
      margin: 0 16rpx;

      .title {
        height: 80rpx;
        overflow: hidden;
        margin: 30rpx 0;
        font-size: 28rpx;
        line-height: 40rpx;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      border-top: 2rpx solid #F2F2F2;
      margin: 0 16rpx;
      .praise {
        display: flex;
        align-items: center;
        height: 40rpx;
        flex-basis: 100rpx;
        .iconfont {
          flex-basis: 30rpx;
        }
        .count {
          flex: 1;
          margin-left: 10rpx;
          font-size: 28rpx;
          color: #4A4A4A;
          letter-spacing: 2rpx;
        }
      }
    }

  }
</style>
