<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="DevOps Lab" :weatherList="weatherList"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      weatherList: []
    }
  },
  async beforeMount() {
    let data = await fetch('http://server/WeatherForecast')
    this.weatherList = await data.json()
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
