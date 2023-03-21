import axios from "axios";

const TodoList = {
    state: {
        todoList: [],
    },
    getters: {
        todoList(state) {
            return state.todoList;
        },
    },
    actions: {
        CallAPI() {
            axios.get("https://localhost:8081/WeatherForecast")
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            });
        }
    },
    mutations: {
        AddTodoItem(state, newItem) {
            state.todoList =  [ ...state.todoList, newItem ].reverse();
        },
        RemoveTodoItem(state, idItem) {
            state.todoList = state.todoList.filter((item) => item?.id !== idItem);
        },
        UpdateTodoItem(state, idItem, updateItem) {
            let idx = state.todoList.findIndex((item) => item?.id === idItem);
            state.todoList[idx].name = updateItem?.name;
        }
    },
};

export default TodoList;