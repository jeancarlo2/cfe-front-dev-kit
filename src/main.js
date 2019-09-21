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
  get(mes, ano){
    return new Promise((r,rr)=>{
      mes     = mes + 1
      mes     = (mes < 10) ? "0"+mes : mes
      $.post(Vue.prototype.api+`lancamento/${Vue.prototype.usuario._id}/${mes}/${ano}`).then(data => r(data) )
    })
  
  }
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
