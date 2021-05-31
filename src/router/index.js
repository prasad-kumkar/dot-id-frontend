import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vc',
    name: 'VC',
    component: () => import('../views/Features/VC.vue')
  },
  {
    path: '/attributes',
    name: 'Attributes',
    component: () => import('../views/Features/Attributes.vue')
  },
  {
    path: '/delegates',
    name: 'Delegates',
    component: () => import('../views/Features/Delegates.vue')
  },
  {
    path: '/identity',
    name: 'Identity',
    component: () => import('../views/Features/Identity.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
