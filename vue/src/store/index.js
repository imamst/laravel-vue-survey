import { createStore } from 'vuex'
import apiClient from '../axios'

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN")
        }
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return apiClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data)
                    return data
                })
        },
        login({ commit }, user) {
            return apiClient.post('/login', user)
                .then(({ data }) => {
                    commit('setUser', data)
                    return data
                })
        }
    },
    mutations: {
        logout: state => {
            state.user.data = {},
            state.user.token = null
        },
        setUser: (state, userData) => {
            state.user.data = userData.user
            state.user.token = userData.token
            sessionStorage.setItem("TOKEN", userData.token)
        }
    },
    modules: {}
});

export default store;