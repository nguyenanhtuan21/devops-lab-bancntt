<template>
  <div class="home">
    <p>Home</p>
    <div class="home-input">
      <input
        :class="{ error: errorInput }"
        ref="todoInputCurr"
        placeholder="Thêm công việc mới..."
        @input="handleInput"
      />
      <button @click="handleAddTodo">Thêm</button>
    </div>
    <TodoList :dataTodo="dataTodoList" @deleteItem="handleDeleteItem" />
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "HomeContent",
  components: {
    TodoList,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const dataTodoList = ref([]);
    const errorInput = ref(false);

    const handleAddTodo = async () => {
      let inputVal = proxy.$refs.todoInputCurr.value;
      if (!inputVal) {
        errorInput.value = true;
        return;
      } else {
        errorInput.value = false;
      }
      await proxy.$store.dispatch("AddNewTodoItem", {
        Id: uuidv4(),
        Name: inputVal,
      });
      dataTodoList.value = proxy.$store.getters.todoList;
      proxy.$refs.todoInputCurr.value = "";
    };

    const handleInput = (e) => {
      let inputVal = e.target.value;
      if (inputVal) {
        errorInput.value = false;
      }
    };

    const handleDeleteItem = async (e) => {
      await proxy.$store.dispatch("DeleteTodoById", e);
      dataTodoList.value = proxy.$store.getters.todoList;
    };

    onMounted(async () => {
      await proxy.$store.dispatch("GetAllTodoList");
      proxy.dataTodoList = proxy.$store.getters.todoList;
    });

    return {
      dataTodoList,
      errorInput,
      handleAddTodo,
      handleInput,
      handleDeleteItem,
    };
  },
  mounted() {
    this.dataTodoList = this.$store.getters.todoList;
  },
};
</script>

<style scoped>
p {
  font-size: 24px;
  text-transform: uppercase;
}

.home-input {
  width: 100%;
  display: flex;
  margin-top: 32px;
  margin-bottom: 32px;
}

.home-input > input {
  flex: 1;
  padding-left: 10px;
}

.home-input > input.error {
  border-color: red;
}

.home-input > button {
  border: none;
  height: 40px;
  width: 120px;
  font-size: 18px;
  color: #fff;
  background: green;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
}

:deep(.todo-list) {
  max-height: 200px;
  overflow: auto;
}
</style>