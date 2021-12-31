import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store, { token } from "./store";
import axios from "axios";
import vuetify from '@/plugins/vuetify'


const $axios = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

Vue.use({
  install(Vue) {
    Vue.prototype.$axios = $axios;
  },
});


Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  created() {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      this.$store.commit('setUserData', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
