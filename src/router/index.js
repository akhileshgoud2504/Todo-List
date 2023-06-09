import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeScreen from '../view/HomeScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeScreen
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
