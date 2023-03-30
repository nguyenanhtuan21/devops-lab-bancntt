<template>
  <div class="task-wrapper">
    <div class="tool-bar">
        <button @click="backHomePage" class="button back">Back</button>

        <button class="button delete">Delete</button>
    </div>

    <div class="task-detail">
      <h1 class="task-name">Task : {{ task.name }}</h1>

      <p class="task-desc">Description : {{ task.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name : "TaskDetail",
  data() {
    return {
      task: {
        id : "",
        name: "",
        description: "",
      },
    };
  },

  methods: {
    backHomePage : function(){
        this.$router.push('/');
    }
  }
};
</script>

<style>
  @import url("@/assets/task-detail.css");
</style>
