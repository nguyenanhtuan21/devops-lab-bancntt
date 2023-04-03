import { createRouter,createWebHistory } from "vue-router";
import route from "./router"

const routes= [...route];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;