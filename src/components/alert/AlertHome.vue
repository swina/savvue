<template>
    <div>
        <h3>Azioni scadute</h3>
        <ui-table :columns="columns" service="status" sort="dt_data_registrazione" params="alert"></ui-table>

    </div>
</template>

<script>
import schema from '@/plugins/schema'
export default {
    name: 'AlertHome',
    data:()=>({
        dateFrom: new Date(),
        dateTo: null,
        alerts: null
    }),
    computed:{
        columns(){
            return schema.alerts.fields
        }
    },
    mounted(){
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