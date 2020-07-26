import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    pageDirection: 'vux-pop-in', // 页面跳转方向 vux-pop-out 后退 “vux-pop-in”前进
    pageTitle: '',
    isLoading: true
}


const mutations = {
    UPDATELOADING(state, status) {
        state.isLoading = status
    },
    SETTITLE(state, title) {
        state.pageTitle = title
    },
    UPDATEPAGEDIR(state, dir) {
        state.pageDirection = dir
    }
}
export default new Vuex.Store({state, mutations})
