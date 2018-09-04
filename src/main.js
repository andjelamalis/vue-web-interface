import Vue from 'vue'
import App from './App.vue'
import App2 from './App2.vue'
import { EventBus } from './event-bus.js'
import axios from 'axios'

Vue.config.productionTip = false

if (window.localStorage.getItem('test') != null) {
  if ((window.localStorage.getItem('test').length > 0)) {
    new Vue({
      render: h => h(App2)
    }).$mount('#app')
    axios.get('/api/gui/cell').then(response => {

       EventBus.$emit('data', response.data);
  })
  }
  else {
    new Vue({
      render: h => h(App)
    }).$mount('#app')
  }

}
else {
  new Vue({
    render: h => h(App)
  }).$mount('#app')
}
