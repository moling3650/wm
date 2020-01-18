<template>
	<view id="SearchResult">
	  <news-list ref="news" api-key="getNews" :api-params="{ keyword }" />
	</view>
</template>

<script>
  import newsList from '@/components/newsList'

	export default {
    name: 'SearchResult',
    components: {
      newsList
    },
		data() {
			return {
				keyword: ''
			}
		},

    // 接收关键字参数
		onLoad(query) {
      console.log(query)
      this.keyword = query.keyword
		},

    onReady() {
      console.log(1)
      this.$refs.news.getNews()
    },

    // 页面滚动到底部的事件
    onReachBottom() {
      this.$refs.news.getMoreNews()
    },
	}
</script>
