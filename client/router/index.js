import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Room from '@/components/room'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/room', component: Room }
    ]
})
