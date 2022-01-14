<template>
    <div class="w-full p-2  pb-20" style="padding-bottom:10rem;">
        <transition name="fade">
            <div v-if="edit" class="z-10 mt-8 w-full w-1/2 md:w-1/3 fixed top-0 right-0 h-screen border p-2 bg-white">
                <ui-crud v-if="selected" :fields="columns" title="Cliente" :record="selected"></ui-crud>
                <div class="w-full flex flex-row justify-end">
                    <button class="btn-green" @click="edit=!edit">Salva</button>
                    <button @click="edit=!edit">Chiudi</button>
                </div>
            </div>
        </transition>
        <ui-table service="clienti" :pagination="true" @selected="what"></ui-table>
    </div>
</template>

<script>
import UiTable from '@/components/shared/table'
import UiCrud from '@/components/shared/crud'

export default {
    name: 'CRMCustomers', 
    components: {
        UiTable,
        UiCrud
    },
    data:()=>({
        customers: null,
        data: null,
        selected:null,
        edit:false,
        columns:[
            {
                key: 'ac_cognome',
                label: 'Cognome',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'ac_nome',
                label: 'Nome',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'ac_indirizzo',
                label: 'Indirizzo',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'ac_citta',
                label: 'Citta',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },

            {
                key: 'ac_pv',
                label: 'PV',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'ac_telefono',
                label: 'Telefono',
                type: 'text',
                view: false,
                editable: true,
                searchable: false
            },
            {
                key: 'ac_celluare',
                label: 'Mobile',
                type: 'text',
                view: false,
                editable: true,
                searchable: false
            },
            {
                key: 'ac_email',
                label: 'Email',
                type: 'text',
                view: false,
                editable: true,
                searchable: false
            },
            {
                key: 'bl_attivo',
                label: 'Ass',
                type: 'boolean',
                icon: 'lens',
                view: true,
                editable: false
            },
            {
                key: 'id_qualifica',
                label: 'Qualifica',
                type: 'list_icon',
                list: 'qualifiche',
                view: true,
                editable: false,
                searchable: false
            },
            {
                key: 'id_qualifica',
                label: 'Qualifica',
                type: 'relation',
                relation: 'qualifiche',
                display: 'ac_qualifica',
                subset: 'label',
                simple: true,
                hide: true,
                editable: true,
                searchable: true
            },
            {
                key: 'id_agente' ,
                label: 'Agente',
                type: 'relation',
                relation: 'agenti',
                display: 'ac_azienda',
                id: 'id_persona',
                subset: 'data',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'dt_data_registrazione' ,
                label: 'Registrato',
                type: 'text',
                format: 'date',
                view: true,
                editable: false,
                searchable: true
            },
            {
                key: 'ac_segnalatore',
                label: 'Segnalatore',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
        ],
        customers:null,
        data: null,
        options: {
            editableColumns:['id_cliente'],
            sortable: ['id_cliente'],
            filterable: ['id_cliente']
        },
        skip: 0
    }),
    methods:{
        striped(i){
            return i % 2 ? 'bg-gray-200' : ''
        },
        colOutput(col,value){
            if ( col === 'bl_attivo' ){
                return value ? 'text-green-500' : 'text-red-500'
            }
        },
        getData(table,field,value){
            let data = this.$store.getters[table]
            let x = data.data.filter ( d => {
                return d[field] === value
            })
            return x.length ? x[0].ac_cognome: ''
        },
        getCustomers(){
            let query = {
                skip : this.$store.getters.skip,
                limit: 20
            }
            this.$api.service('clienti').find({query}).then ( response => {
                this.customers = response[0]
                this.data = response[0]
            })
        },
        nextPage(){
            this.$store.dispatch ( 'SetSkip' , parseInt(this.$store.getters['skip']) + 20 )
            this.getCustomers()
        },
        prevPage(){
            this.$store.dispatch ( 'SetSkip' , parseInt(this.$store.getters['skip']) - 20 )
            this.getCustomers()
        },
        what(e){
            this.edit = true
            this.selected = e
        }
    },

    mounted(){
        // let query = {
        //     $skip : this.$store.getters.skip,
        //     $limit: 20
        // }
        // this.$api.service('clienti').find({query}).then ( response => {
        //     this.customers = response[0]
        //     this.data = response[0]
        // })
    }
}
</script>