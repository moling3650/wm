<template>
  <form>
    <ul class="logs-container">
      <li class="form-list form-list-b-25">
        <div class="label">
          <label for="">手机号码</label>
        </div>
        <div class="form-item">
          <input type="text" class="form-item-input" placeholder="请输入手机号">
        </div>
      </li>
      <li class="form-list form-list-b-25">
        <div class="label">
          <label for="">短信验证码</label>
        </div>
        <div class="form-item">
          <input type="text" class="form-item-code" placeholder="请输入手机验证码">
        </div>
        <div class="getcode">
          <button class="btn code-btn">获取</button>
        </div>
      </li>
      <li class="form-list form-list-b-25">
        <div class="label">
          <label for="">登录密码</label>
        </div>
        <div class="form-item">
          <input type="text" class="form-item-input" placeholder="请输入密码">
        </div>
      </li>
      <li class="form-right">
        <button class="submit">提交</button>
      </li>
    </ul>
  </form>
</template>

<script>
  import {
    friendlyDate
  } from '@/common/util'

  export default {
    data() {
      return {
        logs: [],
        imgUrls: [
          'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
          'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
          'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
        ]
      }
    },

    created() {
      let logs
      if (mpvuePlatform === 'my') {
        logs = mpvue.getStorageSync({
          key: 'logs'
        }).data || []
      } else {
        logs = mpvue.getStorageSync('logs') || []
      }
      this.logs = logs.map(log => friendlyDate(new Date(log)))
    }
  }
</script>

<style lang="css" scoped>
  .logs-container {
    padding: 25px;
  }

  .form-list {
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: center;
  }

  .form-list-b-25 {
    margin-bottom: 18px;
  }

  .label {
    width: 70px;
    text-align: left;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: -1.23px;
  }

  .form-item-input {
    width: 249px;
  }

  .form-item-code {
    width: 178px;
  }

  .form-item {
    text-align: left;
  }

  .form-item input {
    height: 40px;
    padding-left: 6px;
    border: 1px solid #E6E6E6;
    border-radius: 5px;
    font-size: 14px;
    color: #BFBFBF;
    letter-spacing: 1px;
  }

  .code-btn {
    width: 64px;
    height: 39px;
    border: 0;
    background: #ECECEC;
    border-radius: 5px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #BFBFBF;
    letter-spacing: -1.23px;
    text-align: center;
    margin-left: 9px;
  }

  .form-right {
    margin-top: 144px;
  }

  .submit {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #4A90E2;
    border: 1px solid #22A0E2;
    border-radius: 5px;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: -1.23px;
  }
</style>
