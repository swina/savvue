<template>
    <div class="mt-10">
        <!-- <ui-table :columns="columns" service="status" sort="dt_data_registrazione" params="alert"></ui-table> -->
        <div v-if="alerts">
            <div class="flex flex-col justify-start items-start mx-40 border text-xs">
            <h3 class="p-2">Attività scadute negli ultimi 3 giorni (verificare lo status)</h3>
            <template v-for="(key,i) in alerts.keys">
                <div :key="key" class="w-full text-left p-1" :style="'background-color:' + alerts.values[i][0].ac_colore">
                    {{ key }}
                </div>
                <template v-for="(row,index) in alerts.values[i]">
                    <div class="flex flex-col border-b w-full" :key="row.id_status">
                        <div class="flex flex-col text-left pl-10 border-b" v-if="dataRow(i,index,row.data_status)">
                            <span>{{ row.data_status }}</span>
                        </div>
                        <div class="flex flex-row ml-24">
                            <span>{{ row.ora_status}}</span>
                            <span class="ml-10 uppercase"> {{ row.ac_cognome }} - {{ row.agente }} </span>
                        </div>                    
                        <!-- <span :data-row="setData(row.data_status)"></span> -->
                    </div>
                </template>
            </template>
            </div>
        </div>
    </div>
</template>

<script>
import schema from '@/plugins/schema'
export default {
    name: 'AlertHome',
    data:()=>({
        dateFrom: new Date(),
        dateTo: null,
        alerts: null,
        data_riga: null
    }),
    computed:{
        columns(){
            return schema.alerts.fields
        }
    },
    methods:{
        dataRow ( i, index , dt ){
            console.log ( i , index , dt )
            //return true
            return index > 0 ? 
                this.alerts.values[i][index-1].data_status === dt ? false : true : true
        }
    },
    mounted(){
        let query = {
                $limit: 50,
                $skip: 0,
                params: 'alert'
            
        }
        this.$api.service('status').find ( { query } ).then ( resp => {
            console.log ( 'Alert => ' , resp )
            let alerts = resp[0]
            this.alerts = this.$arrayGroup ( alerts , 'ac_processo' , 'dt_status' )
        })
        // var from = new Date();
        // var to = new Date();
        // this.dateFrom = new Date(from.setDate(from.getDate() - 3));
        // this.dateTo = new Date(to.setDate(to.getDate() + 1));
        // let query = {
        //     skip: 0,
        //     limit: 100,
        //     status_alert: true,
        // }
        // this.$api.service ( 'status' ).find ( { query } ).then ( response => {
        //     console.log ( response )
        //     this.alerts = response[0]
        // })
    }
}
</script>