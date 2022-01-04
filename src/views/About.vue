<template>
  <div class="about">
    <h1>This is an about page</h1>
    asdsa
    <div v-for="(item, i) in message" :key="i">
      {{ item.message }}
    </div>
  </div>
</template>
<script>
import Pusher from "pusher-js";
export default {
  data() {
    return {
      message: [{ message: "message ke 1" }],
      pusher: null,
      channel: null,
    };
  },
  created() {
    this.getNotif();
  },
  methods: {
    getNotif() {
      var pusher = new Pusher("b9f872233a31ee47d7d2", {
        cluster: "ap1",
      });

      var channel = pusher.subscribe("my-channel");
      var callback = (data) => {
        alert(data.message);
        this.message.push({ message: data.message });
      };

      channel.bind("my-event", callback);
    },
  },
};
</script>
