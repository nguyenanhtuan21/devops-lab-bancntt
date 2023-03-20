<template>
  <h1>TODO LIST</h1>
  <input
    type="text"
    v-model="todoSearch"
    placeholder="Nhập việc cần làm"
    @keyup.enter="addTodo"
  />
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input
        type="checkbox"
        :checked="todo.finished"
        @change="onFinished($event, todo)"
      />
      {{ todo.content }}
    </li>
  </ul>
  <p>
    Số công việc đã hoàn thành: <b>{{ numberOfCompletedTodos }}</b>
  </p>
</template>

<script>
import { onMounted, computed, ref, watch } from "vue";
import axios from "axios";

export default {
  setup() {
    const todoSearch = ref("");
    const todos = ref([]);
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8001",
    });

    axiosInstance.defaults.headers.common = {
      ...axiosInstance.defaults.headers.common,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const numberOfCompletedTodos = computed(
      () => todos.value.filter((todo) => todo.completed).length
    );

    const getData = async () => {
      try {
        let res = await axiosInstance.get("/api/tasks");
        todos.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };

    function addTodo() {
      let newTask = {
        content: todoSearch.value.trim(),
      };

      axiosInstance
        .post("/api/tasks", newTask)
        .then((res) => {
          todos.value.push(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    const onFinished = (e, ele) => {
      console.log(e.target.value, ele.finished);
      let value = !ele.finished;
      let fakeTodo = { ...ele, finished: !ele.finished };
      axiosInstance
        .put("/api/tasks", fakeTodo)
        .then((res) => {
          ele.finished = value;
        })
        .catch((e) => {
          console.log(e);
        });
      //   try {
      //
      //   } catch (error) {
      //     console.log(error);
      //   }
    };

    onMounted(() => {
      getData();
    });

    watch(
      todos,
      (newValue) => {
        console.log(`Length: ${newValue.length}`);
      },
      { deep: true }
    );

    return {
      todoSearch,
      todos,
      addTodo,
      onFinished,
      numberOfCompletedTodos,
    };
  },
};
</script>
