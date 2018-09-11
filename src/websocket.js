import vue from 'vue'
import data from './data.js'

const ws = new WebSocket('ws://' + location.host + '/ws/api/gui')

const emitter = new vue({
  methods: {
    send(message) {
      if (1 === ws.readyState)
        ws.send(message)
    }
  }
})

ws.onmessage =  function(message) {
  var m = JSON.parse(message.data);
  if (m.type == 'cell_updated') {
    for (var i = 0; i < data.cellsData.length; i++ ) {
        if (data.cellsData[i].id == m.body.id) {
            data.cellsData[i] = m.body;
            break;
        }
    }
  }
  else if (m.type == 'subscriber_updated') {
    for (var j = 0; j < data.subscribersData.length; j++ ) {
        if (data.subscribersData[j].id == m.body.id) {
            data.subscribersData[j] = m.body;
            break;
        }
    }
  }

  else if (m.type == 'subscriber_inserted') {
    var found = false;
    for (var k = 0; k < data.subscribersData.length; k++ ) {
        if (data.subscribersData[k].id == m.body.id) {
            found = true;
            break;
        }
    }
    if (!found) {
      data.subscribersData.push(m.body)
    }
  }
  else if (m.type == 'subscriber_deleted') {
    for (var l = 0; l < data.subscribersData.length; l++ ) {
        if (data.subscribersData[l].id == m.body.id) {
            data.subscribersData.splice(l, 1);
            break;
        }
    }
  }
  else if (m.type == 'cell_profile_updated') {
    for (var p = 0; p < data.profilesData.length; p++ ) {
        if (data.profilesData[p].id == m.body.id) {
            data.profilesData[p] = m.body;
            break;
        }
    }
  }
  else if (m.type == 'cell_profile_inserted') {
    var found1 = false;
    for (var n = 0; n < data.profilesData.length; n++ ) {
        if (data.profilesData[n].id == m.body.id) {
            found1 = true;
            break;
        }
    }
    if (!found1) {
      data.profilesData.push(m.body)
    }
  }
  else if (m.type == 'cell_profile_deleted') {
    for (var o = 0; o < data.profilesData.length; o++ ) {
        if (data.profilesData[o].id == m.body.id) {
            data.profilesData.splice(o, 1);
            break;
        }
    }
  }

  emitter.$emit('message', '');
}

  ws.onerror = function(err){
    emitter.$emit("error", err)
  }

  export default emitter
