
import { createRouter, createWebHistory } from "vue-router";
import HomePage  from "../components/HomePage.vue";
import TaskDetail from '../components/TaskDetail.vue'

const routes = [
    {path: "/", name: "home", component: HomePage},
    {path: "/detail", name: "detail", component: TaskDetail}

];

const router = createRouter({
    history: createWebHistory(),
    routes : routes,

});

export default router;
