<template>
  <v-app dark>
    <v-main>
      <v-container class="center">
        <v-row class="mt-10">
          <v-spacer></v-spacer>
          <v-card class="login text-center" elevation="5" border="1">
            <v-card-text>
              <div class="text-h5 font-weight-bold text-center mt-10">
                Welcome Back to our Aplication
              </div>
              <div class="text-center grey--text">
                Sign in to your account below
              </div>
              <v-form
                lazy-validation
                ref="form"
                style="margin-bottom: 50px; margin-top: 50px; width: 300px"
                class="mx-auto"
              >
                <v-text-field
                  class="mb-6"
                  v-model="form.email"
                  :rules="rules.email"
                  label="Email"
                  placeholder="your@email.com"
                  outlined
                  dense
                  color="grey"
                >
                </v-text-field>

                <v-text-field
                  class="mb-6"
                  v-model="form.password"
                  :rules="rules.password"
                  label="Password"
                  placeholder="Your Password"
                  @keydown.enter="login"
                  outlined
                  dense
                  color="grey"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>

                <v-btn
                  block
                  large
                  color="success"
                  elevation="0"
                  :loading="loading"
                  @click="login"
                  class="mt-10 font-weight-bold"
                  >Sign In</v-btn
                >
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn text color=""> </v-btn>
            </v-card-actions>
          </v-card>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},
      rules: [],
      showPassword: false,
      loading: false,
    };
  },
  created() {
    console.log(this.isLogged);
  },
  computed: {
    ...mapGetters(["isLogged"]),
  },
  methods: {
    login() {
      this.loading = true;
      this.$axios
        .post("/login", this.form)
        .then((r) => {
          this.$store.dispatch("userLogged", r.data);
          this.$axios.defaults.headers[
            "Authorization"
          ] = `Bearer ${r.data.token}`;
          this.$router.push("/");
        })
        .catch((e) => {
          if (e.response) {
            if (e.response.status == 422) {
              this.rules = e.response.data.errors;
              this.$refs.form.validate();
            }

            this.$dialog.message.error(e.response.data.message, {
              position: "bottom-center",
            });
          } else {
            this.$dialog.message.error(JSON.stringify(e), {
              position: "bottom-center",
            });
          }
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>