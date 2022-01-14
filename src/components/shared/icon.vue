<template>
    <i class="material-icons cursor-pointer" :class="classe" @click="$emit('click')">{{$attrs.icon}}</i>
</template>

<script>
export default {
    name: 'MaterialIcon',
    computed:{
        classe(){
            let cl = this.$attrs.class
            if ( this.$attrs.size ) {
                cl += ' text-' + this.$attrs.size 
            }
            return cl
        }
    }
}
</script>