<template>
  <view class="view border" v-if="options.title" @click="click">
    <view>
      <image class="image" v-if="options.coverUrl" :src="options.coverUrl"></image>
      <image class="image" v-else :src="defaultImg" />
    </view>
    <view class="list-item-box border-b">
      <text class="list-item-content fs14">{{options.title}}</text>
      <!-- <rich-text :nodes="options.content"></rich-text> -->
    </view>
    <view class="type-item flex-row">
      <view>
        <text class="type fs12" v-if="options.tags">{{options.tags}}</text>
      </view>
      <view class="type-item">
        <view class="iconfont vt" :class="[options.status === 0 ? 'wm-iconxin' : 'wm-iconaixin1']" @click.stop="_someLove(options)"></view>
        <view>
          <text class="fs14 mr20">{{options.praise_count}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        defaultImg: 'https://image.dugoogle.com/uploads/allimg/190621/18-1Z621160T90-L.jpg'
      }
    },
    props: {
      options: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      click() {
        this.$emit('click')
      },
      close(e) {
        this.$emit('close')
      },
      _someLove(options) {
        this.$emit('someLove', options)
      }
    }
  }
</script>

<style scoped lang="scss">
  .view {
    width: 344rpx;
    flex-direction: column;
  }

  .flex-row {
    flex-direction: row;
  }

  .flex-col {
    flex-direction: column;
  }

  .border {
    border-radius: 10rpx;
    border: 2rpx solid #E6E6E6;
  }

  .image {
    width: 342rpx;
    height: 354rpx;
  }

  .list-item-box {
    margin: 0 12rpx;
  }

  .list-item-content {
    width: 100%;
    display: block;
    height: 70rpx;
    // padding: 26rpx 0 30rpx;
    // word-break: break-all;
    // word-wrap:break-word;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 20rpx;
  }

  .border-b {
    border-bottom: 2rpx solid #E6E6E6;
  }

  .type-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72rpx;
    // padding:0 20rpx;
  }

  .type {
    display: inline-block;
    padding: 6rpx 15rpx;
    border: 2rpx solid #ccc;
    border-radius: 20rpx;
    // text-align: left;
    margin-left: 20rpx;
  }

  .mr20 {
    margin: 0 20rpx 0 10rpx;
    vertical-align: middle;
  }

  .vt {
    vertical-align: middle;
    margin-top: 8rpx;
    // color:#F54120;
    // background: #F54120;
  }
</style>
