<template>
  <div>
    ini adalah halaman home

    <v-icon color="danger"> mdi-users </v-icon>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("user")
        .then((r) => {
          this.data = r;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
