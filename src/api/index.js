import request from '@/common/request'

const api = {}
api.news = params => request('/news', 'POST', params)
api.meta = params => request('/meta/1', 'GET', params)
api.login = params => request('/login', 'POST', params)
api.parise = params => request('/save/parise', 'POST', params)
api.getNewsById = (url, params) => request(url, 'GET', params) 
api.getQeryUserBehavior = (url, params) => request(url, 'POST', params) 

export default api
