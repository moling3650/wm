<template>
  <view class="list">
    <view v-for="item in dataList" :key="item.id" class="list-item">
      <news-item :item="item" @click="gotoDetail(item.id)" @parise="parise"></news-item>
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

        this.$api.getNews(this.params).then(({
          code,
          data
        }) => {
          if (code === 200) {
            uni.hideNavigationBarLoading()
            if (data == null) {
              return
            } else if (pageIndex === 1) {
              uni.stopPullDownRefresh()
              this.dataList = data.items
            } else {
              this.dataList = this.dataList.concat(data.items)
            }
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

      // 跳转详情页面
      gotoDetail(id) {
        uni.navigateTo({
          url: `/pages/detail/detail?id=${id}`
        })
      },

      // 点赞
      parise(news) {
        const parmes = {
          targetId: news.id,
          targetType: 1,
          title: news.title
        }
        // this.$api.saveParise(parmes).then(res => {
        //   const index = this.newsList.findIndex(n => n.id === news.id)
        //   if (!~index) {
        //     this.newsList[index].status = -1
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // padding: 29rpx;
  }

  .list-item {
    margin: 20rpx 0 0 20rpx;
  }
</style>
