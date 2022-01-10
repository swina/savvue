<template>
    <div class="w-full p-2  pb-20" style="padding-bottom:10rem;" v-if="dataset">
        <table class="w-full border border-gray-800 text-left text-xs min-h-100">
            <thead class="text-xs py-2 bg-gray-500 text-white uppercase">
                <th class="border-b border-r px-1 py-2 border-r">#</th>
                <template v-for="(field,i) in columns">
                    <th class="border-r px-1" v-if ="!field.hide && field.view" :key="'head_' + field.key + '_' + i">{{field.label}}</th>
                </template>
                <th></th>
            </thead>
            <template v-for="(row,index) in dataset.data">
                <tr :key="'row_' + index" :class="'cursor-pointer hover:bg-gray-400 ' + striped(index)"  @click="$emit('selected',row),selectedRow=index">
                    <td class="w-12 py-1 px-1 border-r uppercase">{{($store.getters.skip)+index+1}}</td>
                    <template v-for="(field,i) in columns">
                        <td v-if="!field.hide && field.view" class="py-0 px-1 border-r" :class="field.class?field.class:'uppercase'" :key="'col_' + index + '_' + i">
                            <span v-if="field.type === 'text' && !field.format">{{row[field.key]}}</span>
                            <span v-if="field.type === 'text' && field.format === 'date'">
                                {{row[field.key].split('-')[2].split('T')[0]}}-{{row[field.key].split('-')[1]}}-{{row[field.key].split('-')[0]}}
                            </span>
                            <span v-if="field.relation">
                                 {{getRelation(field.relation,field.id,row[field.key],field)}}
                            </span>
                            <span v-if="field.type === 'boolean'">
                                {{ field.key }}
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
                        </td>
                    </template>
                    <td class="px-2"><i class="material-icons text-xs"  @click="$emit('selected',row)">edit</i></td>
                </tr>
            </template>
            
        </table>

        <div v-if="notfound" class="w-full">
            <div class="w-1/2 mt-2 m-auto bg-red-300 border rounded p-12">
                <h2>Nessun record soddisfa la condizione di ricerca</h2>
            </div>
        </div>


        <div class="w-full flex flex-row mt-2 items-center text-xs text-left">
            <button class="btn-light mr-2 hover:bg-gray-500 text-xs p-0" @click="$store.getters.skip>0?prevPage():null"><i class="material-icons">keyboard_arrow_left</i></button>
            <button class="btn-light mr-2 hover:bg-gray-500 text-xs p-0" @click="nextPage"><i class="material-icons">keyboard_arrow_right</i></button>
            <button class="btn-light mr-2">Record {{$store.getters.skip+1}}-{{$store.getters.skip+20}} di {{dataset.total}}</button>
            <button class="btn-light">Pagina {{parseInt($store.getters.skip/20)+1}} di {{parseInt(dataset.total/20)+1}}</button>
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
                <input v-if="!searchArray" type="text" class="w-20" placeholder="cerca..." v-model="searchValue"/>
            </div>
            <button class="text-xs ml-2" @click="searchData"><i class="material-icons text-sm">search</i></button>
            <button class="text-xs ml-2" @click="resetData">Annulla</button>
        </div>

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
export default {
    name: 'UiTable',
    data:()=>({
        edit: false,
        dataset:null,
        skip: 0,
        selectedRow: -1,
        search:'',
        searchRelation: '',
        searchValue:'',
        searchArray:null,
        searchField: null,
        searchText: null,
        notfound: false
    }),
    props: {
        service : { type: String , required: true , default: 'clienti' },
        sort : { type: String , required: false, default : '' },
        columns: { type: Array, required: true , default:()=>[] }
    },
    computed:{
        ...mapState ( ['tables'] )
    },
    watch:{
        search ( value ){
            let field = this.columns.filter ( a => a.key === value )
            if ( field[0].relation ){
                this.searchField = field[0].simple ? 'simple' : field[0].key
                this.searchText = field[0].display
                this.searchArray = this.tables[field[0].relation].hasOwnProperty('data') ? this.tables[field[0].relation].data : this.tables[field[0].relation][field[0].subset]
            } else {
                this.searchArray = null
            }
        }
    },
    methods:{
        striped(i){
            return i % 2 ? this.selectedRow === i  ? 'bg-blue-300' : 'bg-gray-200' : ''
        },
        colOutput(col,value){
            if ( col === 'bl_attivo' ){
                return value ? 'text-green-500' : 'text-red-500'
            }
        },
        getRelation(table,field,value,column){
            console.log ( column )
            //let data = this.$store.getters[table]
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
            let vm = this
            this.notfound = false
            let query = {
                query : { 
                    $limit: 20,
                    $skip : this.$store.getters.skip,
                    $sort : this.$store.getters.clienti_sort
                }
            }
            this.$store.dispatch ( 'loading' )
            this.$api.service(this.service).find(query).then ( response => {
                this.dataset = response
                this.$store.dispatch ( 'loading' )
            })
        },
        searchData(){
            this.notfound = false
            let qry = {
                $limit: 20,
                $skip : this.$store.getters.skip,
                $sort : this.$store.getters.clienti_sort,
            }
            qry[this.search] = { 
                $like : this.searchValue + '%' 
            }
            let query = {
                query : qry
            }
            this.$store.dispatch ( 'loading' )
            this.$api.service(this.service).find(query).then ( response => {
                this.dataset = response
                response.data.length ? this.notfound = false : this.notfound = true
                this.$store.dispatch ( 'loading' )
            })
        },
        nextPage(){
            this.$store.dispatch ( 'SetSkip' , parseInt(this.$store.getters['skip']) + 20 )
            this.search && this.searchValue ? this.searchData() : this.getData()
        },
        prevPage(){
            this.$store.dispatch ( 'SetSkip' , parseInt(this.$store.getters['skip']) - 20 )
            this.search && this.searchValue ? this.searchData() : this.getData()
        },
        resetData(){
            this.getData()
        }
    },
    mounted(){
        this.getData()
    }
}
</script>