import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Survey from '../views/Survey.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        meta: {
            requiresAuth: true
        },
        component: DefaultLayout,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/survey',
                name: 'Survey',
                component: Survey
            }
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        meta: {
            isGuest: true
        },
        name: 'Auth',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.state.user.token) {
        next({name: 'Login'})
    } else if (store.state.user.token && to.meta.isGuest) {
        next({name: 'Dashboard'})
    }else {
        next()
    }
})

export default router