<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
    :nudge-right="40"
    :nudge-bottom="10"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="content"
        :rules="rules"
        :label="label"
        prepend-inner-icon="mdi-timer"
        readonly
        v-bind="attrs"
        v-on="on"
        dense
        outlined
        color="success"
      ></v-text-field>
    </template>
    <v-card align="center">
      <v-time-picker
        v-model="content"
        format="24hr"
        color="success"
      ></v-time-picker>
      <br />
      <v-btn
        class="ma-5"
        small
        elevation="0"
        color="primary"
        @click="handleInput"
        >Set</v-btn
      >
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: ["value", "label", "rules", "multiple"],

  watch: {
    value(v) {
      this.content = v;
    },
  },

  data() {
    return {
      show: false,
      content: this.value,
    };
  },

  methods: {
    handleInput() {
      this.$emit("input", this.content);
      this.show = false;
    },
  },
};
</script>
