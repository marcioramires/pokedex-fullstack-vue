<script>
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {},
};
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap");

* {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #dbd9df;
  background-image: "./assets/background.jpg";

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
