<template>
  <view id="Detail">
    <view class="main" v-show="!commentVisible">
      <image class="banner" :src="news.coverUrl" mode="widthFix" />
      <view class="article">
        <view class="title fs14 color33"> {{ news.title }}</view>
        <rich-text :nodes="content" />
      </view>
    </view>

    <view class="main" v-show="commentVisible">
      <view class="comment-wrap">
        <text class="comment-count color-default">评论（{{count.commentCount}}）</text>
        <view class="comments">
          <wm-comment v-for="c in comments" :key="c.id" :comment="c" />
        </view>
      </view>
    </view>

    <view class="footer-wrap">
      <view class="footer">
        <input v-model="word" type="text" class="uni-input" placeholder="评论一下吧" @focus="sendBtnVisible = true">
        <button v-if="sendBtnVisible" type="primary" size="mini" @click="saveComment">发送</button>

        <view v-show="!sendBtnVisible" class="icon" @click="saveParise">
          <text class="iconfont icon-praise"></text>
          <text class="text">{{ count.praiseCount }}</text>
        </view>
        <view v-show="!sendBtnVisible" class="icon" @click="saveCollection">
          <text class="iconfont icon-collection"></text>
          <text class="text">{{ count.collectionCount }}</text>
        </view>
        <view v-show="!sendBtnVisible" class="icon" @click="showComment">
          <text class="iconfont icon-comment"></text>
          <text class="text">{{ count.commentCount }}</text>
        </view>

      </view>
    </view>
  </view>
</template>

<script>
  // #ifdef MP-ALIPAY
  import htmlParser from '@/common/html-parser'
  // #endif
  import wmComment from '@/components/wmCommet'

  const FAIL_CONTENT = '<p>获取信息失败</p>'

  export default {
    name: 'Detail',
    components: {
      wmComment
    },
    data() {
      return {
        commentVisible: false,
        sendBtnVisible: false,
        news: {},
        count: {},
        comments: [],
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
          this.count = data.newsReportPo
        }).catch(err => {
          this.content = FAIL_CONTENT
        })
      },

      showComment() {
        this.commentVisible = !this.commentVisible
        this.$api.queryComment({
          targetId: this.news.id
        }).then(data => {
          this.comments = data.items
        })
      },

      saveParise() {
        this.$api.saveParise({
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

      saveComment() {
        if (this.word) {
          this.$api.saveComment({
            targetType: 1,
            targetId: this.news.id,
            title: this.news.title,
            content: this.word
          }).then(_ => {
            uni.showToast({
              title: '评论成功',
              icon: 'none'
            })
            this.sendBtnVisible = false
            this.word = ''
          })
        }
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
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 40rpx;
    border-top: 40rpx solid #F5F5F9;
    background-color: #FFF;

    .comment-count {
      font-size: 12px;
      margin-bottom: 40rpx;
    }
  }

  .footer-wrap {
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
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    padding: 0 20rpx;
  }

  .uni-input {
    flex: 1;
    height: 70rpx;
    padding: 0 40rpx;
    border: 2rpx solid #E6;
    border-radius: 10rpx;
    font-size: 28rpx;
    color: #333;
  }

  .icon {
    flex-basis: 100rpx;
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
</style>
