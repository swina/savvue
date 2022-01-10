<template>
    <div v-if="tables.agenti">
        <div v-if="agente" class="mt-8 w-full w-1/2 md:w-1/3 fixed top-0 right-0 h-screen border p-2 bg-white">
            <ui-crud v-if="agente" :fields="columns.fields" title="Agente" :record="agente"></ui-crud>
            <div class="w-full flex flex-row justify-end">
                <button class="btn-green" @click="agente=null">Salva</button>
                <button @click="agente=null">Chiudi</button>
            </div>
        </div>
        <ui-table :columns="columns.fields" service="agenti" sort="" @selected="selected"></ui-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import schema from '@/plugins/schema'

export default {
    name: 'AgentiUI',
    data:()=>({
        agente:null
    }),
    computed:{
        ...mapState ( ['tables'] ),
        columns(){
            return schema.agenti
        }
    },
    methods:{
        selected (data){
            this.agente = data
        }
    }

}
</script>