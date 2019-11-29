import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DpartUsers from '../components/DpartUsers';

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    children: [{
        path: 'DpartUsers',
        component: DpartUsers
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router