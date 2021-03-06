import request from '@/common/request'

const getEnumApis = {
  getEnumByNewsCategory: () => request('GET', `/enum/newscategory`), // 文章类别
  getEnumByAdSlot: () => request('GET', `/enum/adslot`), //广告位置
  getEnumByAdType: () => request('GET', `/enum/adtype`), //广告类型
  getEnumByMaterialType: () => request('GET', `/enum/materialtype`) //素材类型
}

const api = {
  ...getEnumApis,
  login: params => request('POST', '/login', params), // 用户登录
  getUserInfo: _ => request('GET', '/user/info'), // 获取登录用户
  getImageCode: _ => request('GET', '/imagecode'), // 获取图片验证码
  sendSmsCode: params => request('POST', '/sendsmscode', params), // 发送短信验证码
  checkAccount: params => request('POST', '/checkaccount', params), // 检查帐号的合法性
  register: params => request('POST', '/register', params), // 注册帐号
  logout: _ => request('POST', '/user/logout'), // 退出登录
  getNews: params => request('POST', '/news', params), // 查询文章列表
  getNewsById: id => request('GET', `/news/${id}`), // 查询文章详情
  getCommentsByNewsId: (id, params) => request('GET', `/news/${id}/comments`, params), // 查询文章评论
  getRepliesByCommentId: (id, params) => request('POST', `/comments/${id}/replies`, params) // 查询评论回复
}
// 用户行为列表
const behaviorList = [
  'Collection', // 收藏
  'Praise', // 点赞
  'Forward', // 关注
  'Comment', // 评论
  'Reply', // 回复
  'Vote' // 投票
]
behaviorList.forEach(behavior => {
  api[`save${behavior}`] = params => request('POST', `/save/${behavior.toLowerCase()}`, params) // 提交用户行为
  api[`query${behavior}`] = params => request('POST', `/my/${behavior.toLowerCase()}`, params) // 查询用户行为
})



export default api
