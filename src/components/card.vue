<template>
  <div>
    <div>我是的代价</div>
  </div>  
</template>

<script>
import vList from './list';
export default {
   name:'card',
   data() {
    return {
      pageIndex:1,
      pageSize:20,
      total:0,
      items:[],
    }
  },
  created() {
    this._getList();
  },
  methods: {
    _getList() {
        const parmes = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            type:'',
            status:'',
            targetId:'',
            metaId:'1906032244030001',
            behaviorType:'',
            keyword:'',
        } 
        wx.showLoading({
            title: '玩命加载中',
        })
        this.$fly.post('/news',parmes)
        .then((res)=> {
            const {code,data} = res
            wx.stopPullDownRefresh()
            if(code===0||code===200){
                if(this.pageIndex > 1) {
                    this.items.push(...data.items)
                }else {
                    this.items = data.items
                }
                this.total = data.total
                wx.hideLoading();
            }
        })
      }
    },
    components: {
        vList
    },
    // 上拉加载
    onReachBottom() {
        if(this.pageIndex > this.total) {   
             wx.hideLoading();
        } else {
            this.pageIndex++;
            this._getList()
        } 
    },
    async onPullDownRefresh() {
        wx.stopPullDownRefresh()
        this.pageIndex = 1
         this._getList();
        // console.log("下拉刷新")
    }
}
</script>

<style lang="less" scoped>
 
</style>