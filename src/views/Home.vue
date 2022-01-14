<template>
  <div class="home">
    <!-- <AlertHome/> -->
  </div>
</template>

<script>

export default {
  name: 'home',
  components:{
    'AlertHome' : () => import ( '@/components/alert/AlertHome.vue'),
    
  },
  beforeMount(){
  }
}
</script>
