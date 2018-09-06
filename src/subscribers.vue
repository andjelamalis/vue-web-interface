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
      <th> <p> id </p></th>
      <th> imsi </th>
      <th> imei </th>
      <th> number </th>
      <th> addition_time </th>
      <th> last_update_time </th>
      <th> is_available </th>
      <th> cell_id </th>
      <th> person_id </th>
      <th> is_external_call_allowed </th>
      <th> is_external_sms_allowed </th>
      <th> is_internal_call_allowed </th>
      <th> is_internal_sms_allowed </th>
      <th> rrlp_location </th>
      <th> rrlp_last_request_time </th>
      <th> rrlp_error_code </th>
      <th> rrlp_appraisal </th>
      <th> rrlp_status </th>
      <th> manufacturer </th>
      <th> model </th>
      <th> network </th>
      <th> country </th>
      <th> cell_name </th>
      <th> arfcn </th>
      <th> standard </th>
      <th> uplink </th>
    </tr>

    <tr  v-for="(elements, i) in this.input.data2" v-bind:key="i">
    <td> <p> {{elements.id}} </p></td>
    <td> {{elements.imsi}} </td>
    <td> {{elements.imei}} </td>
    <td> {{elements.number}} </td>
    <td> {{elements.addition_time}} </td>
    <td> {{elements.last_update_time}} </td>
    <td> {{elements.is_available}} </td>
    <td> {{elements.cell_id}} </td>
    <td> {{elements.person_id}} </td>
    <td> {{elements.is_external_call_allowed}} </td>
    <td> {{elements.is_external_sms_allowed}} </td>
    <td> {{elements.is_internal_call_allowed}} </td>
    <td> {{elements.is_internal_sms_allowed}} </td>
    <td> {{elements.rrlp_location}} </td>
    <td> {{elements.rrlp_last_request_time}} </td>
    <td> {{elements.rrlp_error_code}} </td>
    <td> {{elements.rrlp_appraisal}} </td>
    <td> {{elements.rrlp_status}} </td>
    <td> {{elements.manufacturer}} </td>
    <td> {{elements.model}} </td>
    <td> {{elements.network}} </td>
    <td> {{elements.country}} </td>
    <td> {{elements.cell_name}} </td>
    <td> {{elements.arfcn}} </td>
    <td> {{elements.tandard}} </td>
    <td> {{elements.uplink}} </td>
    </tr>



</table>

<br>

<table v-for="(el, i) in this.input.data2" v-bind:key="i" style="float: left">
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
import active from './actives.js'




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
  EventBus.$emit('data', this.input.data);
  EventBus.$emit('data2', this.input.data2);

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
    if (active.subs_active == 'yes') {
    if (mes.type == 'subscriber_updated') {

    for (var i = 0; i < this.input.data2.length; i++ ) {
        if (this.input.data2[i].id == mes.body.id) {
            this.input.data2[i] = mes.body;
            break;
        }
    }

    /*new Vue({
    render: h => h(subscribers)
    }).$mount('#app3')
    EventBus.$emit('data', this.input.data);
    EventBus.$emit('data2', this.input.data2);*/
    }
    else if (mes.type == 'cell_updated') {

    for (var i = 0; i < this.input.data.length; i++ ) {
        if (this.input.data[i].id == mes.body.id) {
            this.input.data[i] = mes.body;
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
    new Vue({
    render: h => h(subscribers)
    }).$mount('#app3')
    EventBus.$emit('data', this.input.data);
    EventBus.$emit('data2', this.input.data2);

    }
    else if (mes.type == 'subscriber_deleted') {

    for (var i = 0; i < this.input.data2.length; i++ ) {
        if (this.input.data2[i].id == mes.body.id) {
            this.input.data2.splice(i, 1);
            break;
        }
    }
    /*new Vue({
    render: h => h(subscribers)
    }).$mount('#app3')
    EventBus.$emit('data', this.input.data);
    EventBus.$emit('data2', this.input.data2);*/
    }
    new Vue({
    render: h => h(subscribers)
    }).$mount('#app3')
    EventBus.$emit('data', this.input.data);
    EventBus.$emit('data2', this.input.data2);
    }
  });

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
