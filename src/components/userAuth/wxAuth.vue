<template>
  <view>
    <view v-if="isCanUse">
      <view>
        <view class='header'>
          <image src='../../static/logo.png'></image>
        </view>
        <view class='content'>
          <view>申请获取以下权限</view>
          <text>获得你的公开信息(昵称，头像、地区等)</text>
        </view>
        <button class='bottom' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @click="wxGetUserInfo">
          授权登录
        </button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        SessionKey: '',
        OpenId: '',
        nickName: null,
        avatarUrl: null,
        isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
      };
    },
    methods: {
      //第一授权获取用户信息===》按钮触发
      wxGetUserInfo() {
        // debugger;
        let _this = this;
        uni.getProvider({
          service: 'oauth',
          success: function(res) {
            uni.getUserInfo({
              provider: 'weixin',
              success: function(infoRes) {
                let nickName = infoRes.userInfo.nickName; //昵称
                let avatarUrl = infoRes.userInfo.avatarUrl; //头像
                try {
                  //记录是否第一次授权  false:表示不是第一次授权
                  uni.setStorageSync('isCanUse', false);
                  _this.updateUserInfo();
                } catch (e) {}
              },
              fail(res) {}
            });
          }
        })
      },
      //登录
      login() {
        let _this = this;
        uni.showLoading({
          title: '登录中...'
        });
        console.log('dddd')
        uni.getProvider({
          service: 'oauth',
          success: function(res) {
            // 1.wx获取登录用户code
            uni.login({
              provider: 'weixin',
              success: function(loginRes) {
                console.log(loginRes.code, 'loginRes.code')
                let code = loginRes.code;
                if (!_this.isCanUse) {
                  //非第一次授权获取用户信息
                  uni.getUserInfo({
                    provider: 'weixin',
                    success: function(infoRes) {
                      //获取用户信息后向调用信息更新方法
                      let nickName = infoRes.userInfo.nickName; //昵称
                      let avatarUrl = infoRes.userInfo.avatarUrl; //头像
                      _this.updateUserInfo(); //调用更新信息方法
                    }
                  });
                }

                //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
                uni.request({
                  url: '服务器地址',
                  data: {
                    code: code,
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: (res) => {
                    //openId、或SessionKdy存储//隐藏loading
                    uni.hideLoading();
                  }
                });
              },
            })
          }
        })
      },
      //向后台更新信息
      updateUserInfo() {
        let _this = this;
        uni.request({
          url: 'url', //服务器端地址
          data: {
            appKey: this.$store.state.appKey,
            customerId: _this.customerId,
            nickName: _this.nickName,
            headUrl: _this.avatarUrl
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            if (res.data.state == "success") {
              uni.reLaunch({ //信息更新成功后跳转到小程序首页
                url: '/pages/index/index'
              });
            }
          }

        });
      }
    },
    onLoad() {
      //默认加载
      debugger;
      console.log('默认加载')
      this.login();
    }
  }
</script>

<style scoped>
  .header {
    /* margin: 90rpx 0 90rpx 50rpx; */
    border-bottom: 2rpx solid #ccc;
    text-align: center;
    width: 650rpx;
    height: 300rpx;
    line-height: 450rpx;
  }

  .header image {
    width: 200rpx;
    height: 200rpx;
  }

  .content {
    margin: 50rpx 0 90rpx 50rpx;
    /* margin-bottom: 90rpx; */
  }

  .content text {
    display: block;
    color: #9D9D9D;
    margin-top: 40rpx;
  }

  .bottom {
    border-radius: 80rpx;
    margin: 70rpx 50rpx;
    font-size: 35rpx;
    color: #FFF;
    background: #2F85FC;
  }
</style>
