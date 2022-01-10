<template>
    <div class="w-full bg-gray-700 h-screen flex">
        <div class="w-1/3 flex flex-col  m-auto border rounded">
            <div class="title bg-blue-300 text-gray-800">Login</div>
            <template v-for="(field,index) in fields">
                <div :key="'field_' + index" class="flex flex-row justify-start p-4">
                    <div class="w-1/3 text-left text-gray-200">{{field.label}}</div>
                    <input class="w-2/3" :type="field.type" v-model="field.value" :placeholder="field.label"/>
                </div>
            </template>
            <div class="row justify-center p-4">
                <button class="bg-blue-100 py-2 px-4 rounded" @click="login">Login</button>
            </div>
        </div>
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