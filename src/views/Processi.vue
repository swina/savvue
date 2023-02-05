<template>
    <div>
        <ui-table service="processi" :pagination="false" sort="id_processo" @selected="selected"/>
        <!-- <div v-if="record" class="flex flex-row w-full text-xs px-2 border -mt-2">
            <template v-for="(gruppo,i) in $store.state.tables.macrogruppi">
                <div class="w-1/4 flex flex-col justify-center font-bold border-gray-500 border">
                    <div class="bg-gray-500 text-white p-1">{{ gruppo }}</div>
                    <div class="text-center">
                        <icon icon="done" class="text-green-400" v-if="parseInt(permissions[i])"/>
                        <icon icon="remove_circle" class="text-red-400" v-if="!parseInt(permissions[i])"/>
                    </div>
                </div>
            </template>
            
        </div> -->
        <transition name="fade">
            <div class="fixed inset-0 z-2 flex justify-center items-center h-screen" v-if="record">
                <div class="w-1/2 flex flex-col bg-white rounded shadow-lg p-1">
                    
                    <ui-crud :fields="columns" title="Processo" :record="record"></ui-crud>
                    <div class="flex flex-row w-full my-4"> 
                        <template v-for="(gruppo,i) in $store.state.tables.macrogruppi">
                            <div class="w-1/4 flex flex-col text-xs justify-center font-bold">
                                <div class="bg-gray-500 text-white p-1">{{ gruppo }}</div>
                                <div class="text-center">
                                    <icon icon="done" class="text-green-400" v-if="parseInt(permissions[i])"/>
                                    <icon icon="remove_circle" class="text-red-400" v-if="!parseInt(permissions[i])"/>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="w-full flex flex-row justify-end">
                        <button class="btn-green" @click="save">Salva</button>
                        <button @click="record=null">Chiudi</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import schema from '@/plugins/schema'
export default {
    name: 'ProcessUI',
    data:()=>({
        record: null,
        permissions: null
    }),
    computed:{
        columns(){
            return schema.processi.fields
        }
    },
    methods:{
        selected(record){
            this.record = record 
            //this.record.ac_colore = '#' + this.record.ac_colore
            this.permissions = record.ac_permissions.split(',')
            let macrogruppi = this.$store.state.tables.macrogruppi

        },
        save(){
            console.log ( this.record )
            this.$api.service('processi').patch ( this.record.id_processo , this.record ).then ( response => {
                this.$store.dispatch('message','Processo aggiornato')
                console.log ( response )
            }).catch ( error => {
                this.$store.dispatch('error','Errore contattare l\'assistenza')
            })
        }
    }
}
</script>