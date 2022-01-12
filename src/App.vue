<template>
  <div id="app" class="w-full fixed h-screen flex flex-col bg-gray-800">
    <div class="w-full flex flex-row" v-if="$store.state.navigation.logged">
      
      <sidebar/>
    
      <div class="w-full bg-gray-100 overflow-y-scroll">
        <div v-if="$route.meta.title" class="bg-gray-800 w-full h-8 text-gray-400 flex items-center text-xs justify-center">{{$route.meta.title}}</div>
        <router-view/>
      </div>

    </div> 
    <div v-else>
      <Login/>
    </div>

    <div class="fixed inset-0 z-10 bg-gray-700 bg-opacity-50 flex justify-center items-center h-screen" v-if="navigation.loading">
        <div class="p-8 bg-white rounded-lg bg-opacity-75 flex flex-col items-center shadow">
            Loading ...
            <icon class="animate-spin text-3xl text-gray-500" icon="cached"/>
        </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/SideBarLeft.vue'
import Login from '@/views/admin/Login.vue'
import { mapState } from 'vuex'
export default {
  name : 'App',
  components : {
    Sidebar,
    Login
  },
  data:()=>({
    products: null
  }),
  computed: {
    ...mapState ( ['navigation'] )
  },
  methods:{
    active(path){
      return this.$route.fullPath === path ? 'font-bold text-red-700' : ''
    }
  },
  beforeMount(){
    this.$api.authenticate()
      .then ( response => {
        this.$store.dispatch('SetUser',response.user)
        this.$store.dispatch('SetLogged',true)
        this.$api.service('agenti').find().then ( result => {
          this.$store.dispatch ( 'setAgenti' , result )
        })
        this.$api.service('processi').find().then ( response => {
          console.log ( 'Processi => ' , response )
          this.$store.dispatch ( 'setProcessi', response )
        })
         this.$api.service('gruppi').find().then ( response => {
          console.log ( 'Gruppi => ' , response )
          this.$store.dispatch ( 'setGruppi', response )
          
        })
      })
    
  }
}
</script>

<style>
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  font-size:1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
