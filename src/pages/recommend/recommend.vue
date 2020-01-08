<template>
  <view id="recommend">
    <news-list ref="news" meta-id="1906032244030001" />
  </view>
</template>

<script>
  import newsList from '@/components/newsList'

  export default {
    name: 'recommend',
    components: {
      newsList
    },

    // 监听页面初次渲染完成
    onReady() {
      this.$refs.news.getNews()
    },

    // 监听用户下拉动作
    onPullDownRefresh() {
      this.$refs.news.getNews()
    },

    // 页面滚动到底部的事件
    onReachBottom() {
      this.$refs.news.getMoreNews()
    },

    // 跳转到搜索页面
    onNavigationBarButtonTap() {
      uni.navigateTo({
        url: '/pages/search/search'
      })
    }
  }
</script>

<style lang="scss" scoped>
  /* #ifndef APP-PLUS */
  page {
    width: 100%;
    min-height: 100%;
    display: flex;
  }

  /* #endif */
</style>
