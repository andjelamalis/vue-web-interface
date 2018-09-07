
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.js"></script>

<template>
  <div id="app">

  <div class="container">
    <label for="username"><b>Username</b></label>
    <input v-model="input.user" type="text" placeholder="Enter Username" name="username" required>
    <p><p/>
    <label for="password"><b>Passwords</b></label>
    <input v-model="input.pass" type="password" placeholder="Enter Password" name="password" required>
    <p><p/>
    <button type="button" v-on:click="login()">Login</button>

  </div>
  </div>
</template>
<script>
import tables from './tables.vue'
import { EventBus } from './event-bus.js'
import Vue from 'vue'
import axios from 'axios'
import ws from './websocket'
import data from './data.js'


export default {
  name: 'app',
  data() {
    return {
    name: 'app',

      input: {
      user: '',
      pass: '',
      data: [],
      data2: [],
      ws: ''
      }
    }
    },

  methods: {

  login: function() {
      axios.defaults.withCredentials = true;
      axios.post('/api/gui/login', {user: this.input.user, password: this.input.pass}).then(response => {

         const t = JSON.stringify(response.headers);
         window.localStorage.setItem('test', t);

         new Vue({
         render: h => h(tables)
         }).$mount('#app')
         EventBus.$emit('data', this.input.data);
         EventBus.$emit('data2', this.input.data2);

    })
    .catch(error => {
      console.log(error);

    });
      axios.get('/api/gui/cell').then(response => {
         data.cellsData = response.data;
    });
     axios.get('/api/gui/subscriber').then(response => {
         data.subscribersData = response.data;
       });
       axios.get('/api/gui/person').then(response => {
           data.personData = response.data;
         });

  }
  }
  }


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
