import request from '@/common/request'

const api = {
  login: params => request('POST', '/login', params), // 用户登录
  getUserInfo: _ => request('GET', '/user/info'), // 获取登录用户
  getImageCode: _ => request('GET', '/imagecode'), // 获取图片验证码
  sendSmsCode: params => request('POST', '/sendsmscode', params), // 发送短信验证码
  checkAccount: params => request('POST', '/checkaccount', params), // 检查帐号的合法性
  register: params => request('POST', '/register', params), // 注册帐号
  logout: _ => request('POST', '/user/logout'), // 退出登录
  getNews: params => request('POST', '/news', params), // 查询文章列表
  getNewsById: id => request('GET', `/news/${id}`) // 查询文章详情
}
// 用户行为列表
const behaviorList = [
  'collection', // 收藏
  'parise', // 点赞
  'forward', // 关注
  'comment', // 评论
  'reply', // 回复
  'vote' // 投票
]
behaviorList.forEach(behavior => {
  api[`save${behavior}`] = params => request('POST', `/save/${behavior}`, params) // 提交用户行为
  api[`query${behavior}`] = params => request('POST', `/my/${behavior}`, params) // 查询用户行为
})

export default api
