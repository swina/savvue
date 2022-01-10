<template>
    <div class="w-full mt-10 pb-20">
        
        <div v-if="applications && applications.keys[0] != 'null'" class="w-full flex flex-row flex-wrap  items-center bg-grigio h-16 px-4">
            <template v-for="(application,index) in applications.keys">
                <div :key="'application__' + index" :class="'cursor-pointer p-4 text-xs uppercase font-bold ' + style(index)" @click="setIndex(index)">
                    {{application}}
                </div>
            </template>
        </div>
        
        <div class="w-full mt-4 flex flex-row">
            <div class="w-1/4" v-if="divisions">
                
                <template v-for="(division,index) in divisions.keys">
                    <div :key="'division_' + index" class="flex flex-col text-left" v-if="categories">
                        <div class="product-title">{{division}}</div>
                        <template v-for="(category,i) in categories[index].keys">
                            <div :key="'category_' + i" class="product-category ml-8 uppercase pb-1">
                                <div :ref="'category_' + i" :class="'cursor-pointer ' + isActive(i,category)" @click="setProducts(category,index),currentIndex=-1">
                                    <span>{{category}}</span>
                                </div>
                            </div>
                        </template>
                        <hr>
                    </div>
                </template>
                
            </div>

            
            <div class="w-3/4">
                <div class="w-full bg-grigio mb-1 border-b-4 border-white uppercase text-left text-red-600 text-sm p-2">
                    <span v-if="!category && applications">{{applications.keys[index]}}</span>
                    <span v-if="category">{{category}}</span>
                </div>
                <div class="w-full h-full" :style="background + ' ;min-height:20rem;'">
                        
                        <div  v-if="categoryTypes" class="w-1/2 flex flex-col text-left text-xs p-4">
                            <template v-for="(type,index) in categoryTypes.keys">
                                <div :key="'type_' + index" class="text-sm uppercase underline">{{type}}</div>
                                <template v-for="(product,i) in categoryTypes.values[index]">
                                    <div :key="'product_' + index + '_' + i" class="flex flex-col">
                                        <div @click="currentIndex=(index*10)+i" class="font-bold p-1 cursor-pointer hover:bg-gray-400">{{product.Prodotto}}</div>
                                        <div v-if="product.description" :class="show(index,i) + ' flex flex-col p-4 border-t'">
                                            <div>{{product.description}}</div>
                                            <img v-if="product.image" :src="product.image"/>
                                        </div>

                                    </div>
                                </template>
                                <div class="mb-2"></div>
                            </template>
                        </div>
                        
                </div>

            </div>
            
        </div>
       
    </div>
</template>

<script>
export default {
    name: 'Products',
    data:()=>({
        applications:null,
        divisions: null,
        index: 0,
        path: null,
        products: null,
        category:'',
        indexDivision:0,
        categories:null,
        items:null,
        categoryItems: null,
        categoryTypes: null,
        category:'',
        background: '',
        currentIndex: -1
    }),
    watch:{
        
        '$route.path'(v){
            this.path = v.split('/')[2]
            this.index = 0
            this.init()
        },
        index(i){
            let array =  this.products.filter ( prod => {
                return prod['Campo_Applicativo'] === this.applications.keys[this.index]
            })    
            this.divisions = this.$arrayGroup ( array , 'Divisione' , 'attivo' )
            this.items = this.divisions.values
            this.categories = []
            this.divisions.keys.forEach ( (division,index) => {
                this.items[index].sort ( (a,b) => a.Ordine < b.Ordine ? -1 : 1 )
                this.categories.push ( this.$arrayGroup ( this.items[index] , 'Categorie' , 'attivo' ) )
            })
            this.background = 'background-image:url(/img/bg-' + this.applications.keys[this.index].toLowerCase().split(' ').join('-') + '.png); background-repeat:no-repeat; background-position:right top;'
            this.categoryTypes = null
        }
    },
    
    methods:{
        style(index){
            return parseInt(index) === this.index ? 'bg-white text-red-600 ' : ''
        },
        isActive(index,category){
            if ( this.category ){
                return category === this.category ? 'text-red-600' : ''
            }    
        },
        setIndex(i){
            this.index = i
            this.category = ''
        },
        show(index,i){
            return this.currentIndex === (index*10)+i ? '' : 'hidden'
        },
        getCategorie(division){
            this.division = division
            let array =  this.products.filter ( prod => {
                return prod['Campo_Applicativo'] === this.applications.keys[this.index]
            })
            array = array.sort( (a,b) => a.Ordine < b.Ordine ? -1 : 1 )
            array = array.filter ( a => {
                return a.Divisione === division 
            })

            return this.$arrayGroup ( array , 'Categorie' , 'attivo' ).keys
        },

        getCategory(category){
            return category === this.applications.keys[this.index] ? 'text-red-700' : ''
        },
        setProducts(category,index){
            this.category = category
            this.categoryItems = this.items[index].filter ( item => { return item.Categorie === category })
            this.categoryTypes = this.$arrayGroup ( this.categoryItems , 'Tipo_prodotto' , 'attivo' )
        },
        getProducts(){
            
            this.currentIndex = -1
            let array = this.products.filter ( prod => {
                return prod.Categorie === this.category
            })
            this.items = this.$arrayGroup(array,'Tipo_prodotto','attivo')

        },
        selected(category){
            return category === this.category ? true : false
        },
        init(){
            
            this.currentIndex = -1
            let prods = this.$store.getters.products.filter(product=>{
                return product.slug === this.path
            })
            this.category = ''
            this.products = prods
            this.applications = this.$arrayGroup ( prods , 'Campo_Applicativo' , 'attivo' )
            this.background = 'background-image:url(/img/bg-' + this.applications.keys[this.index].toLowerCase().split(' ').join('-') + '.png); background-repeat:no-repeat; background-position:right top;'
            let array =  this.products.filter ( prod => {
                return prod['Campo_Applicativo'] === this.applications.keys[this.index]
            })  
            
            if ( array.length ){
                this.divisions = this.$arrayGroup ( array , 'Divisione' , 'attivo' )
            } else {
                this.divisions = this.$arrayGroup ( this.products , 'Divisione' , 'attivo' ) 
            }
            this.items = this.divisions.values
            this.categories = []
            this.divisions.keys.forEach ( (division,index) => {
                this.items[index].sort ( (a,b) => a.Ordine < b.Ordine ? -1 : 1 )
                this.categories.push ( this.$arrayGroup ( this.items[index] , 'Categorie' , 'attivo' ) )
            })
        }
    },
    mounted(){
        this.path = this.$route.path.split('/')[2]
        let prods = this.$store.getters.products.filter(product=>{
            return product.slug === this.$route.path.split('/')[2]
        })
        this.products = prods
        this.applications = this.$arrayGroup ( prods , 'Campo_Applicativo' , 'attivo' )
        this.background = 'background-image:url(/img/bg-' + this.applications.keys[this.index].toLowerCase().split(' ').join('-') + '.png); background-repeat:no-repeat; background-position:right top;'
        let array =  this.products.filter ( prod => {
            return prod['Campo_Applicativo'] === this.applications.keys[this.index]
        })    
        this.divisions = this.$arrayGroup ( array , 'Divisione' , 'attivo' )
        this.items = this.divisions.values
        this.categories = []
        this.divisions.keys.forEach ( (division,index) => {
            this.items[index].sort ( (a,b) => a.Ordine < b.Ordine ? -1 : 1 )
            this.categories.push ( this.$arrayGroup ( this.items[index] , 'Categorie' , 'attivo' ) )
        })

    }
}
</script>