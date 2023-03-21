<template>
<div>
    LTLONG1 call API
  <li v-for="data in jsonData">{{ data.summary }}</li>
</div>
</template>
<script lang="ts">
import axios from "axios";

export default ({
  setup() {},
  data() {
    return {
      jsonData: [],
    };
  },
  created(){
    this.callApi();
  },
  methods: {
    callApi() {
      axios
        .get(`https://localhost:44300/WeatherForecast`)
        .then((response) => {
          this.jsonData = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
});
</script>

