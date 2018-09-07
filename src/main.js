import Vue from 'vue'
import login from './login.vue'
import tables from './tables.vue'
import axios from 'axios'
//import { EventBus } from './event-bus'
import data from './data.js'


Vue.config.productionTip = false

if (window.localStorage.getItem('test') != null) {
  if ((window.localStorage.getItem('test').length > 0)) {
    axios.get('/api/gui/cell').then(response => {
         data.cellsData = response.data
    });
    axios.get('/api/gui/subscriber').then(response => {
         data.subscribersData = response.data
    });
    axios.get('/api/gui/person').then(response => {
         data.personData = response.data
    });
    new Vue({
      render: h => h(tables)
    }).$mount('#app')
  }
  else {
    new Vue({
      render: h => h(login)
    }).$mount('#app')
  }

}
else {
  new Vue({
    render: h => h(login)
  }).$mount('#app')
}
