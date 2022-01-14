<template>
    <div :class="'h-screen h-100 top-0 left-0 my-1 bg-gray-800 text-gray-400 text-xs ' + sidebar_closed">
        <div class="flex items-center justify-start cursor-pointer">
            <i v-if="menu_closed" class="material-icons ml-1 cursor-pointer" title="Espandi" @click="menu_closed=!menu_closed">menu</i>
            <img v-if="!menu_closed" src="img/logo.png" @click="menu_closed=!menu_closed"/>
            <!-- <span class="text-base font-bold text-blue-300 ml-4">{{title}}</span> -->
        </div>
        <template v-for="(item,index) in menu">
            <router-link v-if="authorize(item.livello)" :to="item.path" class="w-full p-2 my-1 flex items-center hover:text-white text-left hover:bg-gray-700 cursor-pointer" :class="$route.meta.title===item.title?'text-lime-300':''" :key="'menu_'+index" :title="item.title">
                <i class="material-icons mr-1 text-xl">{{item.icon}}</i>
                <span v-if="!menu_closed" class="text-base ml-2">{{item.title}}</span>
            </router-link>
        </template>
        <div class="fixed bottom-0 w-full text-center mb-2  text-gray-300">Savenergy CRM 2.0</div>
        <i class="material-icons fixed bottom-0 left-0 cursor-pointer text-md" title="Espandi" @click="menu_closed=!menu_closed">{{navigate_arrow}}</i>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'SideBarLeft',
    data:()=>({
        current: null,
        menu_closed: false,
        menu: [
            {
                title: 'Dashboard',
                icon: 'dashboard',
                path: '/',
                livello:-1
            },
            {
                title: 'Status',
                icon: 'pending_actions',
                path: 'status',
                livello:-1,
            },
            {
                title: 'Clienti',
                icon: 'contacts',
                path: 'clienti',
                livello:-1,
            },
            {
                title: 'Agenda',
                icon: 'event',
                path: 'agenda',
                livello:-1,
            },
            {
                title: 'Agenti',
                icon: 'people',
                path: 'agenti',
                livello:0,
            },
            {
                title: 'Processi',
                icon: 'work',
                path: 'processi',
                livello:0,
            },
            {
                title: 'Utenti',
                icon: 'lock',
                path: 'utenti',
                livello:0,
            },
        ]
    }),
    computed: {
        ...mapState ( ['navigation' ] ),
        title(){
            return this.menu_closed ? '' : 'SAVEnergy CRM'
        },
        sidebar_closed(){
            return this.menu_closed ? 'w-10' : 'w-full md:w-1/4 md:w-1/5 lg:w-1/6'
        },
        navigate_arrow(){
            return this.menu_closed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'
        },
        show_item(index){
            if ( this.menu_closed ){
                this.$refs['item_'+index]
            }
        }
    },
    methods:{
        authorize(level){
            if ( level < 0 ) return true
            return level === this.navigation.user.int_livello ? true : false
        },
        openRoute ( path , index ){
            this.current = index
            this.$router.push(path)
        }
    }
}
</script>