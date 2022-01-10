import Vue from 'vue'
import store from '../store'

export default {
    install: function (Vue) {
  
        Vue.prototype.$products = function(){
            return new Promise((resolve,reject) => {
                this.$api.service ( 'prodotti' ).find(
                    {query: { $sort : { Settore: 1 , Ordine_Campo: 1 , Divisione:1 }}})
                    .then ( response => {
                    
                    store.dispatch ( 'SetProducts' , response.data )
                    let sectors = this.$arrayGroup ( response.data , 'Settore' , 'attivo' )
                    store.dispatch ( 'SetSectors' , sectors )
                    let applications = this.$arrayGroup ( response.data , 'Campo_Applicativo' , 'attivo' )
                    let categories = this.$arrayGroup(response.data,'Categorie','attivo')
                    store.dispatch ( 'SetApplications' , applications )
                    store.dispatch ( 'SetCategories' , categories )
                })
                this.$api.service('pagine').find().then ( response => {
                    store.dispatch('SetPagine',response.data)
                })
                resolve(true)
            })
        },

        Vue.prototype.$rappresentanze = function(){
            return new Promise((resolve,reject) => {
                this.$api.service ( 'rappresentanze' ).find({ query : { $sort : { rappresentanza: 1 }}}).then ( resp => {
                    resolve ( resp.data )
                }).catch ( error => {
                    console.log ( error )
                })
            })
        }

        Vue.prototype.$pages = function(){
            return new Promise((resolve,reject) => {
                this.$api.service ( 'pagine' ).find({ query : { layout : { $ne : 'hidden' } , $sort : { title: 1 }}}).then ( resp => {
                    resolve ( resp.data )
                }).catch ( error => {
                    console.log ( error )
                })
            })
        }
    }
}