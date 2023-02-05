<template>
    <div class="fixed inset-0 z-10 bg-gray-700 bg-opacity-50 flex max-h-screen justify-center items-center h-screen">
        <div class="p-2 bg-white rounded-lg bg-opacity-75 flex flex-col items-center shadow relative">
        <div class="absolute right-0 m-1 top-0 bg-black text-white rounded-full h-5 w-5" @click="$store.dispatch('modal',null)"><icon icon="close" class="text-sm"></icon></div>
        <component :is="component" :component="component" :name="component"></component>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    computed:{
        component(){
            console.log ( this.$store.state.navigation.modal )
            return () => import('./' + this.$store.state.navigation.modal )//SideBarLeft'//this.$store.state.navigation.modal
        }
    }
}
</script>