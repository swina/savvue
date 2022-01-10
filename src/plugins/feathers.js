import Vue from 'vue'
import store from '../store'
import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import myapi from './api'
import router from '../router'
 //'https://ovh.moodgiver.tk', 
const socket = io( 'http://localhost:3030' ,{
  transports: ['websocket'],
  polling: {
    extraHeaders: {
      Authorization: 'Basic000002121212121212222'
    }
  }
})
console.log ( process.env.VUE_APP_APIURL )
//process.env.VUE_APP_APISERVER, {transports: ['websocket']})

// Connect  URL
const api = feathers()
  .configure(socketio(socket,{
    timeout:20000
  }))
  .configure(auth({ storage: window.localStorage }))



//set current user locale
store.commit('locale', window.navigator.userLanguage || window.navigator.language)

export default {
  install: function (Vue) {
    Vue.prototype.$api = api
  }
}
