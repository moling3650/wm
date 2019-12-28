<template>
  <view>
    <view class="recomm-container list">
      <view v-for="(item, index) in newList" :key="index" class="list-item">
        <list-view :options="item" @click="gotoDetail(item)" @someLove="someLove"></list-view>
      </view>
    </view>
    <view class="loading-text">
      {{ contentext }}
    </view>
  </view>
</template>

<script>
  import listView from '@/components/listview.vue'

  export default {
    name: 'recommend',
    components: {
      listView
    },
    data() {
      return {
        newList: [],
        pageIndex: 1,
        pageSize: 20,
        contentext: '',
        metaId: '1906032244030001',
        timer: null
      }
    },
    onLoad() {
      // this._getMeta()
      this._getNews();
    },
    methods: {
      onPullDownRefresh() {
        // 下拉刷新请求第一次数据
        this._getNews()
      },
      onReachBottom() {
        if (this.timer != null) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.contentext = '加载中。。。'
          this.getMoreNews();
        }, 1000)
      },
      _getMeta() {
        this.$api.meta({}).then(res => {
          console.log(res, "ddd")
        })
      },
      getMoreNews() {
        uni.showNavigationBarLoading() // 显示加载动画
        const parmes = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          metaId: this.metaId
        }
        this.$api.news(parmes).then(res => {
          const {
            code,
            data
          } = res || {}
          if (data == null) {
            uni.hideNavigationBarLoading()
            return
          }
          if (code === 200) {
            this.pageIndex++
            this.newList = this.newList.concat(data.items)
            uni.hideNavigationBarLoading()
          }
        })
      },
      _getNews() {
        this.pageIndex = 1;
        uni.showNavigationBarLoading()
        const parmes = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          metaId: this.metaId
        }
        this.$api.news(parmes).then(res => {
          this.pageIndex++;
          const {
            code,
            data
          } = res || {}
          if (code === 200) {
            this.newList = data.items
            uni.hideNavigationBarLoading()
            uni.stopPullDownRefresh()
          }
        })
      },
      someLove(newList) {
        const parmes = {
          id: newList.id,
          targetId: newList.targetId,
        }
        let minus = -1;
        this.$api.parise(parmes).then(res => {
          newList.status = minus
          console.log(res, '----------------')
        })
        console.log(newList, 'newList')
      },
      gotoDetail(detail) {
        uni.navigateTo({
          url: '/pages/detail/detail?query=' + detail.id
        });
        console.log('跳转详情')
      }
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
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // padding: 29upx;
  }

  .list-item {
    margin: 20upx 0upx 0 20upx;
    // &:nth-child(2n){
    // 	margin-left: 0;
    // }
  }

  .loading-text {
    width: 100%;
    text-align: center;
    color: #2F85FC;
  }
</style>
