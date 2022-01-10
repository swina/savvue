<template>
    <div class="flex flex-col">
        <div class="w-full flex flex-row cursor-pointer m-1" v-if="$store.getters.sectors">
            <template v-for="(sector,index) in $store.getters.sectors.keys">
                <div :key="'sector_' + index" class="mr-2 text-md uppercase bg-gray-400 rounded p-1" :style="active(sector)" @click="filter(sector)">
                    {{sector}}
                </div>
            </template>
            <input type="text" v-model="search" placeholder="cerca prodotto"/>
           
        </div>
        <div class="w-full flex flex-row">
            <div class="w-3/4 p-2">
                <button v-if="sector" @click="editCategorie=!editCategorie">
                    <span v-if="!editCategorie">Gestisci Categorie</span>
                    <span v-if="editCategorie">Gestisci Prodotti</span>
                </button>
                <component :is="component" :component="component" v-if="editCategorie" :sector="sector"/>
                <!--<div v-if="settings && settings!=null && editCategorie" class="w-full">
                    <template v-for="(setting,index) in settings">
                        <div :key="'setting_' + index" class="w-full text-left mb-2">
                            {{setting.label}} :
                            <template v-for="(s,i) in setting.data">
                                <span class="tagged">{{s}}</span>
                            </template>
                        </div>
                    </template>
                </div>
                -->
                
                <div v-if="!editCategorie && data && sector">
                    <template v-for="(product,i) in data">
                        <div v-if="product.Prodotto" :key="'product_' + i" class="flex flex-col">
                            <div class="flex flex-row p-1 text-sm relative">
                                <div class="w-2/3 flex flex-row p-1 border-b cursor-pointer" @click="setProduct(product)">
                                    {{product.Prodotto}}
                                </div>
                                <button @click="setProduct(product)" class="absolute right-0">Modifica</button>
                            </div>
                            <div :class="edit(product.Id) + ' w-full p-4 text-sm rounded bg-gray-300 '" v-if="product">
                                <template v-for="(setting,i) in settings">
                                    <div class="w-full text-left p-2">
                                        <div class="w-1/4">
                                            {{setting.label}} 
                                        </div>
                                        <div class="w-3/4">
                                            <select v-model="product[setting.field]">
                                                <template v-for="(s,n) in setting.data">
                                                    <option v-if="s!='null'":value="s" :key="'s_' + setting.field + '_' + n">{{s}}</option>
                                                </template>
                                            </select>
                                        </div>
                                    </div>
                                </template>
                                <template v-for="(field , index) in fields">
                                    <div :key="'edit_' + index" class="flex flex-col p-2 text-left">
                                        <label>{{field.label}}</label>
                                        <input v-if="field.type === 'text'" :type="field.type" v-model="product[field.name]"/>
                                        <input v-if="field.type === 'file'" :type="field.type" @change="onFileChange"/>
                                        <textarea v-if="field.type === 'textarea' && field.type != 'file'" v-model="product[field.name]"></textarea>
                                        <input v-if="field.type === 'checkbox'" :type="field.type" v-model="product[field.name]"/>
                                        
                                    </div>
                                </template>
                                <button @click="save(i)">Salva</button>
                            </div>
                        </div>    
                    </template>
                </div>
            </div>
            <div  v-if="product" class="fixed top-0 right-0 w-1/4 p-2 mt-10 pt-10 h-screen bg-gray-200">
                <h2>Immagine</h2>
                <img :src="image" class="m-auto"/>
                <button v-if="image" @click="removeImage=true,image=''">Rimuovi</button>
            </div>
        </div>
        <div v-if="loading" class="z-10 fixed top-0 right-0 bg-red-600 text-white p-2">Loading...</div>
    </div>
</template>

<script>
import VCategorie from './Categorie.vue'
export default {
    name: 'AdminProducts',
    components: { VCategorie },
    data:()=>({
        data: [],
        loading: false,
        editCategorie: false,
        component: null,
        search:'',
        id: null,
        sector: '',
        product: null,
        removeImage: false,
        applicativi: null,
        divisioni: null,
        categorie:null,
        tipo:null,
        settings:null,
        image: '',
        fields:[
            {
                name: 'Prodotto',
                label: 'Prodotto',
                type: 'text'
            },
            /*
            {
                name: 'Campo_Applicativo',
                label: 'Campo Applicativo',
                type: 'select',
                data: 'applicativi'
            },
             {
                name: 'Divisione',
                label: 'Divisione',
                type: 'select',
                data: 'divisioni'
            },
            {
                name: 'Categorie',
                label: 'Categoria',
                type: 'select',
                data: 'categorie'
            },
            {
                name: 'Tipo_prodotto',
                label: 'Tipo',
                type: 'select',
                data: 'tipo'
            },
            */
            {
                name: 'description',
                label: 'Descrizione',
                type: 'textarea'
            },
            {
                name: 'image',
                label: 'Immagine',
                type: 'file'
            },
            { 
                name: 'attivo',
                label: 'Attivo',
                type: 'checkbox'
            }
        ]
    }),
    watch:{
        search(v){
            this.initProducts()
            if ( v.length > 3 ){
                this.filterSearch ( v.toLowerCase() )
            }
        },
        editCategorie(v){
            v ? this.component = VCategorie : this.component = null
        },
        component(v){
            v ? null : this.updateCategories()
        }
    },

    methods:{
        active(sector){
            return sector === this.sector ? 'background: #882100; color:#fff' : ''
        },
        filter(sector){
            this.sector = sector
            this.data = this.$store.getters.products.filter ( prod => {
                return prod.Settore === sector && prod.attivo === 1 && prod.Settore.length > 0
            })
            this.data.sort ( (a,b) => a.Prodotto < b.Prodotto ? -1 : 1 )
            this.applicativi = this.$arrayGroup(this.data,'Campo_Applicativo','attivo')
            this.divisioni = this.$arrayGroup(this.data,'Divisione','attivo')
            this.categorie = this.$arrayGroup(this.data,'Categorie','attivo')
            this.tipo = this.$arrayGroup(this.data,'Tipo_prodotto','attivo')
            /*
            this.settings = [
                { label: 'Campo Applicativo' , field: 'Campo_Applicativo' , data: this.applicativi.keys },
                { label: 'Divisione' , field: 'Divisione' , data: this.divisioni.keys },
                { label: 'Categorie' , field: 'Categorie' , data: this.categorie.keys } ,
                { label: 'Tipo prodotto' , field: 'Tipo_prodotto' , data: this.tipo.keys }
            ]
            */
            this.search = ''
            this.editCategorie= false
            this.$api.service('categorie').find( { query : { settore: this.sector } } ).then ( response => {
                this.$store.dispatch ( 'SetAdminCategories' , response.data )
                this.settings = [
                    { label: 'Campo Applicativo' , field: 'Campo_Applicativo' , data: this.setOptions('Campo_Applicativo').keys },
                    { label: 'Divisione' , field: 'Divisione' , data: this.setOptions('Divisione').keys },
                    { label: 'Categorie' , field: 'Categorie' , data: this.setOptions('Categorie').keys } ,
                    { label: 'Tipo prodotto' , field: 'Tipo_prodotto' , data: this.setOptions('Tipo_prodotto').keys }
                ]
            })
        },
        setOptions(key){
            return this.$arrayGroup ( this.$store.getters.adminCategories , key , 'attivo' )
        },
        updateCategories(){
            this.$api.service('categorie').find( { query : { settore: this.sector } } ).then ( response => {
                this.$store.dispatch ( 'SetAdminCategories' , response.data )
                console.log ( 'updating categories ...' )
                this.settings = [
                    { label: 'Campo Applicativo' , field: 'Campo_Applicativo' , data: this.setOptions('Campo_Applicativo').keys },
                    { label: 'Divisione' , field: 'Divisione' , data: this.setOptions('Divisione').keys },
                    { label: 'Categorie' , field: 'Categorie' , data: this.setOptions('Categorie').keys } ,
                    { label: 'Tipo prodotto' , field: 'Tipo_prodotto' , data: this.setOptions('Tipo_prodotto').keys }
                ]
                this.editCategorie = false
                this.component = null
            })
        },
        filterSearch(str){
                this.loading = true
                this.initProducts()
                let array = []
                this.data.map ( prod => {
                    if ( prod.Prodotto ){
                        if ( prod.Prodotto.toLowerCase() .indexOf ( str ) > -1 ){
                            console.log ( prod.Prodotto.toLowerCase() )
                            array.push ( prod )
                        }
                    }
                })
                this.data = array
                this.loading = false
           
          
        },
        initProducts(){
            this.data = this.$store.getters.products
            this.loading = false
        },
        setProduct(product){
            this.id = product.Id
            this.product = product
            this.image = product.image 
        },
        edit(id){
            return id === this.id ? '' : 'hidden'
        },
        onFileChange(event){
            this.loading = true
            var files = event.target.files || event.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
            this.loading = false
        },
        save(i){
            this.loading = true
            let vm = this
            let product = this.product
            if ( this. image ){
                product.image = this.image
            }
            if ( this.removeImage ){
                product.image = ''
            }
            product.attivo = 1
            if ( !this.product.attivo ){
                product.attivo = 0 
            }
            let id = this.product.Id
            this.$api.service('prodotti').patch ( id , product ).then ( result => {
                this.removeImage = false
                console.log ( result )
                this.data[i] = result
                this.product = result
                this.loading = false
                this.id = id
            }).catch ( error => {
                this.loading = false
            })
        },
        dbCategorie(){
            this.settings.forEach(field=>{
                console.log ( field.field , '=>' , field.data )
                field.data.forEach(data=>{
                    let obj = {}
                    obj.settore = this.sector
                    obj[field.field] = data
                    this.$api.service('categorie').create ( obj ).then ( response =>{
                        console.log ( response )
                    })
                })
                
            })
        }

    },
    mounted(){
        this.loading = true
        this.$products()
        this.initProducts()
    }
}
</script>