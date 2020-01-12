<template>
  <view class="list">
    <view v-for="item in dataList" :key="item.id" class="list-item">
      <news-item :item="item" @click="gotoDetail(item.id)" @praised="updateNews"></news-item>
    </view>
  </view>
</template>

<script>
  import newsItem from '@/components/newsItem'

  export default {
    name: 'NewsList',
    props: {
      metaId: {
        type: String,
        required: true
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
        pageIndex: 1
      }
    },
    computed: {
      params() {
        return {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          metaId: this.metaId
        }
      }
    },
    methods: {
      // 获取文章列表
      _fetchNews(pageIndex) {
        this.pageIndex = pageIndex
        uni.showNavigationBarLoading()

        this.$api.getNews(this.params).then(data => {
          uni.hideNavigationBarLoading()
          if (data == null) {
            return
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
        this._fetchNews(this.pageIndex + 1)
      },

      // 点赞后更新文章状态
      updateNews(news) {

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
  }

</style>
