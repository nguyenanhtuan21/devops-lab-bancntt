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
        async GetAllTodoList({ commit }) {
            var res = await fetch(`${window.apis.Host}/TodoList`)
                        .then((response) => response.json())
                        .then((data) => data)
                        .catch((error) => {
                            console.error("Error:", error);
                        });
            commit("SetTodoList", res);
        },
        async AddNewTodoItem({ commit }, newTodo) {
            await fetch(`${window.apis.Host}/TodoList`, {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Success:", data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });            
            commit("AddTodoItem", newTodo);
        },
        async DeleteTodoById({ commit }, id) {
            await fetch(`${window.apis.Host}/TodoList?ID=${id}`, {
                method: "Delete", // or 'PUT'
              })
                .catch((error) => {
                  console.error("Error:", error);
                });            
            commit("RemoveTodoItem", id);
        }
    },
    mutations: {
        SetTodoList(state, todoList) {
            state.todoList = [...todoList];
        },
        AddTodoItem(state, newItem) {
            state.todoList =  [ ...state.todoList, newItem ].reverse();
        },
        RemoveTodoItem(state, idItem) {
            state.todoList = state.todoList.filter((item) => item?.Id !== idItem);
        },
        UpdateTodoItem(state, idItem, updateItem) {
            let idx = state.todoList.findIndex((item) => item?.Id === idItem);
            state.todoList[idx].Name = updateItem?.Name;
        }
    },
};

export default TodoList;