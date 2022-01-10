<template>
    <div class="text-left mt-2 text-xs">
        <template v-for="(field,index) in fields">
            <div class="w-full font-bold p-1 mb-1 bg-gray-400 rounded">{{field}}</div>
            <template v-for="(row,i) in categories">
                <div class="w-full" v-if="row[field]!='' && row[field]">
                    <input type="text" v-model="row[field]" class="w-2/3 p-1 mb-1"/>
                    <button class="text-xs ml-2" @click="save(row)">Salva</button>
                </div>
            </template>
            <div class="w-full">
                    <input type="text" v-model="data[field]" :placeholder="'aggiungi ' + field" class="w-2/3 p-1 mb-1"/>
                    <button class="text-xs ml-2" @click="add(field)">Aggiungi</button>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'AdminCategories',
    data:()=>({
        fields : [ 'Campo_Applicativo' , 'Divisione' , 'Categorie' , 'Tipo_prodotto' ],
        data: {
            Campo_Applicativo: null,
            Divisione: null,
            Categorie: null,
            Tipo_prodotto : null
        },
        categories: null,
        current: null

    }),
    props : [ 'sector' ],
    methods: {
        save(row){
            console.log ( row )
            this.$api.service ( 'categorie' ).patch ( row.id , row ).then ( response=> {
                console.log ( response )
            })
        },
        add(field){
            let obj = {}
            obj[field] = this.data[field]
            obj.settore = this.sector
            this.$api.service ( 'categorie' ).create ( obj ).then ( response => {
                console.log ( response )
            })
        }
    },
    mounted(){
        this.categories = this.$store.getters.adminCategories
        /*
        this.$api.service('categorie').find( { query : { settore: this.sector } } ).then ( response => {
            this.categories = response.data
            this.$store.dispatch ( 'adminCategories' , response.data )
        })
        */
    }
}
</script>