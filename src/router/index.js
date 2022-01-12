import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Status from '../views/Status.vue'
import Clienti from '../views/Clienti.vue'
import Agenda from '../views/Agenda.vue'
import Agenti from '../views/Agenti.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/status',
    name: 'status',
    component: Status,
    meta: {
      title: 'Status'
    }
  },
  {
    path: '/clienti',
    name: 'clienti',
    component: Clienti,
    meta: {
      title: 'Clienti'
    }
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: Agenda,
    meta: {
      title: 'Agenda'
    }
  },
  {
    path: '/agenti',
    name: 'agenti',
    component: Agenti,
    meta: {
      title: 'Agenti'
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
