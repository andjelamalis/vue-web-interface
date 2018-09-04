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
      <th> <p> id </p></th>
      <th> accept_mode </th>
      <th> cell_profile_id </th>
      <th> channel_number </th>
      <th> error_reason </th>
      <th> ip </th>
      <th> min_attenuation </th>
      <th> name </th>
      <th> power </th>
      <th> power_type </th>
      <th> required_status </th>
      <th> status </th>
    </tr>

    <tr  v-for="(elements, i) in this.input.data" v-bind:key="i">
    <td> <p>{{elements.id}} </p></td>
    <td> {{elements.accept_mode}} </td>
    <td> {{elements.cell_profile_id}} </td>
    <td> {{elements.channel_number}} </td>
    <td> {{elements.error_reason}} </td>
    <td> {{elements.ip}} </td>
    <td> {{elements.min_attenuation}} </td>
    <td> {{elements.name}} </td>
    <td> {{elements.power}} </td>
    <td> {{elements.power_type}} </td>
    <td> {{elements.required_status}}</td>
    <td> {{elements.status}} </td>
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
import App from './App.vue'
import App2 from './App2.vue'
import App3 from './App3.vue'
import ws from './websocket'


export default {
name: 'app2',
data() {
  return {
  name: 'app2',

    input: {
    data: [],
    message: ' ',
    dataUpdate: [],
    ws: ''
    }
  }

  },
  methods: {
  update: function(el) {
    axios.put('/api/gui/cell/'+el.id,JSON.stringify({"cell_profile_id":parseInt(el.cell_profile_id)}));
    axios.put('/api/gui/cell/'+el.id,JSON.stringify({"channel_number":parseInt(el.channel_number)}));
    axios.put('/api/gui/cell/'+el.id,JSON.stringify({"min_attenuation":parseInt(el.min_attenuation)}));
    axios.put('/api/gui/cell/'+el.id,JSON.stringify({"power":parseInt(el.power)}));
    axios.put('/api/gui/cell/'+el.id,JSON.stringify({"power_type":el.power_type}));
    axios.put('/api/gui/cell/'+el.id,JSON.stringify({"accept_mode":el.accept_mode}));
  },
  OnOff: function(el) {
  console.log(el.required_status);
    axios.post('/api/gui/cell/'+el.id+'/power/'+ (el.required_status === 'on' ? 'off/' : 'on/'));
  },
  cells: function() {

  },
  logout: function() {
    window.localStorage.setItem('test', '');
    new Vue({
      render: h => h(App)
    }).$mount('#app2')

  },
  subscribers: function() {
  new Vue({
  render: h => h(App3)
  }).$mount('#app2')
  EventBus.$emit('data', this.input.data);
  }

  },
  mounted() {
  var self = this;

  console.log(self.input.data);

      ws.onmessage = function(m) {
      self.input.message = JSON.parse(m.data).type;
      if (self.input.message == 'cell_updated') {

          self.input.dataUpdate = JSON.parse(m.data).body;
          self.input.data[parseInt(self.input.dataUpdate.id)-1] = self.input.dataUpdate;

          new Vue({
          render: h => h(App2)
          }).$mount('#app2')
          EventBus.$emit('data', self.input.data);

      }


  }
  },
  created() {
  EventBus.$on('data', da => {
    this.input.data = da
    console.log(this.input.data);
  });

  }
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
