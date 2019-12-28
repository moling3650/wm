let url_config = ''

if (process.env.NODE_ENV === 'development') {
	url_config = 'http://47.92.163.70:83'
    // console.log('开发环境')
} else {
	url_config = 'http://47.92.163.70:83'
    // console.log('生产环境')
}

export default url_config
		