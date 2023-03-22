<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <br>
    <table class='table table-bordered table-strripped table-hover'>
          <thead>
              <tr>
                  <th>Date</th>
                  <th>Temperature</th>
                  <th>Summary</th>
              </tr>
          </thead>

          <tbody v-for="weather in weatherForecast" :key="weather.date">
              <tr>
                  <td>
                      {{ weather.date }}
                  </td>
                  <td>
                      {{ weather.temperatureC }}
                  </td>
                  <td>
                    {{ weather.summary }}
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      weatherForecast: []
    }
  },
  beforeCreate() {
    fetch("http://localhost:5000/WeatherForecast")
    .then(res => res.json())
    .then((data) => {
      this.weatherForecast = data
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
