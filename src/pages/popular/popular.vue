<template>
  <view id="popular">
    <news-list ref="news" meta-id="1906032244030001" />
  </view>
</template>

<script>
  import newsList from '@/components/newsList'

  export default {
    name: 'popular',
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
    }
  }
</script>

<style lang="css" scoped>
  /* #ifndef APP-PLUS */
  page {
    width: 100%;
    min-height: 100%;
    display: flex;
  }
  /* #endif */
</style>
