import { createRouter, createWebHistory } from 'vue-router';
import HomeContent from "@/views/HomeContent.vue";
import AboutContent from "@/views/AboutContent.vue";

const routes = [
    {
        path: '/',
        component: HomeContent,
    },
    {
        path: '/about',
        component: AboutContent,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;