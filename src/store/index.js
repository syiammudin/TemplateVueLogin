

Vue.use(Vuex)
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let token = localStorage.getItem("token") || null;
export { token };

axios.defaults.baseURL = 'http://localhost:8000/api'

export default new Vuex.Store({
  state: {
    user: null,
    token
  },

  mutations: {
    setUserData(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData.data))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
      state.token = userData.token;
      localStorage.setItem("token", userData.token)
    },

    clearUserData() {
      localStorage.removeItem('user')
      location.reload()
    },
  },

  actions: {

    logout({ commit }) {
      commit('clearUserData')
    },
    async login({ commit }, credentials) {
      const { data } = await axios
        .post('/login', credentials)
      commit('setUserData', data)
    },

  },

  getters: {
    isLogged: state => !!state.user
  }
})