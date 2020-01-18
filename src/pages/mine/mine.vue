<template>
  <view class="center">
    <view class="hdq-header">
      <view class="logo">
        <image class="logo-img" :src="user.avatarUrl || avatarUrl"></image>
        <view class="logo-title">
          <text class="uer-name">Hi，{{ user.name }}</text>
        </view>
      </view>
      <view class="nav">
        <view class="nanigator-item" v-for="tab in nav" :key="tab.key" :class="{'active': activedKey === tab.key}"
          @click="tabChange(tab)">
          <text class="text">{{ tab.text }}</text>
        </view>
      </view>
    </view>
    <view class="recomm-container list">
      <news-list ref="news" :api-key="apiKey" :api-params="{ targetType: 1 }" />
    </view>
  </view>
</template>

<script>
  import newsList from '@/components/newsList'

  export default {
    name: 'Mine',
    components: {
      newsList
    },
    data() {
      return {
        avatarUrl: '/static/logo.png',
        user: {},
        activedKey: '',
        nav: [{
            key: 'Praise',
            text: '赞过'
          },
          {
            key: 'Collection',
            text: '收藏'
          },
          {
            key: 'Forward',
            text: '转发'
          },
        ],
      }
    },
    computed: {
      apiKey() {
        return `query${this.activedKey}`
      }
    },

    onShow() {
      console.log(this.$api)
      this.$api.getEnumByNewsCategory()
      this.getUserInfo().then(_ => {
        this.tabChange(this.nav[0])
      }).catch(_ => {
        uni.clearStorageSync('token')
        uni.navigateTo({
          url: '/pages/logs/log'
        })
      })
    },

    methods: {
      getUserInfo() {
        return this.$api.getUserInfo().then(data => {
          this.user = data
        })
      },

      tabChange(tab) {
        if (tab.key === this.activedKey) {
          return
        }
        this.activedKey = tab.key
        this.$nextTick(() => {
          this.$refs.news.getNews()
        })
      }
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: texticons;
    font-weight: normal;
    font-style: normal;
    src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
  }

  page,
  view {
    display: flex;
  }

  page {
    background-color: #f8f8f8;
  }

  .center {
    flex-direction: column;
  }

  .logo {
    width: 750upx;
    height: 240upx;
    padding: 20upx;
    box-sizing: border-box;
    background-color: #2F85FC;
    flex-direction: row;
    align-items: center;
  }

  .logo-hover {
    opacity: 0.8;
  }

  .logo-img {
    width: 150upx;
    height: 150upx;
    border-radius: 150upx;
  }

  .logo-title {
    height: 150upx;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-left: 20upx;
  }

  .uer-name {
    height: 60upx;
    line-height: 60upx;
    font-size: 38upx;
    color: #FFFFFF;
  }

  .go-login.navigat-arrow {
    font-size: 38upx;
    color: #FFFFFF;
  }

  .login-title {
    height: 150upx;
    align-items: self-start;
    justify-content: center;
    flex-direction: column;
    margin-left: 20upx;
  }

  .center-list {
    background-color: #FFFFFF;
    margin-top: 20upx;
    width: 750upx;
    flex-direction: column;
  }

  .center-list-item {
    height: 90upx;
    width: 750upx;
    box-sizing: border-box;
    flex-direction: row;
    padding: 0upx 20upx;
  }

  .border-bottom {
    border-bottom-width: 1upx;
    border-color: #c8c7cc;
    border-bottom-style: solid;
  }

  .list-icon {
    width: 40upx;
    height: 90upx;
    line-height: 90upx;
    font-size: 34upx;
    color: #2F85FC;
    text-align: center;
    font-family: texticons;
    margin-right: 20upx;
  }

  .list-text {
    height: 90upx;
    line-height: 90upx;
    font-size: 34upx;
    color: #555;
    flex: 1;
    text-align: left;
  }

  .navigat-arrow {
    height: 90upx;
    width: 40upx;
    line-height: 90upx;
    font-size: 34upx;
    color: #555;
    text-align: right;
    font-family: texticons;
  }

  .hdq-header {
    background: #2F85FC;
    flex-direction: column;
    margin: 20upx 0;
  }

  .nav {
    /* justify-content: space-between; */
    align-items: center;
    padding: 0 80upx;
  }

  .nanigator-item {
    flex: 1;
    justify-content: center;
    /* text-align: center; */
    padding: 20upx 0;
    font-size: 28upx;
    color: #999999;
  }

  .text {
    text-align: center;
  }

  .active {
    color: #FFFFFF;
  }

  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .list-item {
    margin: 0 0 20upx 20upx;
  }
</style>
