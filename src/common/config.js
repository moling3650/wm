let url_config = ''

if (process.env.NODE_ENV === 'development') {
  url_config = '/api'
} else {
  url_config = 'http://47.92.163.70:83'
}

export default url_config
