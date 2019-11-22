import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || ''
    },
    mutations: {
        ['SET_TOKEN'](state, data) {
            state.token = data
            localStorage.setItem('token', state.token)
        },
        ['SET_USER'](state, data) {
            state.user = JSON.stringify(data)
            localStorage.setItem('user', state.user)
        }
    },
    actions: {
        setToken({ commit }, data) {
            commit('SET_TOKEN', data)
        },
        setUser({ commit }, data) {
            commit('SET_USER', data)
        }
    },
    getters: {
        userName: (state) => JSON.parse(state.user).nickname,
        userAvatar: (state) => JSON.parse(state.user).avatar,
        userEmail: (state) => JSON.parse(state.user).email
    }
})
