import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import Tickets from '../views/Tickets.vue'
import RequestTasks from '../views/RequestTasks.vue'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta:{
            requireLogin:true,
        }
       
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
       
    },
    {
        path: '/users',
        name: 'users',
        component: Users,
       
    },
    {
        path: '/tickets',
        name: 'tickets',
        component: Tickets,
       
    },
    {
        path: '/request-tasks',
        name: 'request-tasks',
        component: RequestTasks,
        meta:{
            requireLogin:true,
        }
    },
    
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && (!store.state.isAuthenticated || store.state.token == '')) {
        next({ name: 'login', query: { to: to.path } });
    } else {
        next()
    }
})


export default router