<template>
    <div>
        ALERT
    </div>    
</template>

<script>
export default {
    mounted(){
        let query = {
            query : { 
                $limit: 50,
                $skip: 0,
                params: 'alert'
            }
        }
        this.$api.service('status').find ( { query } ).then ( resp => {
            console.log ( resp )
        })
    }
}
</script>
