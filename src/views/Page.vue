<template>
    <div class="w-full mt-10 pb-20">
        <div class="flex flex-row flex-wrap items-center bg-grigio h-16 px-4">
            <template v-for="(menu,index) in $store.getters.menu_footer[0].items">
                <div :key="'menu_' + index" :class="'cursor-pointer p-4 text-xs uppercase font-bold ' + style(menu.path)">
                    <router-link :to="menu.path">{{menu.title}}</router-link><!--<a :href="menu.path">{{menu.title}}</a>-->
                </div>
            </template>
        </div>
        <component :is="component" :component="component" :content="content"/>
        <div class="flex flex-row text-left text-sm mx-20 mt-8" v-if="!component && content">
            <div :class="hasimage">
                <div v-html="content[0].content"></div>
            </div>
            <div v-if="content[0].img" class="w-1/2">
                <img :src="'/img/' + content[0].img"/>
            </div>
        </div>
        
    </div>
</template>

<script>
import Rappresentanze from './Rappresentanze.vue'
import timeline from './Timeline'

export default {
    name: 'Page',
    components: {
        Rappresentanze , timeline
    },
    data:()=>({
        component: null,
        pagine: null,
        content: [
            {
                content: '',
                img:''
            }
        ]
    }),
    computed: {
        hasimage(){
            return this.content[0].img ? 'w-1/2' : ''
        }
    },
    watch:{
        '$route.fullPath'(){
            this.page()
        }
    },
    methods:{
         style(path){
            return path === this.$route.fullPath ? 'bg-white text-red-600 ' : ''
        },
        page(){
            this.component = null
            this.content = [ { content: '' , img: '' , layout: 'page'}]
            if ( this.$route.params.content === 'rappresentanze' ){
                this.component = Rappresentanze
            } else {
            this.$api.service('pagine').find ( { query : { slug: this.$route.fullPath }}).then(response=>{
                if ( response.data ) {
                    this.content = response.data
                    if ( this.content[0].layout != 'page' ){
                        this.component = this.content[0].layout
                    }
                }
            })
            }
        }
    },
    mounted(){
      this.page()
    }
}
</script>