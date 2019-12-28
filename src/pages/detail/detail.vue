<template>
  <view id="Detail">
    <view class="main">
      <image class="banner" :src="news.coverUrl" mode="widthFix" />
      <view class="article">
        <view class="title fs14 color33"> {{ news.title }}</view>
        <rich-text :nodes="content" />
      </view>
    </view>

    <view class="comment-wrap">
      <view class="footer">
        <input v-model="word" type="text" class="uni-input" placeholder="评论一下吧">
        <view class="icons">
          <view class="icon">
            <text class="iconfont wm-iconaixin1"></text>
            <text class="text">4.1w</text>
          </view>
          <view class="icon">
            <text class="iconfont wm-iconaixin1"></text>
            <text class="text">4.1w</text>
          </view>
          <view class="icon">
            <text class="iconfont wm-iconaixin1"></text>
            <text class="text">1.7w</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  // #ifdef MP-ALIPAY
  import htmlParser from '@/common/html-parser'
  // #endif
  const FAIL_CONTENT = '<p>获取信息失败</p>'

  export default {
    name: 'Detail',
    data() {
      return {
        news: {},
        word: '',
        coverUrl: '',
        content: ''
      }
    },
    onShareAppMessage() {
      return {
        title: this.news.title,
        path: `/pages/detail/detail?id=${this.news.id}`
      }
    },
    onLoad(query) {
      // 目前在某些平台参数会被主动 decode，暂时这样处理。
      this.getDetail(query.id)
    },
    methods: {
      getDetail(id) {
        this.$api.getNewsById(id).then(data => {
          // #ifdef MP-ALIPAY
          this.content = htmlParser(data.news.content)
          // #endif
          // #ifndef MP-ALIPAY
          this.content = data.news.content
          // #endif
          this.news = data.news
          this.content = data.news.content
        }).catch(err => {
          this.content = FAIL_CONTENT
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #Detail {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-family: PingFangSC-Regular;

    .main {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 100rpx;
      left: 0;
      overflow: scroll;
    }

    .banner {
      width: 750rpx;
    }

    .article {
      margin: 14rpx 36rpx;

      .title {
        margin-bottom: 28rpx;
      }
    }
  }

  .comment-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    background: #FFF;
    box-shadow: 20rpx 10rpx 20rpx #2F85FC;
    border-top: 2rpx solid #E6;
    color: #FFF;
  }

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    padding: 0 20rpx;
  }

  .uni-input {
    width: 300rpx;
    height: 70rpx;
    padding: 0 40rpx;
    border: 2rpx solid #E6;
    border-radius: 10rpx;
    font-size: 28rpx;
    color: #333;
  }

  .icons {
    width: 400rpx;
    height: 70rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .icon {
      display: flex;
      align-items: center;
    }

    .text {
      color: #000;
    }

    .iconfont {
      margin-right: 4rpx;
      font-size: 48rpx;
      color: #000;
    }
  }
</style>
