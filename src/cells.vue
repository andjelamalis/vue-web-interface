<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.js"></script>

<template>
  <div id="app2">
  <button v-on:click="logout()" style="background-color: white; color: black; border: 2px solid #000000; float: left; font-size: 16px;"> Logout </button>
  <br>
  <br>
  <br>
  <br>
  <button v-on:click="cells()" style="background-color: white; color: black; border: 2px solid #A9A9A9; float: left; font-size: 16px;"> Cells </button>
  <button v-on:click="subscribers()" style="background-color: white; color: black; border: 2px solid #D3D3D3; float: left; font-size: 16px;"> Subscribers </button>
  <div class="container">
  <br>
  <br>
  <table>
  <tr>
  <th  v-for="(columns, j) in this.input.data[0]" v-bind:key="j"> <p>{{j}} </p></th>
    <tr  v-for="(elements, i) in this.input.data" v-bind:key="i">
    <td  v-for="(columns, j) in elements" v-bind:key="j"> <p>{{columns}} </p></td>
    </tr>
  </table>

  <br>

  <table v-for="(el, i) in this.input.data" v-bind:key="i" style="float: left">

  <tr>
    <th colspan="2"> cell{{el.id}} </th>
   </tr>
   <tr>
    <td> Cell profile id: </td>
    <td> <input v-model="el.cell_profile_id">  </td>
   </tr>
   <tr>
    <td> Chanel number: </td>
    <td> <input v-model="el.channel_number">  </td>
   </tr>
   <tr>
    <td> Min attenuation: </td>
    <td> <input v-model="el.min_attenuation">  </td>
   </tr>
   <tr>
    <td> Power: </td>
    <td> <input v-model="el.power">  </td>
   </tr>
   <tr>
    <td> Power type: </td>
    <td> <select v-model="el.power_type">
  <option value="hardware">hardware</option>
  <option value="software">software</option>
  <option value="pseudo_hardware">pseudo_hardware</option>
</select> </td>
   </tr>
   <tr>
    <td> Accept mode: </td>
    <td> <select v-model="el.accept_mode">
  <option value="all">all</option>
  <option value="none">none</option>
  <option value="only_black">only_black</option>
  <option value="all_but_white">all_but_white</option>
</select> </td>
   </tr>
   <tr>
     <td colspan="2"> <label> Status: {{el.required_status}} </label> &nbsp; <button v-on:click="OnOff(el)"> Change status </button> &nbsp; <button v-on:click="update(el)"> Update </button> </td>
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
import ws from './websocket'
import active from './actives.js'


export default {
name: 'app2',
data() {
  return {
  name: 'app2',

    input: {
    data: [],
    data2: [],
    message: ' ',
    dataUpdate: [],
    ws: ''
    }
  }

  },
  methods: {
  update: function(el) {


  axios.put('/api/gui/cell/'+el.id,JSON.stringify({"el.cell_profile_id":parseInt(el.channel_number), "channel_number":parseInt(el.channel_number), "min_attenuation":parseInt(el.min_attenuation), "power":parseInt(el.power), "power_type":el.power_type, "accept_mode":el.accept_mode}));


  },
  OnOff: function(el) {
    axios.post('/api/gui/cell/'+el.id+'/power/'+ (el.required_status === 'on' ? 'off/' : 'on/'));
  },
  cells: function() {

  },
  logout: function() {
    window.localStorage.setItem('test', '');
    new Vue({
      render: h => h(login)
    }).$mount('#app2');



  },
  subscribers: function() {
  active.cells_active = 'no';
  active.subs_active = 'yes';

  new Vue({
  render: h => h(subscribers)
  }).$mount('#app2')
  EventBus.$emit('data', this.input.data);
  EventBus.$emit('data2', this.input.data2);


  }

  },
  mounted() {
  ws.$on('message', mes => {
  this.input.message = mes
   if (active.cells_active == 'yes') {
  if (mes.type == 'cell_updated') {

  for (var i = 0; i < this.input.data.length; i++ ) {
      if (this.input.data[i].id == mes.body.id) {
          this.input.data[i] = mes.body;
          break;
      }
  }


  }
  else if (mes.type == 'subscriber_updated') {
  for (var i = 0; i < this.input.data2.length; i++ ) {
      if (this.input.data2[i].id == mes.body.id) {
          this.input.data2[i] = mes.body;
          break;
      }
  }
  }
  else if (mes.type == 'subscriber_inserted') {

  var found = false;
  for (var i = 0; i < this.input.data2.length; i++ ) {
      if (this.input.data2[i].id == mes.body.id) {
          found = true;
          break;
      }
  }
  if (!found) {
    this.input.data2.push(mes.body);
  }

  }
  else if (mes.type == 'subscriber_deleted') {

  for (var i = 0; i < this.input.data2.length; i++ ) {
      if (this.input.data2[i].id == mes.body.id) {
          this.input.data2.splice(i, 1);
          break;
      }
  }

}

}
})






  },
  created() {
  EventBus.$on('data', d => {
  this.input.data = d;
  });
  EventBus.$on('data2', d2 => {
  this.input.data2 = d2;
  });

  },


  }


</script>

<style>
#app2 {
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
