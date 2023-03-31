<script setup>
import axios from 'axios'

</script>

<template>
  <ul>
    <li v-for="item in items">
      {{ item.title }}
    </li>
  </ul>
</template>

<script>


export default {
  data() {
    return {
      items: []
    }
  },

  // `mounted` is a lifecycle hook which we will explain later
  mounted() {
    axios
      .get('https://localhost:32768/api/todo')
      .then(response => (this.items = response.data))
  }
}
</script>

<style scoped></style>
