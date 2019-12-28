import request from '@/common/request'

const api = {
  news: params => request('/news', 'POST', params),
  meta: params => request('/meta/1', 'GET', params),
  login: params => request('/login', 'POST', params),
  parise: params => request('/save/parise', 'POST', params),
  getNewsById: (url, params) => request(url, 'GET', params),
  getQeryUserBehavior: (url, params) => request(url, 'POST', params)
}

export default api
