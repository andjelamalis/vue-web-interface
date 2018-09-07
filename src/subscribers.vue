<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.js"></script>

<template>
  <div id="app3">
  <button v-on:click="logout()" style="background-color: white; color: black; border: 2px solid #000000; float: left; font-size: 16px;"> Logout </button>
  <br>
  <br>
  <br>
  <br>
  <button v-on:click="cells()" style="background-color: white; color: black; border: 2px solid #D3D3D3; float: left; font-size: 16px;"> Cells </button>
  <button v-on:click="subscribers()" style="background-color: white; color: black; border: 2px solid #A9A9A9; float: left; font-size: 16px;"> Subscribers </button>
  <div class="container">
  <br>
  <br>
  <table>
    <tr>
    <th  v-for="(columns, j) in this.input.data[0]" v-bind:key="j"> <p>{{j}} </p></th>
    </tr>
    <tr  v-for="(elements, i) in this.input.data" v-bind:key="i">
    <td  v-for="(columns, j) in elements" v-bind:key="j"> <p>{{columns}} </p></td>
    </tr>
</table>

<br>

<table v-for="(el, i) in this.input.data" v-bind:key="i" style="float: left">
<tr>
  <th colspan="2"> {{el.imsi}} </th>
 </tr>
 <tr>
  <td> IMSI: </td>
  <td> <input v-model="el.imsi">  </td>
 </tr>
 <tr>
  <td> IMEI: </td>
  <td> <input v-model="el.imei">  </td>
 </tr>
 <tr>
  <td> Number: </td>
  <td> <input v-model="el.number">  </td>
 </tr>
 <tr>
    <td> Person: </td>
    <td> <input v-model="el.person_id"> </td>
 </tr>
 <tr rowspan="2">
   <td colspan="2"> <input type="checkbox" v-model="el.is_external_call_allowed"> External call <input type="checkbox" v-model="el.is_external_sms_allowed">  External sms <br> <input type="checkbox" v-model="el.is_internal_call_allowed"> Internal call <input type="checkbox" v-model="el.is_internal_sms_allowed">  Internal sms </td>

  </tr>
  <tr>
    <td colspan="2"> <button v-on:click="Update(el)"> Update </button> </td>
  </tr>

</table>
  </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { EventBus } from './event-bus.js'
import login from './login.vue'
import cells from './cells.vue'
import subscribers from './subscribers.vue'
import ws from './websocket.js'

import data from './data.js'




export default {
name: 'app3',
data() {
  return {
  name: 'app3',

    input: {
    data: [],
    data2: [],
    message: ' ',
    dataUpdate: []
    }
  }

  },
  methods: {
  cells: function() {
  active.cells_active = 'yes';
  active.subs_active = 'no';

  new Vue({
  render: h => h(cells)
  }).$mount('#app3')

  },
  subscribers: function() {

  },
  logout: function() {
  window.localStorage.setItem('test', '');
    new Vue({
      render: h => h(login)
    }).$mount('#app3')
  },
  Update: function(el) {

    axios.put('/api/gui/subscriber/'+el.id,JSON.stringify({"imsi":el.imsi, "imei":el.imei, "number":el.number, "person_id":el.person_id, "is_external_call_allowed":el.is_external_call_allowed, "is_external_sms_allowed":el.is_external_sms_allowed, "is_internal_call_allowed":el.is_internal_call_allowed, "is_internal_sms_allowed":el.is_internal_sms_allowed}));


  },
  },
  mounted() {

  ws.$on('message', mes => {
  this.$forceUpdate();
  })
  },

  created() {
  this.input.data = data.subscribersData;
  console.log(this.input.data);
  },
  }


</script>

<style>
#app3 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

table, th, td {
  border: 2px solid #D3D3D3;
  border-radius: 3px;
  background-color: #fff;
  border-collapse: collapse;
  text-align: center;
}

select {
  width: 100%;

}
</style>
