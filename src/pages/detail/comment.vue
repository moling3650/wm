<template>
  <view class="page">
    <view class="body">
      <text class="comment-count color-default">评论（{{comments.length}}）</text>
      <view class="comments">
        <wm-comment v-for="c in comments" :key="c.id" :comment="c" @click.native="clickComment(c)" />
      </view>
    </view>
    <view class="footer">
      <input ref="input" v-model="word" type="text" class="uni-input" :placeholder="placeholder">
      <button type="primary" size="mini" @click="submit">发送</button>
    </view>
  </view>
</template>

<script>
  import wmComment from '@/components/wmCommet'

  export default {
    components: {
      wmComment
    },
    data() {
      return {
        newsId: '',
        newsTitle: '',
        word: '',
        selectedComment: null,
        comments: [],
        inputFoucs: false
      }
    },
    computed: {
      placeholder() {
        if (!this.selectedComment) {
          return '评论一下吧'
        }
        return `回复${this.selectedComment.nickname}`
      }
    },

    onLoad(news) {
      this.newsId = news.id
      this.newsTitle = news.title
      this.fetchComments()
    },

    methods: {
      clickComment(c) {
        this.selectedComment = c
      },

      // 获取评论
      fetchComments() {
        return this.$api.queryComment({
          targetId: this.newsId
        }).then(data => {
          this.comments = data.items
        })
      },

      // 提交输入框的内容
      submit() {
        if (this.word) {
          if (this.selectedComment) {
            this.saveReply()
          } else {
            this.saveComment()
          }
        }
      },

      // 保存评论
      saveComment() {
        this.$api.saveComment({
          targetType: 1,
          targetId: this.newsId,
          title: this.newsTitle,
          content: this.word
        }).then(_ => {
          this.fetchComments()

          uni.showToast({
            title: '评论成功',
            icon: 'none'
          })
          this.word = ''
        })
      },

      // 保存回复
      saveReply() {
        this.$api.saveReply({
          targetType: 2,
          targetId: this.selectedComment.id,
          title: this.newsTitle,
          content: this.word
        }).then(_ => {
          uni.showToast({
            title: '回复成功',
            icon: 'none'
          })
          this.word = ''
        })
      }
    }
  }
</script>

<style lang="scss">
  .page {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;

    .body {
      flex: 1;
      padding: 40rpx;
      border-top: 40rpx solid #F5F5F9;
      background-color: #FFF;

      .comment-count {
        font-size: 12px;
        margin-bottom: 40rpx;
      }
    }

    .footer {
      flex-basis: 100rpx;
      display: flex;
      padding: 0 40rpx;
      align-items: center;
      box-shadow: -4rpx 0 10rpx rgba(0, 0, 0, 0.2);

      .uni-input {
        flex: 1;
        height: 64rpx;
        padding-left: 20rpx;
        margin-right: 20rpx;
        border: 2rpx solid #E6E6E6;
        border-radius: 10rpx;
        font-size: 14px;
        color: #333;
      }
    }


  }
</style>
