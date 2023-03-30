<template>
  <div class="todo-list">
    <ul class="todo-list-container">
      <li :key="i" class="item" v-for="i in dataTodo">
        <div class="name-item">
          {{ i.Name }}
        </div>
        <span @click="handleDeleteItem(i.Id)" class="delete-item">X</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  name: "TodoList",
  props: {
    dataTodo: [],
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const handleDeleteItem = (id) => {
      proxy.$emit("deleteItem", id);
    };
    return {
      handleDeleteItem,
    };
  },
};
</script>

<style scoped>
.todo-list-container {
  margin: 0;
  padding-left: 0;
  list-style-type: none;
}

.todo-list-container > .item {
  font-size: 20px;
  display: flex;
  justify-content: center;
}

.todo-list-container > .item > .name-item {
  flex: 1;
}

.delete-item {
  cursor: pointer;
  color: crimson;
  width: 32px;
}

.item + .item {
  margin-top: 12px;
}
</style>