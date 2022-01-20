<template>
  <div id="app" class="w-full fixed h-screen flex flex-col bg-gray-800">
    <div class="w-full flex flex-row" v-if="$store.state.navigation.logged">
      
      <sidebar v-if="$store.state.navigation.user"/>
    
      <div class="w-full bg-gray-100">
        <div v-if="$route.meta.title" class="bg-gray-800 w-full h-8 text-lime-300 flex items-center text-base justify-center">{{$route.meta.title}}</div>
        <div class="absolute right-0 top-0 m-1 mr-4 text-sm text-gray-300 flex items-center">
          <icon icon="person" class="text-base rounded-full bg-lime-500 w-6 h-6" @click="user=!user"/>
        </div>
        <transition name="fade">
          <div v-if="user" class="z-10 absolute right-0 mr-2 flex flex-col justify-start bg-gray-700 text-gray-100 text-sm shadow-lg cursor-pointer rounded-b-lg pb-4">
            <div class="flex flex-col justify-center border-b mb-2 p-4 capitalize">
                {{ $store.state.navigation.user.ac_nome }} {{ $store.state.navigation.user.ac_cognome }}
                <br/>
                <span class="text-gray-400">{{ $store.state.navigation.user.ac_gruppo }}</span>
            </div>
            <div class="p-2 flex flex-row items-center hover:bg-gray-600"><icon icon="settings" class="mr-2" size="sm"/>Impostazioni</div>
            <div class="p-2 flex flex-row items-center hover:bg-gray-600"><icon icon="person" class="mr-2" size="sm"/>Profilo</div>
            <div class="p-2 flex flex-row items-center hover:bg-gray-600" @click="logout()"><icon icon="logout" class="mr-2" size="sm"/>Esci</div>
          </div>
        </transition>
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
    products: null,
    user: false
  }),
  computed: {
    ...mapState ( ['navigation'] )
  },
  methods:{
    active(path){
      return this.$route.fullPath === path ? 'font-bold text-red-700' : ''
    },
    logout(){ 
      window.localStorage.removeItem('feathers-jwt')
      this.$store.dispatch('SetUser',null)
      this.$router.push('/')
      window.location.reload()
    }
  },
  beforeMount(){
    this.$api.authenticate()
      .then ( response => {
        this.$store.dispatch('SetUser',response.user)
        this.$store.dispatch('SetLogged',true)
        return response.user
      }).then ( user => {
        this.$api.service ( 'agenti' ).find ( { query: { account : user.account } } ).then ( user => {
            console.log ( user )
            this.$store.dispatch('SetUser',user[0][0])
        })
      }).then ( () => {
        this.$api.service('agenti').find({query:{$limit:200}}).then ( result => {
          this.$store.dispatch ( 'setAgenti' , result )
        })
      }).then ( () => {
        this.$api.service('processi').find({ query : { $sort: { int_ordine: 1} }}).then ( response => {
          response.data.map ( res => {
            res.ac_colore = '#' + res.ac_colore
          })
          console.log ( 'Processi => ' , response )
          this.$store.dispatch ( 'setProcessi', response )
        })
      }).then ( () => {
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
