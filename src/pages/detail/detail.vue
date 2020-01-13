<template>
  <view id="Detail">
    <view class="main">
      <image class="banner" :src="news.coverUrl" mode="widthFix" />
      <view class="article">
        <view class="title fs14 color33"> {{ news.title }}</view>
        <rich-text :nodes="content" />
      </view>
    </view>


    <view class="footer">
      <view class="icon" @click="savePraise">
        <text class="iconfont" :class="news.isPraise ? 'icon-praise-fill' : 'icon-praise'"></text>
        <text class="text">{{ count.praiseCount }}</text>
      </view>
      <view class="icon" @click="saveCollection">
        <text class="iconfont" :class="news.isCollection ? 'icon-collection-fill' : 'icon-collection'"></text>
        <text class="text">{{ count.collectionCount }}</text>
      </view>
      <view class="icon" @click="showComments">
        <text class="iconfont icon-comment"></text>
        <text class="text">{{ count.commentCount }}</text>
      </view>
    </view>

  </view>
</template>

<script>
  const FAIL_CONTENT = '<p>获取信息失败</p>'

  export default {
    name: 'Detail',
    data() {
      return {
        news: {},
        count: {},
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
      // 获取文章详细信息
      getDetail(id) {
        this.$api.getNewsById(id).then(data => {
          this.news = data.news
          this.content = data.news.content
          this.count = data.newsReportPo
        }).catch(err => {
          this.content = FAIL_CONTENT
        })
      },

      // 跳转评论页面
      showComments() {
        uni.navigateTo({
          url: `/pages/detail/comment?id=${this.news.id}&title=${this.news.title}`
        })
      },

      // 点赞
      savePraise() {
        this.$api.savePraise({
          targetType: 1,
          targetId: this.news.id,
          title: this.news.title,
        }).then(_ => {
          uni.showToast({
            title: '点赞成功',
            icon: 'none'
          })
        })
      },

      // 收藏
      saveCollection() {
        this.$api.saveCollection({
          targetType: 1,
          targetId: this.news.id,
          title: this.news.title,
        }).then(_ => {
          uni.showToast({
            title: '收藏成功',
            icon: 'none'
          })
        })
      },

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

    .main {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 120rpx;
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

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100rpx;
    padding: 0 20rpx;
    box-shadow: -4rpx 0 10rpx rgba(0, 0, 0, 0.2);

    .icon {
      flex-basis: 100rpx;
      flex-grow: 0;
      display: flex;
      align-items: center;

      .iconfont {
        margin-right: 10rpx;
        font-size: 48rpx;
        color: #000;
      }

      .text {
        font-size: 24rpx;
        color: #000;
      }
    }
  }
</style>
