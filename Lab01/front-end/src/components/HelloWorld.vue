<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div style="margin-top: 10px;" v-for="weather in weatherList" :key="weather.date">
      <div class="flex-row">
        <div>Date: </div>
        <div>{{ weather.date }}</div>
      </div>
      <div class="flex-row">
        <div>Temperature: </div>
        <div>{{ weather.temperatureC }} &#8451;</div>
      </div>
      <div class="flex-row">
        <div>Summary: </div>
        <div>{{ weather.summary }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    weatherList: Array
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
