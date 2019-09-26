import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'

Vue.use(Buefy)
Vue.config.productionTip = false
Vue.prototype.api = "https://appcfe.tk/";
Vue.prototype.api = "http://localhost/api/CFE-PHP-API/";
Vue.prototype.usuario     = Cookies.getJSON('usuario')
Vue.prototype.lancamento  = {
  saldo(mes, ano){
    return new Promise((r,rr)=>{
      mes     = mes + 1
      mes     = (mes < 10) ? "0"+mes : mes
      $.post(Vue.prototype.api+`lancamento/saldo/${Vue.prototype.usuario._id}/${mes}/${ano}`).then(data => r(data) )
    })
  },
  get(mes, ano){
    return new Promise((r,rr)=>{
      mes     = mes + 1
      mes     = (mes < 10) ? "0"+mes : mes
      $.post(Vue.prototype.api+`lancamento/${Vue.prototype.usuario._id}/${mes}/${ano}`).then(data => r(data) )
    })
  }
}
Vue.prototype.conta = {
  get(mes, ano, limit=0){
    return new Promise((r,rr)=>{
      mes     = mes + 1
      mes     = (mes < 10) ? "0"+mes : mes
      $.post(Vue.prototype.api+`conta/${Vue.prototype.usuario._id}/${mes}/${ano}${(limit)? '/'+limit:''}`).then(data => r(data) )
    })
  }
}
Vue.prototype.meta = {
  get(limit){
    return new Promise((r,rr)=>{
      $.post(Vue.prototype.api+`meta/${Vue.prototype.usuario._id}${(limit)? '/'+limit:''}`).then(data => r(data) )
    })
  }
}
Vue.prototype.converteMoeda = $ => parseFloat($).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
