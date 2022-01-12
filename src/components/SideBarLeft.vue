<template>
    <div :class="'h-screen h-100 top-0 left-0 my-1 bg-gray-800 text-gray-500 text-xs ' + sidebar_closed">
        <div class="flex items-center">
            <i class="material-icons cursor-pointer" title="Espandi" @click="menu_closed=!menu_closed">menu</i>
            <span class="text-base font-bold text-blue-300 ml-4">{{title}}</span>
        </div>
        <template v-for="(item,index) in menu">
            <router-link :to="item.path" class="w-full p-2 my-1 flex items-center hover:text-white text-left hover:bg-gray-700 cursor-pointer" :class="$route.meta.title===item.title?'text-blue-300':''" :key="'menu_'+index" :title="item.title">
                <i class="material-icons mr-1 text-xl">{{item.icon}}</i>
                <span v-if="!menu_closed" class="text-base ml-2">{{item.title}}</span>
            </router-link>
        </template>
        <i class="material-icons fixed bottom-0 left-0 cursor-pointer text-md" title="Espandi" @click="menu_closed=!menu_closed">{{navigate_arrow}}</i>
    </div>
</template>

<script>
export default {
    name: 'SideBarLeft',
    data:()=>({
        current: null,
        menu_closed: true,
        menu: [
            {
                title: 'Dashboard',
                icon: 'dashboard',
                path: '/'
            },
            {
                title: 'Status',
                icon: 'pending_actions',
                path: 'status'
            },
            {
                title: 'Clienti',
                icon: 'contacts',
                path: 'clienti'
            },
            {
                title: 'Agenda',
                icon: 'event',
                path: 'agenda'
            },
            {
                title: 'Agenti',
                icon: 'people',
                path: 'agenti'
            }
        ]
    }),
    computed: {
        title(){
            return this.menu_closed ? '' : 'SAVEnergy CRM'
        },
        sidebar_closed(){
            return this.menu_closed ? 'w-full md:w-10' : 'w-full md:w-1/5'
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
        openRoute ( path , index ){
            this.current = index
            console.log ( this.current  , index )
            this.$router.push(path)
        }
    }
}
</script>