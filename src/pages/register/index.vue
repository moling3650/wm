<template>
  <form class="form" @submit="formSubmit">
    <view class="form-item">
      <view class="form-label">手机号码</view>
      <input class="form-control full uni-input" v-model="form.accountId" maxlength="11" placeholder="请填写手机号码" @blur="checkAccountId" />
    </view>
    <view class="form-item">
      <view class="form-label">登录密码</view>
      <input class="form-control full uni-input" v-model="form.password" maxlength="18" type="password" placeholder="请填写登录密码" />
    </view>
    <view class="form-item">
      <view class="form-label">昵称</view>
      <input class="form-control full uni-input" v-model="form.nickname" maxlength="18" placeholder="请填写昵称" />
    </view>
    <view class="form-item">
      <view class="form-label">验证码</view>
      <input class="form-control uni-input" v-model="form.imgCode" maxlength="18" placeholder="请填写验证码" />
      <image class="form-img" :src="img" mode="aspectFit" @click="getImgCode" />
    </view>
    <view class="form-item">
      <button class="form-submit" form-type="submit">提交注册</button>
    </view>
  </form>
</template>

<script>
  const regPhone = /^1[3|4|5|8|9]\d{9}/
  const regPws = /^[a-zA-Z0-9]\w{6,18}/

  export default {
    data() {
      return {
        form: {
          accountId: '',
          password: '',
          nickname: '',
          imgCodeId: '',
          imgCode: '',
        },
        img: ''
      }
    },

    created() {
      this.getImgCode()
    },

    methods: {
      // 获取图片验证码
      getImgCode() {
        this.$api.getImageCode().then(data => {
          this.form.imgCodeId = data.id
          this.img = data.data
        })
      },

      // 验证账号
      checkAccountId() {
        if (!regPhone.test(this.form.accountId)) {
          uni.showToast({
            title: '请填写正确的手机号码',
            icon: 'none'
          })
          return false
        }
        return true
      },

      // 验证密码
      checkPassword() {
        if (!regPhone.test(this.form.password)) {
          uni.showToast({
            title: '请填写8-16位的大小写英文或数字',
            icon: 'none'
          })
          return false
        }
        return true
      },

      // 提交注册
      formSubmit() {
        if (this.checkAccountId() && this.this.checkPassword()) {
          this.$api.register(this.form).then(data => {
            uni.navigateTo({
              url: '/pages/logs/log'
            })
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form {
    display: flex;

    .form-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: 80rpx;
      margin: 36rpx 56rpx;
    }

    .form-label {
      width: 140rpx;
      font-size: 28rpx;
      color: #333;
    }

    .form-control {
      flex: auto;

      &.uni-input {
        height: 80rpx;
        padding-left: 18rpx;
        border: 2rpx solid #E6E6E6;
        border-radius: 10rpx;
        background: #FFF;
      }
    }

    .form-img {
      width: 200rpx;
      height: 80rpx;
      margin-left: 8rpx;
    }

    .form-submit {
      width: 100%;
      height: 80rpx;
      border: 2rpx solid #22A0E2;
      border-radius: 10rpx;
      margin-top: 400rpx;
      color: #FFF;
      font-size: 28rpx;
      background: #4A90E2;
    }
  }
</style>
