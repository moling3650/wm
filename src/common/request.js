import url_config from './config.js'

const request = (url, method, data) => {

  let codeNum = [401, 403, 1]

  const headers = {
    'content-type': 'application/json',
    'x-api-token': uni.getStorageSync('token') || ''
  }
  return uni.request({
    url: url_config + url,
    method,
    data,
    header: headers
  }).then(res => {
    if (res[1].data && res[1].data.code === 200) {
      return res[1].data
    } else {
      uni.showToast({
        title: res[1].data.msg,
        icon: 'none'
      });
    }
  }).catch(error => {
    if (!codeNum.indexOf(error.code)) {
      uni.clearStorageSync()
    } else {
      console.log(error.code, 'error')
      uni.showToast({
        title: error.msg,
        icon: 'none'
      });
      return Promise.reject()
    }
  })
}

export default request
