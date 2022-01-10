<template>
    <div class="w-full">
    <div class="flex flex-row justify-between" style="width:1000px;max-width:1000px;" >
            
                <template v-for="(menu,index) in $store.getters.menu_header">
                    <div :key="'menu_' + index" class="w-1/4 mr-10 cursor-pointer">
                        <img v-if="$route.path==='/' || $route.params.content" :src="menu.active" @click="$router.push('/prodotti/' + menu.name)"/>

                        <img v-if="$route.path!='/' && !$route.params.content && $route.path.split('/')[2] != menu.name" :src="menu.off" @click="$router.push('/prodotti/' + menu.name)"/>
                        <img v-if="$route.path!='/' && !$route.params.content && $route.path.split('/')[2] === menu.name" :src="menu.active"/>                    
                    </div>
                </template>
                <div class="w-1/4">
                    <component :is="component" :component="component"/>
                </div>
                
    </div>
    </div>
</template>

<script>
import Scroller from './Scroller.vue' 

export default {
    name: 'Header',
    components: {
        Scroller
    },
    data:()=>({
        currentPath:null,
        component: null
    }),
    methods:{
        getImage(menu){
            if ( menu.name === this.$route.path.split('/')[2] ){
                return menu.active
            }
            return menu.off
        }
    },
    mounted(){
        this.currentPath = this.$route.path.split('/')[2]
        this.component = Scroller
    }
}
</script>