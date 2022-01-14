<template>
    <div v-if="tables.agenti">
        <div v-if="agente" class="z-10 mt-8 w-full w-1/2 md:w-1/3 fixed top-0 right-0 h-screen border p-2 bg-white">
            <ui-crud v-if="agente" :fields="columns.fields" title="Agente" :record="agente"></ui-crud>
            <h4>Dati accesso</h4>
            <div v-if="user" class="flex flex-col text-xs">
                <div class="flex flex-col text-left">        
                    Utente <input type="text" v-model="user.email"/>
                </div>
                <div class="underline text-red-400 my-2 cursor-pointer" @click="changePassword=!changePassword">Modifica password</div>
                <div class="flex flex-col text-left" v-if="changePassword">        
                    <div>Password <input type="text" v-model="newPassword" placeholder="cambia password"/></div>
                    <div>
                    Conferma Password <input type="text" v-model="newPassword" placeholder="conferma cambia password"/>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col text-xs my-2">
                <small class="p-1 bg-red-200">Questo nominativo non ha nessun accesso al sistema. <br>Inserisci i dati per creare un account.</small>
                <div class="flex flex-col text-left mt-2">        
                    Crea Utente <input type="text" v-model="newUser"/>
                </div>
                <div class="flex flex-col text-left">        
                    <div class="my-2">Password <input type="text" v-model="newPassword" placeholder="password"/></div>
                    <div>
                    Conferma Password <input type="text" v-model="newPassword" placeholder="conferma password"/>
                    </div>
                </div>

            </div>
            <div class="w-full flex flex-row justify-end">
                <button class="btn-green" @click="agente=null">Salva</button>
                <button @click="agente=null,changePassword=false">Chiudi</button>
            </div>
        </div>
        <ui-table :columns="columns.fields" csv="agenti" :pagination="true" service="agenti" sort="" @selected="selected"></ui-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import schema from '@/plugins/schema'

export default {
    name: 'AgentiUI',
    data:()=>({
        agente:null,
        user: null,
        changePassword: false,
        newUser: '',
        newPassword: '',
        confirmPassword: ''
    }),
    computed:{
        ...mapState ( ['tables'] ),
        columns(){
            return schema.agenti
        }
    },
    methods:{
        selected (data){
            this.agente = data
            let query = {
                query : { account: data.ac_email }
            }
            this.$store.dispatch('loading')
            this.$api.service ( 'users' ).find ( query ).then ( response => {
                this.$store.dispatch ( 'loading' )
                this.user = response.data[0]
            })
        }
    }

}
</script>