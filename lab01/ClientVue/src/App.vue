<template>
  <p>
    {{ msg }}
  </p>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup(){
    const msg = ref();
    fetch('https://localhost:44383/WeatherForecast')
    .then((response) => response.json())
    .then((data) => {
      msg.value = data; // data là một object
    });
    return {msg};
  }
}
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
