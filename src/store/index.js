

Vue.use(Vuex)
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let token = localStorage.getItem("token") || null;
let url = 'http://localhost:8000/api/'

export { token, url };

axios.defaults.baseURL = url

export default new Vuex.Store({
  state: {
    user: null,
    token
  },

  mutations: {
    setUserData(state, userData) {
      state.user = userData
      window.localStorage.setItem('user', JSON.stringify(userData.data))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
      state.token = userData.token;
      window.localStorage.setItem("token", userData.token)
    },

    clearUserData(state) {

      state.user = {};
      state.token = null;
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      location.reload()
    },
  },

  actions: {

    logout({ commit }) {
      commit('clearUserData');
    },

    async login({ commit }, credentials) {
      const { data } = await axios
        .post('login', credentials)
      commit('setUserData', data)
    },

  },

  getters: {
    isLogged: state => !!state.user
  }
})