<template>
    <div class="flex flex-row p-2 pb-64 overflow-y-auto bg-white rounded" v-if="status">
        <div class="w-3/4 flex flex-col relative shadow-lg">
            <div class="w-full text-left flex flex-row items-center">
                
                <!-- <icon icon="filter_alt" class="text-sm" @click="filtro=!filtro"/> -->
                <div class="flex flex-row text-xs justify-between"> 
                    <div v-if="id_agente" class="mx-2"><span>Agente:</span> <span class="font-bold">{{ filtroText.agente ? filtroText.agente : '' }}</span></div>
                    <div v-if="id_processo"><span >Processo:</span><span class="font-bold"> {{ filtroText.processo ? filtroText.processo : '' }}</span></div>
                </div>
            </div>
            <transition name="fade">
                <div class="w-full p-1 flex absolute z-10 top-0" v-if="filtro">
                    <div class="flex flex-col w-1/2 shadow-lg p-4 bg-gray-300 relative text-left">
                        <div>Filtri</div>
                        <icon class="absolute right-0 top-0 m-1 text-sm" icon="close" @click="filtro=!filtro"/>
                        <div class="flex flex-col">
                            <input type="text" v-model="search" class="border-r border-l border-b text-left text-xs" placeholder="Cerca cliente...">
                            <select v-model="id_agente" class="my-2">
                                <option value="">Cerca Agente ...</option>
                                <option v-for="(agent,i) in agenti" v-if="!agent.bl_cancellato" :value="agent.id_persona" class="lowercase capitalize">{{agent.ac_cognome}} {{agent.ac_nome }}</option>
                            </select>
                            <select v-model="id_processo">
                                <option value="">Cerca processo ...</option>
                                <option v-for="process in tables.processi.data" :value="process.id_processo">{{ process.ac_processo }}</option>
                            </select>
                        </div>
                        <div class="flex flex-row my-2 items-center">
                            <div class="flex flex-row w-1/2">
                                <datepicker v-model="fromDate" type="date"/>
                                <!-- <DateTimePicker no-header=true label="Dal" v-model="fromDate"></DateTimePicker> -->
                                <div class="w-4"></div>
                                <datepicker v-model="toDate" type="date"/>
                                <!-- <DateTimePicker no-header=true label="Al" v-model="toDate"></DateTimePicker> -->
                            </div>
                            <div class="flex flex-row justify-end w-1/2">
                                <button class="button bg-blue-400 text-white p-2 hover:bg-blue-600" @click="qry(),filtro=!filtro,skip=0">Cerca</button>
                                <button class="button" @click="resetQry(),filtro=!filtro">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            
            <table class="w-full border-r border-l border-b text-left text-xs min-h-100">
                <thead class="text-xs py-2 bg-gray-500  text-white uppercase">
                    <th class="border-b border-r px-1 py-2 border-r">#</th>
                    <template v-for="(field,i) in columns.fields">
                        <th class="border-r px-1" v-if ="!field.hide" :key="'head_' + field.key + '_' + i">{{field.label}}</th>
                    </template>
                    <!-- <th></th> -->
                </thead>
                <template v-for="(row,index) in status">
                    <tr :key="'row_' + index" class="cursor-pointer hover:bg-gray-400" @click="qryCustomer(row.id_cliente),currentRow=row.id_cliente" :class="currentRow===row.id_cliente?'bg-blue-300 font-bold':''">
                        <td class="w-8 py-1 px-1 border-r uppercase">{{(skip)+index+1}}</td>
                        
                        <template v-for="(field,i) in columns.fields">
                            <td class="py-0 px-1 border-r uppercase bg-opacity-50" :key="'col_' + index + '_' + i" v-if="!field.hide"  :style="field.key === 'ac_processo' ? stile(row.ac_colore,field.style):''">
                                <span v-if="field.style === 'text'">{{ row[field.key] }}</span>
                                <!-- <span v-if="field.type === 'text' && !field.format">{{row[field.key]}}</span>
                                <span v-if="field.type === 'text' && field.format === 'date'">
                                    {{row[field.key].split('-')[2].split('T')[0]}}-{{row[field.key].split('-')[1]}}-{{row[field.key].split('-')[0]}}
                                </span>
                                <span v-if="field.relation">
                                    {{getRelation(field.relation,field.id,row[field.key],field)}}
                                </span>
                                <span v-if="field.type === 'boolean'">
                                    <i class="material-icons" v-if="row[field.key]>0">done</i>
                                </span>
                                <select v-if="field.type === 'list'" v-model="row[field.key]">
                                    <template v-for="(option,i) in $store.getters[field.list].label">
                                        <option :value="i">{{option}}</option>
                                    </template>
                                </select> -->
                                <img v-if="field.style === 'list_icon'"  :title="row.ac_segnalatore" :src="'icons/' + row[field.key].replace('knobs/','')"/>
                            </td>
                        </template>
                        <!-- <td class="px-2"><i class="material-icons text-xs"  @click="$emit('selected',row)">edit</i></td> -->
                    </tr>
                </template>
            </table>
            <div class="flex flex-row items-center justify-around">
                <icon icon="filter_alt" class="absolute left-0" @click="filtro=!filtro"/>
                <icon icon="arrow_back_ios" class="text-xl" @click="skip>0?skip-=limit:skip=0"/>
                    <div class="flex flex-row text-xs">
                        Pagina {{ (skip/limit)+1}}
                    </div>
                <icon icon="arrow_forward_ios" class="text-xl" @click="skip+=limit"/>
            </div>
        </div>
        <transition name="fade">
         <div class="w-1/4 shadow-lg bg-gray-200">
            <!-- <CustomerStatus :id_cliente="id_cliente"/> -->
            <CustomerStatus :cliente="cliente" v-if="cliente"/>
         </div>
        </transition>
        <!-- <div class="fixed inset-0 flex justify-center items-center h-screen" v-if="loading">
            <div class="p-8 bg-white rounded-lg bg-opacity-75 flex flex-col items-center shadow">
                Loading ...
                <icon class="animate-spin text-3xl text-gray-500" v-if="loading" icon="cached"/>
            </div>
        </div> -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'UiStatus',
    components:{
        'CustomerStatus': () => import('@/components/CustomerStatus.vue')
    },
    data:()=>({
        filtro:false,
        filtroText:{},
        status:null,
        loading:false,
        skip: 0,
        limit:25,
        order:null,
        filter:null,
        search:'',
        id_cliente: null,
        id_agente: '',
        id_processo: '',
        fromDate: null,
        toDate: null,
        currentRow: 0,
        cliente: null,
        columns:
        {
            fields: [
                {
                    key: 'id_cliente',
                    label: 'ID',
                    style: 'text',
                    hide: true
                },
                 {
                    key: 'ac_icona',
                    label: '',
                    style: 'list_icon',
                    table: true
                },
                {
                    key: 'ac_cognome',
                    label: 'Cognome',
                    style: 'text',
                    table: true
                },
                {
                    key: 'ac_nome',
                    label: 'Nome',
                    style: 'text',
                    table: true
                },
                
                {
                    key: 'ac_citta',
                    label: 'Citta',
                    style: 'text',
                    table: true
                },
               
                {
                    key: 'agente' ,
                    label: 'Agente',
                    style: 'text',
                    table: true,
                    relation: 'agenti',
                    id: 'id_persona'
                },
                {
                    key: 'data_status' ,
                    label: 'Data',
                    style: 'text'
                },
                {
                    key: 'ac_processo',
                    label: 'Azione',
                    style: 'text',
                    table: true
                },
            ]
        }
    }),
    computed: {
        ...mapState ( ['tables','navigation'] ),
        agenti(){
            let sorted = this.tables.agenti.data.sort((a,b) => {
                if ( a.ac_cognome.toLowerCase() > b.ac_cognome.toLowerCase() ) return 1
                if ( a.ac_cognome.toLowerCase() < b.ac_cognome.toLowerCase() ) return -1
            } )
            return sorted
        }
    },
    watch:{
        skip(){
            this.id_cliente = null
            this.cliente = null
            this.qry()
        },
        id_agente(id){
            this.filtroText['agente'] = this.tables.agenti.data.filter ( a => a.id_persona === id )[0].ac_cognome
        },
        id_processo(id){
            this.filtroText['processo'] = this.tables.processi.data.filter ( a => a.id_processo === id )[0].ac_processo
        }
    },
    methods:{
        qry () {
            this.$store.dispatch ( 'loading' )
            console.log ( this.navigation.user.int_livello )
            const query = {
                skip: this.skip,
                limit: this.limit,
                order: this.order,
                filter: this.filter,
                search: this.search,
                id_persona: this.navigation.user.int_livello > 0 ? this.navigation.user.id_persona : this.id_agente,
                id_processo: this.id_processo,
                dt_from: this.fromDate ? this.fromDate.toISOString().split('T')[0] : null,
                dt_to: this.toDate ? this.toDate.toISOString().split('T')[0] : null,
            }
            this.$api.service('status').find({query}).then ( response => {
                this.$store.dispatch ( 'loading' )
                this.status = response[0]
                this.$store.dispatch ( 'setModel' , ['status' , Object.keys ( response[0][0] )] )
                this.$store.dispatch ( 'setStatus' , response[0] )
            })
        },
        
        resetQry(){
            this.filtroText = {}
            this.skip = 0
            this.limit = 25
            this.order = null
            this.filter = null
            this.search = null
            this.id_agente = null
            this.id_processo = null
            this.fromDate = null
            this.toDate = null
            this.qry()
        },
        stile(colore,stile){
            
            if ( stile === 'text' ){
                return 'background-color:#' + colore.replace('#','') 
            }
            return 'width:30px;'
        },
        qryCustomer(id){
            this.cliente = null
            console.log ( id )
            this.$api.service('cliente/status').find({query:{id_cliente:id}}).then ( response => {
                console.log ( "Status Cliente=" , response )
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
        }

    },
    beforeMount(){
        this.qry()
        // this.$api.service('status').find().then ( response => {
            //     this.$store.dispatch ( 'setStatus', response[0] )
        // })
    },
    mounted(){
        this.loading = true
        // window.addEventListener("keydown", e => {
        //     console.log ( e )
        //     if ( e.keyCode === 'ArrowDown' ){
        //         this.currentRow++
        //         this.id_cliente = this.status[this.currentRow]['id_cliente']
        //     }
        //     if ( e.keyCode === 'ArrowDown' ){
        //         this.currentRow--
        //     }
        //     if ( e.keyCode === 33 ){
        //         this.id_cliente = null
        //         this.skip > 0 ? this.skip -= this.limit : null
        //     }
        //     if ( e.keyCode === 34 ){
        //         this.id_cliente = null
        //         this.skip += this.limit
        //     }
        // })
    }
}
</script>