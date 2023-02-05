<template>
    <div>
        <ui-crud v-if="agente" :fields="columns.fields" title="Profilo" :record="agente"></ui-crud>
        <button @click="save">Salva</button>
    </div>
</template>

<script>
import schema from '@/plugins/schema'

export default {
    name: 'Profilo',
    data:()=>({
        agente: null
    }),
    computed:{
        columns(){
            return schema['agenti']
        }
    },
    methods:{
        save(){
            this.$api.service('agenti').patch ( this.agente.id_persona , this.agente ).then ( response => {
                this.$store.dispatch('modal',null)
                this.$store.dispatch('message','Salvataggio eseguito correttamente')
            }).catch ( error => {
                console.log ( error )
                this.$store.dispatch('error','Errore salvataggio')
            })
        }
    },
    mounted(){
        this.$api.service('agenti').find( { query: { id_persona :this.$store.state.navigation.user.id_persona } }).then ( response => {
            console.log ( response )
            this.agente = response.data[0]
        }).catch ( error => {
            console.log ( error )
            this.$store.dispatch('error','Errore!')
        })
    }
}
</script>