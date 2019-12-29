import url_config from './config.js'

const errerCodeMap = {
  402: '没有登录或Token过期',
  403: '没有权限',
  404: '没有定义，或是资源没有被找到',
  405: '业务异常',
  500: '代码异常'
}

const request = (method, url, data) => {
  return uni.request({
    url: url_config + url,
    method,
    data,
    header: {
      'content-type': 'application/json;charset=UTF-8',
      'x-api-token': uni.getStorageSync('token') || ''
    }
  }).then(([_, res]) => {
    if (res && res.data && res.data.code === 200) {
      return res.data.data
    } else {
      return Promise.reject(res.data)
    }
  }).catch(error => {
    if (!errerCodeMap[error.code]) {
      uni.clearStorageSync()
    } else {
      console.error(errerCodeMap[error.code])
      uni.showToast({
        title: error.msg,
        icon: 'none'
      })
      return Promise.reject(error)
    }
  })
}

export default request
