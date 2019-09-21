import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'

Vue.use(Buefy)
Vue.config.productionTip = false
Vue.prototype.api = "https://appcfe.tk/";
Vue.prototype.api = "http://localhost/api/CFE-PHP-API/";
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
