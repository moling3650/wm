<template>
  <view class="log-container">
    <view v-if="method !== 'weixin'">
      <view class="log-img-box">
        <image class="img" src="../../static/logo.png"></image>
      </view>
      <form @submit="formSubmit" class="form-list">
        <view class="form-item mr24">
          <view class="label">
            <text class="text fs14 color33">手机号码</text>
          </view>
          <view class="form-item-input">
            <input class="uni-input fs14" v-model="accountId" name="input" maxlength="11" placeholder="请输入手机号码" />
          </view>
        </view>
        <view class="form-item" v-if="method === 'password'">
          <view class="label">
            <text class="text fs14 color33">登录密码</text>
          </view>
          <view class="form-item-input">
            <input class="uni-input fs14" v-model="password" name="input" password maxlength="18" placeholder="请输入登录密码" />
          </view>
        </view>
        <view class="form-item" v-if="method === 'mobile'">
          <view class="label">
            <text class="text fs14 color33">短信验证码</text>
          </view>
          <view class="form-item-input">
            <input class="uni-input uni-input-code fs14" v-model="smsCode" name="input" placeholder="请输入验证码" />
          </view>
          <view>
            <button class="btn-code fs14 color99" :class="{ 'active': isDisabled }" :disabled="isDisabled" @click="getSmsCode">
              {{ smsCodeText }}
            </button>
          </view>
        </view>
        <view class="regires">
          <text class="color-default fs14" @click="gotoRegister">注册</text>
        </view>
        <view class="uni-btn-v">
          <button formType="submit" type="primary" class="submit">立即登录</button>
        </view>
      </form>
      <view class="footer-list">
        <view class="mr-item12" v-for="(item, index) in submitMethods" :key="item.text" :class="{'border-lr': index === 1}"
          @click="tab(item.method)">
          <text class="color99 fs14" :class="{'color-default': method === item.method}">{{ item.text }}</text>
        </view>
      </view>
    </view>
    <wx-auth v-if="method === 'weixin'"></wx-auth>
  </view>
</template>

<script>
  import wxAuth from '@/components/userAuth/wxAuth'

  const regPhone = /^1[3|4|5|8|9]\d{9}/
  const regPws = /^[a-zA-Z0-9]\w{6,18}/

  export default {
    components: {
      wxAuth
    },
    data() {
      return {
        method: 'password',
        accountId: '13763003364',
        password: 'hp123456',
        smsCodeText: '获取',
        smsCode: '',
        submitMethods: [{
            method: 'mobile',
            text: '短信验证码登录'
          },
          {
            method: 'password',
            text: '账号密码登录'
          },
          {
            method: 'weixin',
            text: '微信登录'
          },
        ]
      }
    },

    computed: {
      isDisabled() {
        return this.smsCodeText !== '获取'
      }
    },

    onShow() {
      const token = uni.getStorageSync('token')
      if (token) {
        this.$api.getUserInfo().then(_ => {
          uni.switchTab({
            url: '/pages/recommend/recommend'
          })
        })
      }
    },
    methods: {
      // 切换登录方式
      tab(method) {
        this.method = method
        clearInterval(this.timer)
        this.smsCodeText = '获取'
      },

      // 获取手机验证码
      getSmsCode() {
        if (!regPhone.test(this.accountId)) {
          uni.showToast({
            title: '请输入手机号',
            icon: 'none'
          })
          return false
        }
        this.checkedAccountId = this.accountId // 保存验证的手机号
        let time = 60
        this.timer = setInterval(() => {
          if (time === 0) {
            this.smsCodeText = '获取'
            clearInterval(this.timer)
          } else {
            this.smsCodeText = (time < 10 ? '0' + time : time) + 's'
            time--
          }
        }, 1000)
      },

      // 用户登录
      formSubmit() {
        const params = {
          accountId: this.accountId,
          method: this.method
        }
        if (this.method === 'mobile') { // 短信验证码登录
          params.smsCode = this.smsCode
        } else if (this.method === 'password') { // 账号密码登录
          if (!regPhone.test(this.accountId) || !regPws.test(this.password)) {
            uni.showToast({
              title: '手机格式或密码不正确',
              icon: 'none'
            })
            return false
          }
          params.password = this.password
        }
        this.$api.login(params).then(res => {
          uni.setStorageSync('token', res.token)
          uni.switchTab({
            url: '/pages/recommend/recommend'
          })
        })
      },

      // 跳转注册页面
      gotoRegister() {
        uni.navigateTo({
          url: '/pages/register/index'
        })
      }
    },

  }
</script>

<style lang="scss" scoped>
  /* #ifndef APP-PLUS */
  page {
    font-size: 28upx;
  }

  /* #endif */
  .log-container {
    padding: 0 50upx;
  }

  .log-img-box {
    width: 240upx;
    height: 240upx;
    border-radius: 50upx;
    margin: 50upx auto 90upx auto;
    overflow: hidden;

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .form-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80upx;
  }

  .mr24 {
    margin-bottom: 48upx;
  }

  .label {
    width: 148upx;
    text-align: left;
  }

  .submit {
    height: 80upx;
    line-height: 80upx;
    font-size: 28upx;
    background: #2F85FC;
  }

  .uni-input {
    width: 500upx;
    height: 80upx;
    border: 2upx solid #E6E6E6;
    border-radius: 10upx;
    padding-left: 20upx;
    box-sizing: border-box;
  }

  .btn-code {
    width: 128upx;
    height: 78upx;
    line-height: 78upx;
    background: #ECECEC;
    border: 2upx solid #E6E6E6;
    border-radius: 10upx;
    margin-left: 20upx;
  }

  .active {
    background-color: #2F85FC !important;
    border: 2upx solid #2F85FC;
    color: #fff !important;
  }

  .uni-input-code {
    width: 352upx;
  }

  .regires {
    margin: 20upx 0 47upx;
    text-align: right;
  }

  .footer-list {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56upx;
    margin-top: 200upx;
  }

  .border-lr {
    border-left: 2upx solid #ccc;
    border-right: 2upx solid #ccc;
  }

  .mr-item12 {
    padding: 0 20upx;
  }
</style>
