<template>
	<view class="center">
		<view class="hdq-header">
			<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
				<image class="logo-img" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">Hi，{{login ? uerInfo.name : '您未登录'}}</text>
					<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
				</view>
			</view>
			<view class="nav">
					<view 
						class="nanigator-item" 
						v-for="tab in nav"
						:key="tab.id"
						:class="{'active':navIndex === tab.id}"
						@click="_navBar(tab.id,tab.behavior)"
					>
						<text class="text">{{tab.text}}</text>
					</view>
			 </view>
		</view>
		<view class="recomm-container list">
			<view v-for="(item,index) in items" :key="index" class="list-item">
				<list-view :options="item" @click="gotoDetail(item)" @someLove="someLove"></list-view>
			</view>
		</view>
	</view>
</template>
<script>
	import listView from '@/components/listview.vue'
	let pageIndex=1;
	export default {
		components:{
			listView
		},
		data() {
			return {
				login: false,
				avatarUrl: '/static/logo.png',
				uerInfo: {},
				items:[],
				navIndex:1,
				behavior:'parise',
				nav:[
					{id:1,herf:'',text:'赞过',behavior:'parise'},
					{id:2,herf:'',text:'收藏',behavior:'collection'},
					{id:3,herf:'',text:'转发',behavior:'forward'},
				],
			}
		},
		onLoad() {
			this._navBar(this.navIndex,this.behavior)
		},
		methods: {
			goLogin() {
				if (!this.login) {
					console.log('点击前往登录');
				}
			},
			gotoDetail (items) {
				 uni.navigateTo({
					url: '/pages/detail/detail?query=' + items.id
				});
			},
			someLove (options) {
				 const parmes = {
				   id:options.id,
				   targetId: options.targetId,
				}
				let minus = -1;
				this.$api.parise(parmes).then(res => {
				   options.status = minus
				   console.log(res,'----------------')
				})
			},
			_navBar(id,behavior) {
				this.navIndex = id;
				const params  = {
					pageIndex: pageIndex,
					pageSize: 20,
					behaviorType: behavior
				}
				this.$api.news(params).then(res => {
					if(res.code === 200) {
						this.items = res.data.items
					}
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
	.hdq-header{
		background: #2F85FC;
		flex-direction: column;
		margin: 20upx 0;
	}
	.nav{
		/* justify-content: space-between; */
		align-items: center;
		padding: 0 80upx;
	}
	.nanigator-item{
		flex: 1;
		justify-content: center;
		/* text-align: center; */
		padding: 20upx 0;
		font-size: 28upx;
		color: #999999;
	}
	.text{
		text-align: center;
	}
	.active{
		color:#FFFFFF;
	}
	.list{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.list-item{
		margin: 0 0 20upx 20upx;
	}
</style>
