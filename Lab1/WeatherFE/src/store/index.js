import { createStore } from 'vuex';
import TodoList from './Modules/TodoList';

const storeData = {
    modules: {
        TodoList
    },
};

const store = createStore(storeData);
export default store;