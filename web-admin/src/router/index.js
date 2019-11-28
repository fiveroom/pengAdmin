import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import tble from '../components/TData.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: 'tdata',
                component: tble
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router