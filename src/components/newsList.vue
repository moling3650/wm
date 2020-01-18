<template>
  <view class="list">
    <view v-for="item in dataList" :key="item.id" class="list-item">
      <news-item :item="item" @click="gotoDetail(item.id)" @praised="updateNews(item)" />
    </view>
    <view v-show="isEnd" class="tips fs14 color-default">{{ tips }}</view>
  </view>
</template>

<script>
  import newsItem from '@/components/newsItem'

  export default {
    name: 'NewsList',
    props: {
      apiKey: {
        type: String,
        required: true
      },
      apiParams: {
        type: Object,
        default () {
          return {}
        }
      },
      pageSize: {
        type: Number,
        default: 20
      }
    },
    components: {
      newsItem
    },
    data() {
      return {
        dataList: [],
        pageIndex: 1,
        isEnd: false,
        tips: '',
      }
    },
    computed: {
      params() {
        return {
          ...this.apiParams,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }
    },
    methods: {
      // 获取文章列表
      _fetchNews(pageIndex) {
        this.pageIndex = pageIndex
        uni.showNavigationBarLoading()

        this.$api[this.apiKey](this.params).then(data => {
          uni.hideNavigationBarLoading()
          if (data.total === 0) {
            this.isEnd = true
            this.tips = '没有搜索到内容'
          } else if (data.items.length === 0) {
            this.isEnd = true
            this.tips = '没有更多内容'
          } else if (pageIndex === 1) {
            uni.stopPullDownRefresh()
            this.dataList = data.items
          } else {
            this.dataList = this.dataList.concat(data.items)
          }
        })
      },

      // 第一次获取文章
      getNews() {
        this._fetchNews(1)
      },

      // 获取更多文章
      getMoreNews() {
        if (!this.isEnd) {
          this._fetchNews(this.pageIndex + 1)
        }
      },

      // 点赞后更新文章状态
      updateNews(news) {
        this.$set(news, 'praiseCount', news.praiseCount + 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &-item {
      margin: 12rpx;
    }

    .tips {
      margin-top: 10rpx;
    }
  }
</style>
