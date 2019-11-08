import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'

Vue.use(Buefy)
Vue.config.productionTip = false
Vue.prototype.api = "https://appcfe.tk/";
// Vue.prototype.api = "http://localhost/api/CFE-PHP-API/";
Vue.prototype.usuario     = () => Cookies.getJSON('usuario')
Vue.prototype.lancamento  = {
  saldo(mes, ano){
    return new Promise((r,rr)=>{
      mes     = mes + 1
      mes     = (mes < 10) ? "0"+mes : mes
      $.post(Vue.prototype.api+`lancamento/saldo/${Vue.prototype.usuario()._id}/${mes}/${ano}`).then(data => r(data) )
    })
  },
  get(mes, ano){
    return new Promise((r,rr)=>{
      mes     = mes + 1
      mes     = (mes < 10) ? "0"+mes : mes
      $.post(Vue.prototype.api+`lancamento/${Vue.prototype.usuario()._id}/${mes}/${ano}`).then(data => r(data) )
    })
  }
}
Vue.prototype.lista = {
  itens(id){
    return new Promise((r,rr)=>{
      $.post(Vue.prototype.api+`lista/get/${id}`).then(data => r(data.itens) )
    })
  },
  get(limit){
    return new Promise((r,rr)=>{
      $.post(Vue.prototype.api+`lista/${Vue.prototype.usuario()._id}${(limit)? '/'+limit:''}`).then(data => r(data) )
    })
  }
}
Vue.prototype.conta = {
  get(mes, ano, limit=0){
    return new Promise((r,rr)=>{
      mes     = mes + 1
      mes     = (mes < 10) ? "0"+mes : mes
      $.post(Vue.prototype.api+`conta/${Vue.prototype.usuario()._id}/${mes}/${ano}${(limit)? '/'+limit:''}`).then(data => r(data) )
    })
  },
  PayConta(conta) {
    return new Promise(r =>{
      if(conta.pago.length){
        Vue.prototype.$buefy.toast.open({
          message: "Conta já foi paga esse mês!",
          position: "is-bottom",
          type: "is-warning"
        })
        r(false)
      }
      else{
        Vue.prototype.$buefy.dialog.confirm({
          title: conta.titulo+" - R$"+Vue.prototype.converteMoeda(conta.valor),
          message:`Pagar conta?`,
          confirmText: "Pagar conta",
          cancelText: "Cancelar",
          type: "is-success",
          onConfirm: ()=>{
            let data = {
              contaid: conta._id,
              titulo: `${conta.titulo}`,
              valor: conta.valor,
              tipo:0
            }
            let toast = Vue.prototype.$buefy.toast
            $.post(Vue.prototype.api+`conta/pagar/${conta.userid}`, data)
              .done(data=>{
                r(data)
                toast.open({
                  message: "Conta paga!",
                  position: "is-bottom",
                  type: "is-success"
                })
              })
          }
        });
      }
    });
  },
  PayParcela(conta) {
    return new Promise(r =>{
    if(conta.pago.length || conta.pagos.length >= parseInt(conta.parcelas)){
      Vue.prototype.$buefy.toast.open({
        message: "Conta já foi paga esse mês!",
        position: "is-bottom",
        type: "is-warning"
      })
      r(false)
    }
    else{
      Vue.prototype.$buefy.dialog.confirm({
        title: conta.titulo+" - R$"+Vue.prototype.converteMoeda(conta.valor),
        message:`${conta.parcelas} parcelas de <b>R$ ${Vue.prototype.converteMoeda(conta.valor/conta.parcelas)}</b><br>${conta.pagos.length} parcelas pagas`,
        confirmText: "Pagar parcela",
        cancelText: "Cancelar",
        type: "is-success",
        onConfirm: ()=>{
          let data = {
            contaid: conta._id,
            titulo: `${conta.titulo} - Parcela ${conta.pagos.length+1}`,
            valor: conta.valor/conta.parcelas,
            tipo:0
          }
          let toast = Vue.prototype.$buefy.toast
          $.post(Vue.prototype.api+`conta/pagar/${conta.userid}`, data)
            .done(data=>{
              toast.open({
                message: "Parcela paga!",
                position: "is-bottom",
                type: "is-success"
              })
              r(data)
            })
        }
      });
    }
    })
    // 
  }
}
Vue.prototype.meta = {
  get(limit){
    return new Promise((r,rr)=>{
      $.post(Vue.prototype.api+`meta/${Vue.prototype.usuario()._id}${(limit)? '/'+limit:''}`).then(data => r(data) )
    })
  }
}
Vue.prototype.converteMoeda = $ => parseFloat($).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
Vue.prototype.setProgress = (val, max) => {
  let percent = (max/val)
  if ( percent <= 1.25) {
      return "is-success";
  }else if ( percent <= 2.2) {
      return "is-warning";
  }else{
      return "is-danger";
  }
},
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
