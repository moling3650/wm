import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    searchHistoryList: []
  },

  mutations: {
    ADD_SEARCH_HISTORY(state, keyword) {
      // 如果关键字已在搜索历史就先删除
      const index = state.searchHistoryList.findIndex(x => x === keyword)
      if (~index) {
        state.searchHistoryList.splice(index, 1)
      }
      // 只保留最近五条搜索历史
      state.searchHistoryList = [keyword, ...state.searchHistoryList.slice(0, 4)]
    }
  }
})

export default store
