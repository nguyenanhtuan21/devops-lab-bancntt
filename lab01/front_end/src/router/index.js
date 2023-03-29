
import {createRouter ,createWebHistory} from 'vue-router'
import Employees from '../components/Pages/TheEmployee/TheContent.vue'
import Sell from '../components/Pages/TheSell.vue'
import Purchase from '../components/Pages/ThePurchase.vue'

    const routes = [
    { path: '/',name: 'Trang Chủ', redirect: '/employees' },
    { path: '/sell', component: Sell },
    { path: '/employees',name: 'Tiền mặt', component: Employees },
    { path: '/purchase', component: Purchase },
  ]

  export function getRouter() {
      const router = createRouter({
      history: createWebHistory(),
      routes: routes
    })
    return router
  }

