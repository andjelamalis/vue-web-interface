<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.js"></script>

<template>
  <div id="app2">
  <button v-on:click="logout()" style="background-color: white; color: black; border: 2px solid #000000; float: left; font-size: 16px;"> Logout </button>
  <br>
  <br>
  <br>
  <br>
  <!--<button v-on:click="cells()" style="background-color: white; color: black; border: 2px solid #A9A9A9; float: left; font-size: 16px;"> Cells </button>
  <button v-on:click="subscribers()" style="background-color: white; color: black; border: 2px solid #D3D3D3; float: left; font-size: 16px;"> Subscribers </button>
  -->
  <select style="width: 20%; float:left" v-on:onchange="change(value)">
  <option value="cells">cells</option>
  <option value="subscribers">subscribers</option>
  </select>


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
import data from './data.js'


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
  new Vue({
  render: h => h(subscribers)
  }).$mount('#app2')
  },
  change: function(value) {
  console.log('aas');

  },
  },
  mounted() {
  ws.$on('message', mes => {
  this.input.data = data.cellsData;
  this.$forceUpdate();
  })

  },
  created() {
  this.input.data = data.personData;

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
