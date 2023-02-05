<template>
    <div class="flex flex-col text-xs text-left bg-gray-200">
        <div class="w-full p-2 bg-blue-300 font-bold">
            Cliente
        </div>
        <div v-if="!cliente" class="w-full p-2 bg-gray-200 text-center text-xl">
            Seleziona un cliente
        </div>
        <div class="p-1 flex flex-col uppercase h-30" v-if="cliente">
            <div>
                <span class="capitalize font-bold">{{ cliente[0].ac_cognome }} {{ cliente[0].ac_nome }}</span>
            </div>
            <div>
                <div>{{ cliente[0].ac_citta }}</div>
                <span>{{ cliente[0].ac_indirizzo }}</span>
                <div class="lowercase flex flex-row items-center"><icon icon="email" class="text-sm mr-2"/>{{ cliente[0].ac_email }}</div>
                <div class=" flex flex-row items-center"><icon icon="phone" class="text-sm mr-2"/> {{ cliente[0].ac_telefono }}</div>
                <button @click="selected=cliente" class="mb-1">Vedi</button>
            </div>
        </div>
        
            <div class="p-1 flex flex-col uppercase " v-if="cliente">
                <div class="w-full relative p-2 bg-blue-300 font-bold flex flex-row items-center">
                    <div>Azione</div>
                    <div class="absolute right-0">
                        <icon icon="add" class="text-white mr-2" title="Aggiungi nuova azione" @click="addStatus()"/>
                        <icon icon="save" class="text-white mr-2" title="Salva azione corrente" @click="createStatus()"/>
                        <icon icon="delete" class="text-white mr-2" title="Elimina questa azione"/>
                    </div>
                </div>
                <div :style="'border-color:#' + cliente[index].ac_colore.replace('#','')" class="p-1 w-full border-4">
                <select v-model="selectedProcess" class="my-2 w-full p-1">
                    <option value="">Seleziona un processo</option>
                    <option v-for="process in tables.processi.data" :value="process.id_processo">{{ process.ac_processo }}</option>
                </select>
                <div class="flex flex-row">
                    <datepicker v-model="actionDate" type="date" valueType="format" format="DD/MM/YYYY" titleFormat="DD/MM/YYYY"/>
                    <div class="w-2"></div>
                    <datepicker v-model="actionTime" type="time" valueType="format" format="HH:mm" titleFormat="HH:mm"  timeTitleFormat="HH:mm"/>
                </div>
                <!-- <DateTimePicker right=true v-if="selectedProcess" label="Data e ora" v-model="actionDate"></DateTimePicker> -->
                <div class="mt-2">Note</div>
                <textarea v-model="selectedNotes" class="mb-2 w-full p-1 border h-32" placeholder="Note"></textarea>
                <button class="text-xs">Documento</button>
                </div>
            </div>
        <div class="flex flex-col p-1" v-if="cliente">
            <div class="flex flex-row p-1  border border-gray-500 bg-gray-300">
                    <div class="w-1/3">Data</div>
                    <div class="w-1/3">Ora</div>
                    <div class="w-1/3">Azione</div>
                </div>
            <template v-for="(row,i) in cliente">
                <div class="flex flex-row p-1 border-b items-center cursor-pointer bg-opacity-25 text-shadow text-white" :style="'background-color:#' + row.ac_colore" @click="index=i">
                    <div class="w-1/3 flex flex-row items-center">
                        <icon icon="arrow_right" :class="index===i?'text-black':'text-transparent'" class="text-base -ml-1"/>{{ row.data_status }}
                    </div>
                    <div class="w-1/3">{{ row.ora_status }} </div>
                    <div class="w-1/3">{{ row.ac_sigla }}</div>
                </div>
            </template>
        </div>
        <transition name="fade">
            <div v-if="selected" class="absolute top-0 right-0 w-1/3 bg-gray-100 p-1 shadow-xl text-center">
                <ui-crud v-if="selected" :fields="columns" :record="selected[0]" title="Cliente"/>
                <button @click="selected=null" class="mx-auto">Chiudi</button>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import schema from '../plugins/schema'

export default {
    name: 'CustomerStatus',
    data: () => ({
        //cliente: null,
        selected: null,
        selectedProcess: '',
        actionDate: null,
        actionTime: null,
        selectedNotes: '',
        index: 0
    }),
    props:[
        'id_cliente',
        'cliente'
    ],
    computed:{
        ...mapState(['tables']),
        columns(){
            return schema.clienti.fields
        }
    },
    methods:{
        customer(id){
            this.$api.service('cliente/status').find({query:{id_cliente:id}}).then ( response => {
                console.log ( "Status Cliente=" , response )
                this.cliente = null
                this.index = -1
                this.cliente = response
                this.index = 0//this.cliente.length -1
                this.selectedProcess = this.cliente[this.index].id_processo
                this.actionDate = this.cliente[this.index].data_status 
                this.actionTime = this.cliente[this.index].ora_status
                this.selectedNotes = this.cliente[this.index].ac_note
            }).catch ( error => {
                console.log ( error )
            })
            
        },
        addStatus(){
            this.selectedProcess = null
            this.selectedNotes = 'nuova azione'
            this.actionDate = null
            this.actionTime = null
            this.index = -1
        },
        createStatus(){
            //this.$api.service ( 'status' ).create ( {
            let error = false
            //let dateAction = new Date().toISOString().slice(0, 19).replace('T', ' ');
            let dateAction = this.actionDate.split('/');
            let newStatus = {
                id_processo : this.selectedProcess ? this.selectedProcess : error=true,
                id_cliente	: this.cliente[0].id_cliente,
                id_persona	: this.cliente[0].id_persona,
                dt_status	: dateAction[2]+'-'+dateAction[1]+'-'+dateAction[0] + ' ' + this.actionTime,
                ac_note     : this.selectedNotes
            }

            this.$store.dispatch('loading')
            if ( this.index < 0 ){
                this.$api.service ( 'status' ).create ( newStatus ).then ( response => {
                    console.log ( response )
                    this.$store.dispatch('loading')
                }).catch ( error => {
                    console.log ( error )
                    this.$store.dispatch('loading')
                })
            } else {
                this.$api.service ( 'status' ).patch ( this.cliente[this.index].id_status , newStatus ).then ( response => {
                    console.log ( response )
                    this.$store.dispatch('message','Operazione effettuata con successo')
                    this.$store.dispatch('loading')
                }).catch ( error => {
                    console.log ( error )
                    this.$store.dispatch('loading')
                })
            }
            //console.log ( newStatus , error )
        },
    },
    watch:{
        id_cliente(id){
            if ( id ){
                this.customer(id)
                this.selectedProcess = ''
            } else {
                this.cliente = null
            }
        },
        index(i){
            this.selectedProcess = this.cliente[i].id_processo
            this.actionDate = this.cliente[i].data_status
            this.actionTime = this.cliente[i].ora_status
            this.selectedNotes = this.cliente[i].ac_note
        }
    },
    mounted(){
        this.index = 0//this.cliente.length -1
                this.selectedProcess = this.cliente[this.index].id_processo
                this.actionDate = this.cliente[this.index].data_status 
                this.actionTime = this.cliente[this.index].ora_status
                this.selectedNotes = this.cliente[this.index].ac_note
        // if ( this.$attrs.customer ) {
        //     this.customer ( this.$attrs.customer )
        // }
    }
}
</script>