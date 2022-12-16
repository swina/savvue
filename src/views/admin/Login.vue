<template>
    <div class="w-full bg-gray-100 h-screen flex flex-row">
        <div class="w-full md:w-1/3 px-8 text-gray-300 bg-gray-700 h-screen flex flex-col justify-center items-start">
            
            <!-- <div class="p-4">Login</div> -->

            <img class="mx-auto" src="/img/logo.png"/>
            <template v-for="(field,index) in fields">
                <div :key="'field_' + index" class="flex flex-col justify-start px-8 py-4 w-full">
                    <div class="w-1/3 text-left text-gray-200">{{field.label}}</div>
                    <input class="w-2/3 bg-gray-600" :type="field.type" v-model="field.value" :placeholder="field.label"/>
                </div>
            </template>
            <div class="row justify-center p-8">
                <button class="bg-lime-600 py-2 hover:bg-black px-4 rounded" @click="login">Login</button>
            </div>
            <!-- <a href="http://localhost:3030/oauth/google"><button class="btn-blue">Account Savenergy.it</button></a> -->
        </div>
        <div></div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data:()=>({
      settings:null,
      fields: [
          {
              name: 'email',
              label: 'Utente',
              value: '',
              type: 'text'
          },
          {
              name: 'password',
              label: 'Password',
              value: '',
              type: 'password'
          }
      ]
  }),
  methods:{
      login(){
          this.$api.authenticate({
              email: this.fields[0].value,
              password: this.fields[1].value,
              strategy: 'local'
          }).then ( user => {
              this.$store.dispatch('SetUser',user)
              this.$store.dispatch('SetLogged',true)
          }).catch ( error => {
              console.log ( 'non autenticato' , error )
          })
      }
  }
}
</script>