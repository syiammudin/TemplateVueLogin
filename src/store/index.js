

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
    USER_LOGGED(state, data) {
      state.user = data.user;
      window.localStorage.setItem("user", JSON.stringify(data.user));

      state.token = data.token;
      window.localStorage.setItem("token", data.token);

    },

    LOGOUT(state) {
      state.user = {};
      state.token = null;
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
    },
  },

  actions: {

    userLogged({ commit }, data) {
      commit("USER_LOGGED", data);
    },

    logout({ commit }) {
      commit("LOGOUT");
    },
  },

  getters: {
    isLogged: state => !!state.user
  }
})