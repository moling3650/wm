<template>
  <view class="bg">
    <view class="header block">
      <view class="left" @click="goback">
        <text class="iconfont wm-iconleft fs20"></text>
      </view>
      <view class="search">
        <input type="text" v-model="keyword" class="header-input">
      </view>
      <view class="right">搜索</view>
    </view>
    <view class="history block">
      <subtitle>搜索历史</subtitle>
      <history-list :listData="historyList" @query="query"></history-list>
    </view>

    <view class="hot block">
      <subtitle>热门分类</subtitle>
      <tab-tag :tagList="tagList" @change="tabChange"></tab-tag>
      <history-list :listData="hotList" @query="query"></history-list>
    </view>
  </view>
</template>

<script>
  import subtitle from '@/components/subtitle'
  import historyList from '@/components/historyList'
  import tabTag from '@/components/tabTag'

  export default {
    name: 'search',
    components: {
      subtitle,
      historyList,
      tabTag
    },
    data() {
      return {
        hotClass: '热门分类',
        keyword: '',
        tagList: [
          '娱乐',
          '体育',
          '生活',
          '自然',
          '艺术',
          '汽车',
          '旅游',
          '美食',
          '音乐',
          '奇葩',
        ],
        historyList: [
          '搞笑',
          '第一个项目',
          '第一的塔',
          '第一座城',
          '第一人'
        ],
        hotList: [],
      }
    },
    methods: {
      query(name) {
        this.keyword = name
      },
      tabChange(tag) {
        this.hotList = [0, 1, 2, 3, 4].map(i => `${tag}_${i}`)
      },
      goback() {
        uni.navigateBack()
      }
    }
  }
</script>

<style lang="css" scoped>
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #F2F2F2;
    background: #F5F5F9;
  }

  .block {
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
  }

  .header {
    display: flex;
    flex-direction: row;
    padding: 11px 0 8px 0;
  }

  .left {
    width: 40px;
    height: 35px;
    line-height: 35px;
    text-align: center;
  }

  .header-input {
    width: 550rpx;
    height: 70rpx;
    background: #F2F2F2;
    border-radius: 200rpx;
    padding: 0 40rpx;
    box-sizing: border-box;
  }

  .right {
    width: 62px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: center;
  }

  .line {
    width: 100px;
    height: 9px;
    background: #f5f5f5;
  }

  .history,
  .hot {
    padding: 40rpx 24rpx;
  }

  .hot {
    margin-top: 18rpx;
  }

  .fs20 {
    font-size: 40rpx;
  }
</style>
