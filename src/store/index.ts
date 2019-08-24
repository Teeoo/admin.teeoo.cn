import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || ''
    },
    mutations: {
        setToken(state, data) {
            state.token = data
            localStorage.setItem('token', state.token)
        },
        setUser(state, data) {
            state.user = JSON.stringify(state.user)
            localStorage.setItem('user', state.user)
        }
    },
    actions: {
        SETTOKEN({ commit }) {
            commit('setToken')
        },
        SETUSER({ commit }) {
            commit('setUser')
        }
    },
    getters: {
        userName: state => JSON.parse(state.user).name,
        userAvatar: state => JSON.parse(state.user).avatar,
        userEmail: state => JSON.parse(state.user).email
    }
})
