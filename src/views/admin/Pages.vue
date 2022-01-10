<template>
    <div>
        <div class="w-full bg-black text-white text-xl">Pagine</div>
        <h3>Pagina demo in costruzione</h3>
        <div class="flex flex-row">
            <div v-if="data" class="w-1/4 pr-2 text-left cursor-pointer">
            <template v-for="(page,index) in data">
                <div :key="'page_' +  index" class="w-full flex flex-row flex-wrap">
                    <div class="w-full p-2 mb-2" @click="edit(page)">{{data[index].title}}</div>
                    <!--<div><input type="text" v-model="page[index].title"/></div>
                    <div>/azienda/<input type="text" v-model="page[index].slug"/></div>-->
                </div>
            </template>
            </div>
            <div class="w-3/4 flex flex-col p-4 text-left bg-gray-300" v-if="page">
                <label>Titolo</label>
                <input type="text" v-model="page.title"/>
                <label>Slug</label>
                <input type="text" v-model="page.slug" readonly>
                <label>Contenuto</label>
                <textarea v-if="page.content" class="h-64 p-0" v-model="page.content"></textarea>
                <div v-if="page.json">
                    <template v-for="(line,index) in content">
                        <template v-for="(field,index) in keys">
                            <label>{{field}}</label>
                            <input class="w-full" type="text" v-model="content[index][field]" v-if="field!='content'"/>
                            <textarea v-if="field==='content'" class="w-full h-32" v-model="content[index][field]"/>
                        </template>
                    </template>

                </div>
            </div>
        </div>
        <div v-if="loading" class="z-10 fixed top-0 right-0 bg-red-600 text-white p-2">Loading...</div>
    </div>

</template>
<script>
export default {
    name : 'Pages',
    data:()=>({
        data: [],
        page: null,
        keys: null,
        content: null,
        loading: false
    }),
    methods:{
        edit(page){
            this.page = page
            if ( page.json ){
                this.getJSON()
            }
        },
        getJSON(){
            this.content = JSON.parse ( this.page.json )
            this.keys =  Object.keys(this.content[0])
            //this.keys = Object.Keys(JSON.parse(this.page.json)[0])
            //this.content = JSON.parse(this.page.json)
        },
        init(){
            this.loading = true
            let vm = this
            vm.$pages().then(resp=>{
                vm.data = resp
                this.loading = false
            })
        }
    },
    mounted(){
        this.init()
    }
}
</script>