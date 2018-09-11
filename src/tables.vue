<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.js"></script>

<template>
  <div id="app2">
  <button v-on:click="logout()" style="background-color: white; color: black; border: 2px solid #000000; float: left; font-size: 16px;"> Logout </button>
  <br>
  <br>
  <br>

  <select v-model="input.selected" style="width: 150px; float:left; font-size: 17px" v-on:change="onChange()">
  <option value="cells">cells</option>
  <option value="subscribers">subscribers</option>
  <option value="profiles">profiles</option>
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
  <div v-if="input.selected == 'cells'">
  <table v-for="(el, i) in this.input.data" v-bind:key="i" style="float: left">
  <tr>
    <th colspan="2"> cell{{el.id}} </th>
   </tr>
   <tr>
   <td> Profile: </td>
   <td> <select v-model="el.cell_profile_id">
        <option value=""> </option>
        <option v-for="(name, a) in input.profile" v-bind:key="a">{{name.id}}</option>
        </select>
   </td>
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
     <td colspan="2"> <label> Status: {{el.required_status}} </label> &nbsp; <button v-on:click="OnOff(el)"> Change status </button> &nbsp; <button v-on:click="updateCell(el)"> Update </button> </td>
    </tr>
</table>
  </div>

  <div v-if="input.selected == 'subscribers'">

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
      <td colspan="2"> <button v-on:click="updateSubscriber(el)"> Update </button> </td>
    </tr>
  </table>

  </div>

  <div v-if="input.selected == 'profiles'">
  <table v-for="(el, i) in this.input.data" v-bind:key="i" style="float: left">
  <tr>
    <th colspan="2"> {{el.id}} </th>
   </tr>
   <tr>
    <td> Standard: </td>
    <td> <select v-model="el.standard">
  <option value="850">850</option>
  <option value="900">900</option>
  <option value="1800">1800</option>
  <option value="1900">1900</option>
</select>
</td>
   </tr>
   <tr>
    <td> ARFCN: </td>
    <td> <input v-model="el.arfcn">  </td>
   </tr>
   <tr>
    <td> MCC: </td>
    <td> <input v-model="el.mcc">  </td>
   </tr>
   <tr>
      <td> MNC: </td>
      <td> <input v-model="el.mnc"> </td>
   </tr>
   <tr>
   <td> Network name: </td>
   <td> <input v-model="el.network_name"> </td>
   </tr>
   <tr>
   <td> Name: </td>
   <td>  <input v-model="el.name"></td>
   </tr>
    <tr>
      <td colspan="2"> <button v-on:click="updateProfiles(el)"> Update </button> </td>
    </tr>
  </table>
  </div>

  </div>


</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import login from './login.vue'
import tables from './tables.vue'
import ws from './websocket'
import data from './data.js'


export default {
name: 'app2',
data() {
  return {
  name: 'app2',

    input: {
    data: [],
    selected: 'cells',
    profile: [],
    ws: ''
    }
  }

  },
  methods: {
  updateCell: function(el) {
  axios.put('/api/gui/cell/'+el.id,JSON.stringify({"cell_profile_id":parseInt(el.cell_profile_id), "channel_number":parseInt(el.channel_number), "min_attenuation":parseInt(el.min_attenuation), "power":parseInt(el.power), "power_type":el.power_type, "accept_mode":el.accept_mode}));
  },

  updateSubscriber: function(el) {
    axios.put('/api/gui/subscriber/'+el.id,JSON.stringify({"imsi":el.imsi, "imei":el.imei, "number":el.number, "person_id":el.person_id, "is_external_call_allowed":el.is_external_call_allowed, "is_external_sms_allowed":el.is_external_sms_allowed, "is_internal_call_allowed":el.is_internal_call_allowed, "is_internal_sms_allowed":el.is_internal_sms_allowed}));
  },

  OnOff: function(el) {
    axios.post('/api/gui/cell/'+el.id+'/power/'+ (el.required_status === 'on' ? 'off/' : 'on/'));
  },
  logout: function() {
    window.localStorage.setItem('cookie', '');
    new Vue({
      render: h => h(login)
    }).$mount('#app2');
  },

  onChange: function() {
  this.input.data = data[this.input.selected + 'Data'];
  this.$forceUpdate();
  },
  updateProfiles: function(el) {
  axios.put('/api/gui/cell_profile/'+el.id,JSON.stringify({"standard":el.standard, "arfcn":el.arfcn, "mcc":el.mcc, "mnc":el.mnc, "network_name":el.network_name, "name":el.name}));

  }
  },
  mounted() {
  ws.$on('message', mes => {
  this.input.data = data[this.input.selected + 'Data'];
  this.input.profile = data.profilesData;
  this.$forceUpdate();
  })

  },
  created() {
  this.input.data = data.cellsData;
  this.input.profile = data.profilesData;
  if (this.input.data.length == 0) {
  axios.get('/api/gui/cell').then(response => {
       this.input.data = response.data
  });
  }
  if (this.input.profile.length == 0) {
  axios.get('/api/gui/cell_profile').then(response => {
       this.input.profile = response.data
  });
  }
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
