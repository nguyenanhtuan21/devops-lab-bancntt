const routes = [
    {
        path: "/app1",
        name: "main-app",
        component: () => import("../components/MainApp.vue"),
    },
    {
        path: "/",
        name: "hello-world",
        component: () => import("../components/HelloWorld.vue"),
    }
];

export default routes;