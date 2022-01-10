<template>
    <div class="w-1/4 bg-white">
        <CustomerStatus v-if="$attrs.customer" :id_cliente="$attrs.customer"/>
    </div>
</template>

<script>
export default {
    name: 'SideBarRight',
    components:{
        'CustomerStatus': () => import('@/components/CustomerStatus')
    }
}
</script>