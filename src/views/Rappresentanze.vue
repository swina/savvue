<template>
    <div class="w-full md:mx-8 my-4">
        <div class="w-full flex flex-col md:flex-row flex-wrap justify-between">
            <template v-for="(item,index) in items">
                <div :key="'rapp_' + index" class="w-full md:w-1/3 flex flex-col text-left text-xs mb-4">
                    <div class="font-bold">
                        {{item.rappresentanza}}
                    </div>
                    <div class="">
                        {{item.paese}}
                    </div>
                    <div class="lowercase">
                        <a :href="'//' + item.url" class="text-blue-600" target="_blank">{{item.url}}</a>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rappresentanze',
    data:()=>({
        items: null
    }),
    mounted(){
        this.$api.service('rappresentanze').find().then(resp=>{
            this.items = resp.data
        })
    }
}
</script>