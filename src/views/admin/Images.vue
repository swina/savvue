<template>
    <div class="w-full flex flex-col">
        <h3>Pagina demo in costruzione</h3>
        <template v-for="(img, index) in images">
            <div :key="'image_' + index" class="w-full flex flex-row items-center border-b p-2">
                <div class="w-1/3">
                    <img :src="img" width="120"/>
                </div>
                <div>
                    <button class="text-xs px-2 py-1" @click="deleteImg(index)">Rimuovi</button>
                </div>
            </div>
        </template>
        <div v-if="loading" class="z-10 fixed top-0 right-0 bg-red-600 text-white p-2">Loading...</div>
    </div>
</template>

<script>
export default {
    name: 'Images',
    data:()=>({
        images: null,
        page: null,
        id: null,
        loading: false
    }),
    methods:{
        deleteImage(index){
            this.images.slice(index,1)
            let object = {
                images: this.images
            }
            this.page.json = JSON.stringify(object)
            this.$api.service('pagine').patch ( this.id , this.page ).then ( resp => {
                console.log ( resp )
            })
        }
    },
    mounted(){
        this.loading = true
        this.$api.service('pagine').find({query:{title:'scroller'}}).then ( resp=> {
            this.page = resp.data[0]
            this.id = resp.data[0].id
            let images = JSON.parse(resp.data[0].json).images
			this.images = images.map ( img => {
				return img.replace('http://savinimilano.com/','')
            })
            this.loading = false
		})
    }
}
</script>