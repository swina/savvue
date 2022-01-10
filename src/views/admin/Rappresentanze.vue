<template>
    <div>
        <div class="p-2 bg-gray-300 rounded">
            <h2>Nuova</h2>
        <div class="flex flex-row p-2 border-b justify-between text-left">
            <div class="w-2/5 pr-2">
                <input type="text" class="w-full" v-model="rappresentanza.rappresentanza" placeholder="rappresentanza"/>
            </div>
            <div class="w-1/5 text-left">
                <input type="text" class="text-sm" v-model="rappresentanza.paese" placeholder="paese"/>
            </div>
            <div class="w-1/5 text-left">
                <input type="text" class="w-full text-sm" v-model="rappresentanza.url" placeholder="url"/>
            </div>
            <div>
                <button class="mr-2" @click="add()">Aggiungi</button>
            </div>
        </div>
        </div>
        <template v-for="(line,index) in data">
            <div :key="'line_' + index" class="flex flex-row p-2 border-b justify-between text-left">
                <div class="w-2/5 pr-2">
                    <input type="text" class="w-full" v-model="data[index].rappresentanza"/>
                </div>
                <div class="w-1/5 text-left">
                    <input type="text" class="text-sm" v-model="data[index].paese"/>
                </div>
                <div class="w-1/5 text-left">
                    <input type="text" class="w-full text-sm" v-model="data[index].url"/>
                </div>
                <div>
                    <button class="mr-2" @click="save(line)">Salva</button>
                    <button @click="remove(line.id)">Elimina </button>
                </div>
            </div>
        </template>
        <div v-if="loading" class="z-10 fixed top-0 right-0 bg-red-600 text-white p-2">Loading...</div>
    </div>
</template>

<script>
export default {
    name: 'Rappresentanze',
    data:()=>({
        data:[],
        rappresentanza:{
            rappresentanza: '',
            paese: '',
            url: ''
        },
        loading: false
    }),
    methods:{
        
        save(rappresentanza){
            let vm = this
            let id = rappresentanza.id
            this.$api.service('rappresentanze').patch ( id , rappresentanza ).then ( result => {
                vm.init()
            })
        },
        add(){
            let vm = this
            if ( this.rappresentanza.rappresentanza.length ){
                this.$api.service('rappresentanze').create ( this.rappresentanza ).then ( result => {
                    vm.init()
                    vm.rappresentanza = {
                        rappresentanza: '',
                        paese: '',
                        url: ''
                    }
                })
            }
        },
        remove(id){
            let vm = this
            this.$api.service('rappresentanze').remove(id).then ( resp=> {
                vm.init()
            })
        },
        init(){
            this.loading = true
            let vm = this
            vm.$rappresentanze().then ( resp=> {
                vm.data = resp
                vm.loading = false
            })
            
        }
    },
    mounted(){
        this.init()
    }
}
</script>