<template>
    <div class="relative w-full p-2 overflow-auto bg-white rounded" v-if="dataset">
        <table class="w-full border border-gray-800 text-left text-xs min-h-100">
            <thead class="text-xs py-2 bg-gray-500 text-white uppercase">
                <th class="border-b border-r px-1 py-2 border-r">#</th>
                <template v-for="(field,i) in columns">
                    <th class="border-r px-1 items-center" v-if ="!field.hide && field.view" :key="'head_' + field.key + '_' + i">{{field.label}} <span v-if="field.order" @click="order===field.key?order=null:order=field.key"><icon icon="expand_more" class="text-sm"/></span></th>
                </template>
                <!-- <th></th> -->
            </thead>
            <template v-for="(row,index) in dataset.data" v-if="dataset.data">
                <tr :key="'row_' + index" :class="'cursor-pointer hover:bg-gray-300 ' + striped(index)"  @click="$emit('selected',row),selectedRow=index">
                    <td class="w-12 py-1 px-1 border-r uppercase">{{(skip)+index+1}}</td>
                    <template v-for="(field,i) in columns">
                        <td v-if="!field.hide && field.view" class="py-0 px-1 border-r" :class="field.class?field.class:'uppercase'" :key="'col_' + index + '_' + i">
                            <span v-if="field.type === 'text' && !field.format">{{row[field.key]}}</span>
                            <span v-if="field.type === 'text' && field.format === 'date' && row[field.key]">
                                {{row[field.key].split('-')[2].split('T')[0]}}-{{row[field.key].split('-')[1]}}-{{row[field.key].split('-')[0]}}
                            </span>
                            <span v-if="field.relation">
                                 {{getRelation(field.relation,field.id,row[field.key],field)}}
                            </span>
                            <span v-if="field.type === 'boolean'">
                                <i class="material-icons" v-if="field.default?row[field.key]>0:row[field.key]===1">done</i>
                            </span>
                            <span v-if="field.type === 'checkbox'">
                                <icon icon="done" v-if="field.default?row[field.key]>0:row[field.key]===0" class="text-green-500"/>
                                <icon icon="close" v-else class="text-red-500"/>    
                            </span>
                            <select v-if="field.type === 'list'" v-model="row[field.key]">
                                <template v-for="(option,i) in $store.getters[field.list].label">
                                    <option :value="i">{{option}}</option>
                                </template>
                            </select>
                            <img v-if="field.type === 'list_icon'"  :title="$store.getters[field.list].label[row[field.key]]" :src="$store.getters[field.list].icon[row[field.key]]"/>
                            <div v-if="field.type === 'color'" class="w-5 h-5 rounded-full border shadow-lg" :style="'background-color:#' + row[field.key].replace('#','')" :title="row[field.key]"></div>
                            <div v-if="field.type === 'array'">
                                {{ row[field.key] }}
                                {{ row[field.key].split(',')[field.index] }}
                            </div>
                        </td>
                    </template>
                    <!-- <td class="px-2"><i class="material-icons text-xs"  @click="$emit('selected',row)">edit</i></td> -->
                </tr>
            </template>
            
        </table>

        <!-- <div v-if="!dataset.length" class="w-full">
            <div class="w-1/2 mt-2 m-auto bg-red-300 border rounded p-12">
                <h2>Nessun record soddisfa la condizione di ricerca</h2>
            </div>
        </div> -->


        <div v-if="dataset && pagination" class="w-full flex flex-row mt-2 items-center text-xs text-left">
            <button class="btn-light mr-2 hover:bg-gray-500 text-xs p-0" @click="skip>0?prevPage():null"><i class="material-icons">keyboard_arrow_left</i></button>
            <button class="btn-light mr-2 hover:bg-gray-500 text-xs p-0" @click="nextPage"><i class="material-icons">keyboard_arrow_right</i></button>
            <button class="btn-light mr-2 text-xs">{{skip+1}}-{{parseInt(skip+limit)}} di {{dataset.total}}</button>
            <button class="btn-light text-xs">Pg {{parseInt(skip/limit)+1}} di {{parseInt(dataset.total/limit)+1}}</button>
            Righe <input type="number" v-model="limit" max="200" title="Massimo 200 righe" @change="getData" class="mx-1 w-14 p-2"/><button class="btn-light" @click="getData">OK</button>
            <icon v-if="download" icon="download" title="Scarica CSV" @click="downloadCSV"/>
            <download-csv
                v-if="json_data"
                class   = "btn cursor-pointer btn-blue"
                :data   = "json_data"
                name    = "filename.csv">
                Scarica
            </download-csv>
            <label>Cerca</label>
            <select v-model="search" class="mx-2 w-1/5">
                <template v-for="(field,i) in columns">
                    <option v-if="field.searchable" :value="field.key">{{field.label}}</option>
                </template>
            </select>
            <div class="w-1/4">
                <select v-if="searchArray" v-model="searchRelation">
                    <option value="">Seleziona ...</option>
                    <option v-for="(field,i) in searchArray"  :value="searchField!='simple'?field[searchField]:i">{{ searchField==='simple'?field:field[searchText] }}</option>
                </select>
                <input v-if="!searchArray && !searchBoolean" type="text" class="w-20" placeholder="cerca..." v-model="searchValue"/>
                <select v-model="searchBooleanValue" v-if="searchBoolean">
                    <option value="1">VERO</option>
                    <option value="0">FALSO</option>
                </select>
            </div>
            <button class="text-xs ml-2" @click="searchData"><i class="material-icons text-sm">search</i></button>
            <button class="text-xs ml-2" @click="resetData">Annulla</button>
        </div>
<!-- 
        <div v-if="!dataset.length">Nessun record trovato!</div> -->

        <div v-if="edit" class="w-full md:w-1/2 fixed top-0 right-0 h-screen border p-2 bg-gray-200">
            <div class="w-full flex flex-row justify-end">
                <button class="btn-green" @click="edit=!edit">Salva</button>
                <button @click="edit=!edit">Chiudi</button>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import schema from '@/plugins/schema'
export default {
    name: 'UiTable',
    data:()=>({
        edit: false,
        dataset:null,
        pagination: true,
        order:null,
        download:true,
        json_data: null,
        skip: 0,
        limit:20,
        selectedRow: -1,
        search:'',
        searchRelation: '',
        searchValue:'',
        searchArray:null,
        searchBoolean: false,
        searchBooleanValue: 1,
        searchField: null,
        searchText: null,
        notfound: false,
        exportData: null
    }),
    props: {
        table: { type: String , required: false , default: '' },
        service : { type: String , required: false , default: 'clienti' },
        sort : { type: String , required: false, default : '' },
        filter: { required: false } ,
        refresh: { required: false } ,
        exportTable: { required: false , default: false },
        exportConfig: { required: false  }
        //columns: { type: Array, required: true , default:()=>[] }
    },
    computed:{
        ...mapState ( ['tables','navigation'] ),
        columns(){
            return schema[this.table||this.service].fields
        },
        externalQuery(){
            return this.filter ? this.filter : null
        },
        
    },
    watch:{
        search ( value ){
            if ( !this.search ) return
            this.searchBoolean = false
            let field = this.columns.filter ( a => a.key === value )
            if ( field[0].relation ){
                this.searchField = field[0].simple ? 'simple' : field[0].key
                this.searchText = field[0].display
                this.searchArray = this.tables[field[0].relation].hasOwnProperty('data') ? this.tables[field[0].relation].data : this.tables[field[0].relation][field[0].subset]
            } else {
                this.searchArray = null
            }
            console.log  ( field )
            if ( field[0].type === 'checkbox' ){
                this.searchValue = 1
                this.searchBoolean = true
            }
        },
        order ( value ){
            this.getData()
        },
        filter ( value ){
            this.getData()  
        },
        refresh ( value ){
            if ( value ){
                console.log ( 'refresh =>' , value )
                this.getData()
                this.$emit('refreshed')
            }
        },
        exportTable (v){
            console.log ( 'export' , v )
            //if ( value ){
                this.limit = this.exportConfig.limit
                this.offset = this.exportConfig.offset
                this.getData()
            //}
        }
    },
    methods:{
        striped(i){
            return this.selectedRow === i ? 'bg-blue-300' : 
                 i % 2 ? 'bg-gray-200' : ''
        },
        colOutput(col,value){
            if ( col === 'bl_attivo' ){
                return value ? 'text-green-500' : 'text-red-500'
            }
        },
        getRelation(table,field,value,column){
            let data = this.tables[column.relation]
            if ( data ){
                let x = data[column.subset].filter ( d => {
                    return d[field] === value
                })
                return x.length ? x[0][column.display]: ''
            }
            return null
        },
        getData(){
            if ( this.filter ){
                this.searchData ( this.filter )
                return
            }
            let vm = this
            this.notfound = false
            let sort = schema[this.service||this.table].sort
            let target = 'tbl_' + this.service||this.table
            if ( this.order ){
                sort = {}
                sort[target + '.' + this.order] = -1
            }
            let query = {
                query : { 
                    limit: this.exportTable ? this.exportConfig.limit : this.limit,
                    skip : this.exportTable ? this.exportConfig.offset : this.skip,
                    sort : sort//schema[this.service||this.table].sort
                }
            }
            if ( !this.order ){
                query = {
                    query : { 
                        limit: this.exportTable ? this.exportConfig.limit : this.limit,
                        skip : this.exportTable ? this.exportConfig.offset : this.skip,
                        $sort : sort
                    }
                }
            }
            if ( this.navigation.user.int_livello > 0 ){
                query.query['id_agente'] = this.navigation.user.id_persona
            }
            if ( this.$attrs.params ){
                 query.query['params'] = this.$attrs.params
            }
            this.$store.dispatch ( 'loading' )
            console.log ( query )
            this.$api.service(this.service).find(query).then ( response => {
                if ( this.exportTable ){
                    this.exportData = response
                }
                if ( this.service != 'status' ){
                    this.dataset = response
                } else {
                    this.dataset = response[0]
                }
                this.$store.dispatch ( 'loading' )
                console.log ( "Dataset=>" , this.dataset )
            }).catch ( error =>{
                this.$store.dispatch ( 'loading' )
                console.log ( error )
            })
        },
        searchData(){
            
            let target = 'tbl_' + this.service||this.table
            this.notfound = false
            let qry = {
                $limit: this.limit,
                $skip : this.$store.getters.skip,
                $sort : this.$store.getters.clienti_sort,
            }
            
            if ( target != 'tbl_clienti' ){
                let field = this.columns.filter(a=>a.key===this.search)[0]
                if ( target = 'tbl_agenti' ){
                    target = 'tbl_persone'
                }
                if ( field.type != 'checkbox' ){
                    qry[target + '.' + this.search] = { 
                        $like : this.searchValue + '%' 
                    }
                } else {
                    qry[target + '.' + this.search] = parseInt(this.searchBooleanValue)
                 }
            } else {
                
                    qry['search'] = {
                        table: target,
                        field: this.search,
                        value: this.searchValue
                    }
                
            }
            let query
            this.filter ? 
                query = this.filter :
                    query = { query : qry }
            console.log ( 'SEARCH QUERY IS => ' , query )
            // if ( query && query.qry.search.field && query.qry.search.value ){
                
                this.$store.dispatch ( 'loading' )
                this.$api.service(this.service).find(query).then ( response => {
                    response.data.length ? this.notfound = false : this.notfound = true
                    this.$store.dispatch ( 'loading' )
                    this.dataset = response
                    console.log ( "Search result => " ,this.dataset , response )
                }).catch ( error => {
                    this.$store.dispatch ( 'loading' )
                    console.log ( error )
                    this.$store.dispatch ( 'error' , 'Errore nella ricerca. Contattare l\'assistenza')
                })
            // } else {
            //     this.getData()
            // }

        },
        nextPage(){
            this.skip = this.skip + 20
            //this.$store.dispatch ( 'SetSkip' , parseInt(this.$store.getters['skip']) + 20 )
            this.search && this.searchValue ? this.searchData() : this.getData()
        },
        prevPage(){
            //this.$store.dispatch ( 'SetSkip' , parseInt(this.$store.getters['skip']) - 20 )
            this.skip = this.skip-20
            this.search && this.searchValue ? this.searchData() : this.getData()
        },
        resetData(){
            this.skip = 0
            this.search = ''
            this.searchValue = ''
            return this.table ? this.dataset = this.tables[this.table] : this.getData()
        },
        downloadCSV(){
            if ( ! this.$attrs.csv ) 
                this.json_data = this.dataset.data

            if ( this.$attrs.csv )
                this.json_data = JSON.stringify(this.tables[this.$attrs.csv].data )
        }
    },
    mounted(){
        if ( !this.$attrs.pagination ) this.pagination = false 
        if ( this.$attrs.sort ){
            this.$store.dispatch ( 'set')
        }
        return this.table ? this.dataset = this.tables[this.table] : this.getData()
    }
}
</script>