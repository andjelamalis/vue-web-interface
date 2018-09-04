import vue from 'vue'
const ws = new WebSocket('ws://' + location.host + '/ws/api/gui')
vue.use(ws)
export default {

}
