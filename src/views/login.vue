<template>
  <v-app>
    <v-container class="">
      <v-row>
        <v-col>
          <form @submit.prevent="login">
            <v-text-field
              type="email"
              placeholder="Email"
              label="Email"
              v-model="email"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              type="password"
              placeholder="Password"
              label="Password"
              v-model="password"
              outlined
              dense
            ></v-text-field>
            <v-btn small elevation="0" @click="login" color="primary">
              Login
            </v-btn>
          </form>
        </v-col>
      </v-row>
    </v-container>
    <h1>Login</h1>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "About" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>