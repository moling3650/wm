<template>
  <view class="center">
    <view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
      <image class="logo-img" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
      <view class="logo-title">
        <text class="uer-name">Hi，{{login ? uerInfo.name : '您未登录'}}</text>
        <text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
      </view>
    </view>
    <view class="center-list">
      <view class="center-list-item border-bottom">
        <text class="list-icon">&#xe60f;</text>
        <text class="list-text">账号管理</text>
        <text class="navigat-arrow">&#xe65e;</text>
      </view>
      <view class="center-list-item">
        <text class="list-icon">&#xe639;</text>
        <text class="list-text">新消息通知</text>
        <text class="navigat-arrow">&#xe65e;</text>
      </view>
    </view>
    <view class="center-list">
      <view class="center-list-item border-bottom">
        <text class="list-icon">&#xe60b;</text>
        <text class="list-text">帮助与反馈</text>
        <text class="navigat-arrow">&#xe65e;</text>
      </view>
      <view class="center-list-item">
        <text class="list-icon">&#xe65f;</text>
        <text class="list-text">服务条款及隐私</text>
        <text class="navigat-arrow">&#xe65e;</text>
      </view>
    </view>
    <view class="center-list">
      <view class="center-list-item">
        <text class="list-icon">&#xe614;</text>
        <text class="list-text">关于应用</text>
        <text class="navigat-arrow">&#xe65e;</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        login: false,
        avatarUrl: '/static/logo.png',
        uerInfo: {}
      }
    },
    methods: {
      goLogin() {
        if (!this.login) {
          console.log('点击前往登录');
        }
      }
    }
  }
</script>

<style>
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
    background-color: #F8F8F8;
  }

  .center {
    flex-direction: column;
  }

  .logo {
    width: 750rpx;
    height: 240rpx;
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #2F85FC;
    flex-direction: row;
    align-items: center;
  }

  .logo-hover {
    opacity: 0.8;
  }

  .logo-img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 150rpx;
  }

  .logo-title {
    height: 150rpx;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-left: 20rpx;
  }

  .uer-name {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 38rpx;
    color: #FFFFFF;
  }

  .go-login.navigat-arrow {
    font-size: 38rpx;
    color: #FFFFFF;
  }

  .login-title {
    height: 150rpx;
    align-items: self-start;
    justify-content: center;
    flex-direction: column;
    margin-left: 20rpx;
  }

  .center-list {
    background-color: #FFFFFF;
    margin-top: 20rpx;
    width: 750rpx;
    flex-direction: column;
  }

  .center-list-item {
    height: 90rpx;
    width: 750rpx;
    box-sizing: border-box;
    flex-direction: row;
    padding: 0rpx 20rpx;
  }

  .border-bottom {
    border-bottom-width: 1rpx;
    border-color: #c8c7cc;
    border-bottom-style: solid;
  }

  .list-icon {
    width: 40rpx;
    height: 90rpx;
    line-height: 90rpx;
    font-size: 34rpx;
    color: #2F85FC;
    text-align: center;
    font-family: texticons;
    margin-right: 20rpx;
  }

  .list-text {
    height: 90rpx;
    line-height: 90rpx;
    font-size: 34rpx;
    color: #555;
    flex: 1;
    text-align: left;
  }

  .navigat-arrow {
    height: 90rpx;
    width: 40rpx;
    line-height: 90rpx;
    font-size: 34rpx;
    color: #555;
    text-align: right;
    font-family: texticons;
  }
</style>
