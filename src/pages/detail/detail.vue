<template>
  <view>
    <view class="banner">
      <image class="banner-img" :src="newList.coverUrl"></image>
    </view>
    <view class="article-content">
      <rich-text :nodes="content"></rich-text>
    </view>
    <view class="comment-wrap">
      <view class="footer">
        <input v-model="word" type="text" class="uni-input" placeholder="评论一下吧">
        <view class="icons">
          <view class="icon">
            <text class="iconfont vt wm-iconaixin1"></text>
            <text class="text">4.1w</text>
          </view>
          <view class="icon">
            <text class="iconfont vt wm-iconaixin1"></text>
            <text class="text">4.1w</text>
          </view>
          <view class="icon">
            <text class="iconfont vt wm-iconaixin1"></text>
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
  const FAIL_CONTENT = '<p>获取信息失败</p>';
  export default {
    data() {
      return {
        newList: {},
        word: '',
        coverUrl: '',
        content: ''
      }
    },
    onShareAppMessage() {
      return {
        title: this.banner.title,
        path: '/pages/detail/detail?query=' + JSON.stringify(this.banner)
      }
    },
    onLoad(option) {
      // 目前在某些平台参数会被主动 decode，暂时这样处理。
      const id = option.query
      // console.log(id, 'iididd---', option)
      this.getDetail(id);
    },
    methods: {
      getDetail(id) {
        this.$api.getNewsById('/news/' + id, {}).then(res => {
          const {
            code,
            data
          } = res || {}
          if (code === 200) {
            // #ifdef MP-ALIPAY
            this.content = htmlParser(data.news.content);
            // #endif
            // #ifndef MP-ALIPAY
            this.content = data.news.content;
            // #endif
            this.newList = data.news;
            this.content = data.news.content;
          } else {
            this.content = FAIL_CONTENT;
          }
          console.log(res, 'detail')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .banner {
    height: 360rpx;
    overflow: hidden;
    position: relative;
    background-color: #CCC;
  }

  .banner-img {
    width: 100%;
  }

  .banner-title {
    max-height: 84rpx;
    overflow: hidden;
    position: absolute;
    left: 30rpx;
    bottom: 30rpx;
    width: 90%;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 42rpx;
    color: white;
    z-index: 11;
  }

  .article-meta {
    padding: 20rpx 40rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: gray;
  }

  .article-text {
    font-size: 26rpx;
    line-height: 50rpx;
    margin: 0 20rpx;
  }

  .article-author,
  .article-time {
    font-size: 30rpx;
  }

  .article-content {
    margin: 20rpx 20rpx 120rpx;
    overflow: hidden;
    font-size: 30rpx;
    margin-bottom: 30rpx;
  }

  .comment-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    background: #FFF;
    box-shadow: 20rpx 10rpx 20rpx #2F85FC;
    border-top: 2rpx solid #E6E6E6;
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
    border: 2rpx solid #E6E6E6;
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

    .vt {
      margin-right: 4rpx;
      font-size: 48rpx;
      color: #000;
    }
  }
</style>
