<template>
  <div id="app">
    <h1> TO DO LIST </h1>
    <ToDoList :newTodo="newTodo" />
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue'

export default {
  components: {
    ToDoList
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
