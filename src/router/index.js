import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Home,
      title: {
        template: `<span>Home</span>`,
      },
    },
  },
  {
    path: "/about",
    name: "about",
    components: {
      default: About,
      title: {
        template: `<span>Home</span>`,
      },
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "login",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
