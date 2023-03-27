<template>
    <div class="d-flex align-item-center justify-content-center">
        <div>
            <div class="w-500">
                <div class="input-task">
                    <input type="text" v-model="taskTodo" @keydown.enter="addData()">
                </div>
            </div>
            <div class="w-500">
                <ul class="list-task">
                    <li class="task-item" v-for="task in taskList" :key="task.ID">
                        <span class="text">{{ task.TodoName }}</span>

                        <span class="icon-done" v-if="task.Status">V</span>

                        <span class="delete" @click="deleteData(task.IDTodo)">Delete</span>

                        <span class="done" @click="updateData(task.IDTodo)">Done</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:27051"
export default {
    name: 'TodoApp',
    data() {
        return {
            taskTodo: "",
            taskList: [],
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                await axios.get(`${baseUrl}/api/Task`).then(res => {
                    console.log(res);
                    this.taskList = res.data.data;
                });
            } catch (error) {
                console.log(error);
            }
        },

        async addData() {
            try {
                var data = {
                    "IDTodo": "d680b839-9669-4589-ae32-eeab6675a64f",
                    "todoName": this.taskTodo,
                }
                await axios.post(`${baseUrl}/api/Task`, data).then(res => {
                    this.taskList = res.data.data;
                });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteData(id) {
            try {
                await axios.delete(`${baseUrl}/api/Task?id=${id}`).then(res => {
                    this.taskList = res.data.data;
                });
            } catch (error) {
                console.log(error);
            }
        },

        async updateData(id) {
            try {
                await axios.put(`${baseUrl}/api/Task/UpdateStatus?id=${id}`).then(res => {
                    this.taskList = res.data.data;
                });
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style lang="css" scoped>
.d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column
}

.input-task input {
    width: 100%;
}

.list-task {
    list-style-type: none;
}

.task-item {
    border: 1px solid #eee;
}

.icon-done {
    color: #06e306;
}

.text {
    width: 100px;
    display: inline-block;
}

.delete {
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #eee;
    color: #ff0001;
    cursor: pointer;
}

.done {
    padding-left: 10px;
    padding-right: 10px;
    color: #06e306;
    cursor: pointer;
}
</style>
