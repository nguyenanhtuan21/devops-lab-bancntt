<template>
  <div class="main-app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HeaderComp />
    <ContentComp />
  </div>
</template>

<script>
import HeaderComp from "./layout/HeaderComp.vue";
import ContentComp from "./layout/ContentComp.vue";

export default {
  name: "App",
  components: {
    HeaderComp,
    ContentComp,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
