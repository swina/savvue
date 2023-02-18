<template>
    <div class="w-full pb-20 " style="padding-bottom:10rem;">
        <transition name="fade">
            <div v-if="edit" class="z-10 mt-8 w-full w-1/2 md:w-1/3 fixed top-0 right-0 h-screen border p-1 bg-gray-400">
                <ui-crud v-if="selected" :fields="fields" title="Cliente" :record="selected"></ui-crud>
                <div class="w-full flex flex-row justify-end" v-if="!confirmDelete && !notValidData">
                    <button class="btn-red" @click="deleteConfirmation">Elimina</button>
                    <button class="btn-green" @click="saveCustomer()">Salva</button>
                    <button @click="edit=!edit">Chiudi</button>
                </div>
                    <div v-if="confirmDelete" class="bg-gray-200 p-2">
                        Attenzione questa operazione e' irriversibile !!!
                        Confermi la cancellazione definitiva di questo record?
                        <button class="btn-red" @click="confirmDelete=!confirmDelete">Annulla</button>
                        <button class="btn-green" @click="deleteCustomer()">Conferma</button>
                        <div v-if="confirmMessage">{{ confirmMessage }}</div>
                    </div>
                    <div v-if="notValidData" class="bg-gray-200 p-2">
                        Campi obbligatori devono essere valorizzati
                        <button class="btn-green" @click="notValidData=!notValidData">OK</button>
                    </div>
            </div>
        </transition>
        <div class="flex p-1">
            <button class="bg-blue-400 hover:bg-lime-400" @click="createCustomer">Crea</button>
            <button class="hover:bg-lime-400" :class="importati?'bg-lime-400':''" @click="filterImported">Importati</button>
            <button class="hover:bg-lime-400" :class="assegnati?'bg-lime-400':''" @click="filterAssegnati">Non Assegnati</button>
            <!-- <button class="hover:bg-lime-400" :class="assegnati?'bg-lime-400':''" @click="exportClienti">Esporta</button> -->
        </div>
        <div class="overflow-y-auto min-h-screen h-screen pb-40">
            <ui-table service="clienti" :pagination="true" @selected="what" :filter="query?query:null" :refresh="refresh" @refreshed="refresh=!refresh" :exportTable="exportTable" :exportConfig="exportData"></ui-table>
        </div>
        <div v-if="exportData.show" class="z-10 mt-8 w-full w-1/2 md:w-1/3 fixed top-0 right-0 h-screen border p-1 bg-gray-400">
            <div class="flex flex-col bg-gray-100">
                <div class="bg-gray-300 p-2">Esporta dati</div>
                <div class="flex flex-col my-2 px-20">
                    Records <input type="number" v-model="exportData.limit"/>
                </div>
                <div class="flex flex-col my-2 px-20">
                    Parti da <input type="number" v-model="exportData.offset"/>
                </div>
                <div class="flex px-20 py-2">
                    <button class="btn-green" @click="exportCmd">Esporta</button>
                    <button @click="exportData.show=!exportData.show">Chiudi</button>
                </div>
                <div class="flex text-xs py-2 px-20">
                    I dati verranno esportati secondo i filtri correnti.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UiTable from '@/components/shared/table'
import UiCrud from '@/components/shared/crud'
import schema from '@/plugins/schema'

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
        newCustomer: false,
        edit:false,
        query: null,
        columns:[
            {
                key: 'ac_cognome',
                label: 'Cognome',
                type: 'text',
                view: true,
                editable: true,
                searchable: true,
                order: true
            },
            {
                key: 'ac_nome',
                label: 'Nome',
                type: 'text',
                view: true,
                editable: true,
                searchable: true,
                order: false
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
                searchable: true,
                order: true
            },

            {
                key: 'ac_pv',
                label: 'PV',
                type: 'text',
                view: true,
                editable: true,
                searchable: true,
                order: true
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
                key: 'ac_cellulare',
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
                searchable: true,
                order: true
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
        skip: 0,
        refresh: false,
        assegnati: false,
        importati: false,
        confirmDelete: false,
        confirmMessage: '',
        notValidData: false,
        exportTable: false,
        exportData: {
            show: false,
            offset: 0,
            limit: 100
        }
    }),
    computed: {
        fields() {
            return schema.clienti.fields
        }
    },
    
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
            this.newCustomer = false
            this.selected = e
        },
        createCustomer(){
            this.selected = {}
            this.columns.forEach ( col => {
                console.log ( col.key )
                this.selected[col.key] = ''
            })
            this.newCustomer = true
            this.edit = true
        },
        async saveCustomer(){
            let data = {}
            this.columns.forEach ( col => {
                data[col.key] = this.selected[col.key]
            })
            console.log ( data )
            let currDate = new Date()
            if ( data.id_agente ){
                data.bl_attivo = 1
            }
            if ( !this.validateData(data) ) return 
            if ( this.newCustomer ){
                data.dt_data_registrazione = currDate.toISOString().split('T')[0] + ' ' + currDate.toISOString().split('T')[1]
                this.$api.service('clienti').create ( data ).then (  resp => {
                    console.log ( resp )
                }).catch ( err => {
                    console.log ( err )
                })
                this.refresh = true
                console.log ( 'create new customer' )
            } else {
                data['dt_data_modifica'] = currDate.toISOString().split('T')[0] + ' ' + currDate.toISOString().split('T')[1]
                this.$api.service('clienti').patch ( this.selected.id_cliente , data ).then ( resp => {
                    console.log ( resp )
                })
            }
           
           
        },
        deleteConfirmation(){
            this.confirmDelete =! this.confirmDelete
        },
        deleteCustomer(){
            console.log ( this.selected.id_cliente , this.selected.ac_cognome )
            this.$api.service('clienti').remove(this.selected.id_cliente).then(resp=>{
            // this.$api.service('clienti').patch(this.selected.id_cliente,{bl_cancellato:1,bl_attivo:0}).then ( resp => {
                this.confirmDelete =! this.confirmDelete 
                this.selected = null
                this.edit = false
                this.refresh = true
            }).catch ( error => {  
                console.log ( error )
                this.confirmMessage = 'Errore nella cancellazione. Contattare l\'amministratore'
            })
            
        },
        filterImported(){
            this.importati =! this.importati
            this.assegnati = false
            if ( this.query ) {
                this.query = null
                return
            }
            let qry = {
                query : {
                    search : {
                        table: 'tbl_clienti',
                        field: 'bl_attivo',
                        value: -1
                    }
                }
            }
            this.query = qry
        },
        filterAssegnati(){
            this.assegnati =! this.assegnati
            this.importati = false
            if ( this.query ) {
                this.query = null
                return
            }
            let qry = {
                query : {
                    search : {
                        table: 'tbl_clienti',
                        field: 'id_agente',
                        value: 0
                    }
                }
            }
            this.query = qry
        },
        validateData(data){
            let validate = true
            this.fields.forEach ( field => {
                if ( field.hasOwnProperty('required') && ( typeof data[field.key] === 'undefined' || data[field.key] === '' ) ) {
                    console.log ( field, data[field.key])
                    
                    validate = false
                    this.notValidData = true
                }
            })
            console.log ( this.notValidData )
            return validate
        },
        exportClienti(){
            this.exportData.show = true
        },
        exportCmd(){
            this.exportTable =! this.exportTable        
        }
    },

    mounted(){
        // this.$api.service('clienti').on('patched' , (message) => console.log ( message))
        // this.$api.service('clienti').on('created').then ( resp => {
        //     this.query = null
        // })
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