<template>
  <div>
    ini adalah halaman home
    <el-button type="success" size="default">testing aja</el-button>
    <v-icon color="danger"> mdi-users </v-icon>
    <TimePicker v-model="jam" label="Jam" :rules="rules.jam" />
  </div>
</template>

<script>
import TimePicker from "../plugins/TimePicker";
export default {
  components: { TimePicker },
  data() {
    return {
      data: {},
      jam: null,
      rules: {},
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
