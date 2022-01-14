<template>
    <div>
        <ui-table v-if="$store.state.navigation.user.int_livello===0" :columns="columns" service="users" @selected="selected" sort=""/>
        <span v-if="$store.state.navigation.user.int_livello!=0">Non autorizzato o nessun record trovato!</span>
    </div>
</template>

<script>
import schema from '@/plugins/schema'
export default {
    name: 'UtentiUI',
    data:()=>({
        user: null
    }),
    computed:{
        columns(){
            return schema.users.fields
        }
    },
    methods:{
        selected ( user ){
            this.user = user
        }
    }
}
</script>