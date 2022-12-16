import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Status from '../views/Status.vue'
import Clienti from '../views/Clienti.vue'
import Agenda from '../views/Agenda.vue'
import Agenti from '../views/Agenti.vue'
import Processi from '../views/Processi.vue'
import Utenti from '../views/admin/Utenti.vue'
import GoogleLogin from '../views/admin/Google.vue'
import ImportExcel from '../components/Import.vue'
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
  {
    path: '/processi',
    name: 'processi',
    component: Processi,
    meta: {
      title: 'Processi'
    }
  },
  {
    path: '/utenti',
    name: 'utenti',
    component: Utenti,
    meta: {
      title: 'Utenti'
    },
  },
  {
    path: '/import',
    name: 'import',
    component: ImportExcel,
    meta: {
      title: 'Importa XLS'
    },
  },
  {
    path: '/oauth/google/callback',
    name: 'google',
    component: GoogleLogin,
    meta: {
      title: 'Accesso'
    },
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
