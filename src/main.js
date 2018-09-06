import Vue from 'vue'
import login from './login.vue'
import cells from './cells.vue'
import axios from 'axios'
import { EventBus } from './event-bus'


Vue.config.productionTip = false

if (window.localStorage.getItem('test') != null) {
  if ((window.localStorage.getItem('test').length > 0)) {
    new Vue({
      render: h => h(cells)
    }).$mount('#app')
    axios.get('/api/gui/cell').then(response => {
       EventBus.$emit('data', response.data);
  });
  axios.get('/api/gui/subscriber').then(response => {
     EventBus.$emit('data2', response.data);
     });


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
