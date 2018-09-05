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
      emitter.$emit('message', JSON.parse(m.data));
  }

  ws.onerror = function(err){
    emitter.$emit("error", err)
  }

  export default emitter
