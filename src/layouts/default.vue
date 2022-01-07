<template>
  <div>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-menu bottom left min-width="300" rounded>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-avatar color="grey" class="white--text mr-2" size="30">
              <span class="text-h8">A</span>
            </v-avatar>
            <v-icon>mdi-chevron-down</v-icon>
          </div>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="grey" class="white--text mr-2" size="120">
                <span class="text-h8">Admin</span>
              </v-avatar>
              <v-divider class="my-2"></v-divider>
              <h3 class="mt-3">name</h3>
              <p class="mt-2">email</p>
              <v-divider class="my-2"></v-divider>

              <v-row class="ma-2">
                <v-btn plain> Profile </v-btn>
                <v-spacer></v-spacer>
                <v-btn plain @click="logout"> Logout </v-btn>
              </v-row>
              <v-divider class="my-2"></v-divider>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- <main> </main> -->
    <v-main class="ma-5">
      <router-view />
    </v-main>

    <!-- <footer></footer> -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      width="300"
      app
    >
      <v-list dense>
        <v-list-item class="mb-2" v-if="miniVariant == false">
          <v-col justify="center" align="center">
            <div>
              <v-avatar color="primary" size="70">
                <v-img
                  src="https://cdn.logo.com/hotlink-ok/logo-social.png"
                ></v-img>
              </v-avatar>
            </div>
            <div class="mt-2">
              <h2>Truck Aplikasi</h2>
            </div>
          </v-col>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Scan Qr Code",
          to: "/about",
        },
      ],
      miniVariant: false,
    };
  },
  methods: {
    logout() {
      this.$axios
        .post("/api/logout")
        .then(() => {
          this.$axios.defaults.headers["Authorization"] = null;
          this.$store.dispatch("logout");
        })
        .catch((e) => {
          // nothing todo
          console.log(e);
        })
        .finally(() => this.$router.push("/login"));
    },
  },
};
</script>
