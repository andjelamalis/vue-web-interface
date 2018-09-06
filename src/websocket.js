import vue from 'vue'

const ws = new WebSocket('ws://' + location.host + '/ws/api/gui')

const emitter = new vue({
  methods: {
    send(message) {
      if (1 === ws.readyState)
        ws.send(message)
    }
  }
})

ws.onmessage =  function(m) {
/*  if (m.type == 'cell_updated') {

  }
  else if (m.type == 'subscriber_updated') {

  }

  else if (m.type == 'subscriber_inserted') {


  }
  else if (m.type == 'subscriber_deleted') {


  }
*/
    emitter.$emit('message', JSON.parse(m.data));
  }

  ws.onerror = function(err){
    emitter.$emit("error", err)
  }

  export default emitter
