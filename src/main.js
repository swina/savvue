import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import './registerServiceWorker'
import './plugins'
import './assets/css/tailwind.css'
//import {ServerTable, ClientTable, Event} from 'vue-tables-2';
//Vue.use(ClientTable);

//import { BootstrapVue } from 'bootstrap-vue'
//Vue.use(BootstrapVue)

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
import UiTable from '@/components/shared/table'
import UiCrud from '@/components/shared/crud'

Vue.component ( 'UiTable' , UiTable )
Vue.component ( 'UiCrud' , UiCrud )

import Icon from '@/components/shared/icon.vue'
Vue.component('icon', Icon)

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
Vue.component ( 'datepicker', DatePicker );

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
