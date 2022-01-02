import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store, { token, url } from "./store";
import axios from "axios";
import vuetify from '@/plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

const $axios = axios.create({
  baseURL: `${url}`,
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

router.beforeEach((to, from, next) => {
  if (to.path != "/login" && from.path != "/login") {
    $axios
      .get("/me")
      .then((res) => {
        store.state.user = res.data;
        next();
      })
      .catch(() => next("/login"));
  } else next();
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
