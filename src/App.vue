<template>
  <v-app>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultLayout from "./layouts/default.vue";
import LoginLayout from "./layouts/login.vue";

export default {
  components: { DefaultLayout, LoginLayout },
  computed: {
    ...mapGetters(["isLogged"]),
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
  },
};
</script>
