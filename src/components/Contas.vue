<template lang="pug">
.columns.is-centered.is-mobile
    Modal(:open.sync="AddConta" :close="CloseModal")
    .column.is-11
        .box
            span.subtitle Contas
              b  Parceladas
            b-button(@click="AddConta = true" type="is-text" style="float: right;")
                b-icon.has-text-success(pack="fa" icon="plus-circle")
            hr
            .columns(v-for="conta in contas.parceladas")
              .column
                span.titulo(@click="PayParcela(conta)") {{ conta.titulo }}
                //- .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelConta(conta._id)")
                //-   b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
                span.is-pulled-right
                  span R${{ converteMoeda(conta.valor) }}
                div(@click="PayParcela(conta)")
                  b-progress(:type="setProgress(conta.pagos.length*(conta.valor/conta.parcelas), conta.valor)" :value="conta.pagos.length*(conta.valor/conta.parcelas)" :max="parseFloat(conta.valor)" size="is-normal" show-value) {{ (conta.pagos.length)?conta.pagos.length:0 }} / {{conta.parcelas}}
            span.subtitle Contas
              b  Fixas
            hr
            .columns(v-for="conta in contas.fixas")
              .column
                span.titulo(@click="PayParcela(conta)") {{ conta.titulo }}
                //- .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelConta(conta._id)")
                //-   b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
                span.is-pulled-right
                  span R${{ converteMoeda(conta.valor) }}
            p.has-text-centered
                router-link.button.is-text(to="contas") ver contas
</template>
<script>
import Modal from "@/modal/Contas.vue";
export default {
  created(){
      this.UpdateContas()
  },
  components: {
    Modal
  },
  data() {
    return {
      AddConta: false,
      usuario: Cookies.getJSON('usuario'),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      contas:0,
      metas:0
    };
  },
  methods: {
       async UpdateContas(){
        this.contas  = await this.conta.get(this.month, this.year, 3)
        this.$parent.updateSaldo()
    },
      setProgress(val, max) {
      let percent = (max/val)
      if ( percent <= 1.25) {
          return "is-success";
      }else if ( percent <= 2.2) {
          return "is-warning";
      }else{
          return "is-danger";
      }
    },
    PayParcela(conta) {
      if(conta.pago.length == conta.parcelas) return false;
      this.$buefy.dialog.confirm({
        title: conta.titulo+" - R$"+this.converteMoeda(conta.valor),
        message:`${conta.parcelas} parcelas de <b>R$ ${this.converteMoeda(conta.valor/conta.parcelas)}</b><br>${conta.pago.length} parcelas pagas`,
        confirmText: "Pagar parcela",
        cancelText: "Cancelar",
        type: "is-success",
        onConfirm: ()=>{
          let data = {
            contaid: conta._id,
            titulo: `${conta.titulo} - Parcela ${conta.pago.length+1}`,
            valor: conta.valor/conta.parcelas,
            tipo:0
          }
          let toast = this.$buefy.toast
          let up = this.UpdateContas
          $.post(this.api+`conta/pagar/${conta.userid}`, data)
            .done(data=>{
              up()
              toast.open({
                message: "Parcela paga!",
                position: "is-bottom",
                type: "is-success"
              })
            })
        }
      });
    },
    CloseModal() {
      this.AddConta = false;
      this.UpdateContas()
    },
    PayConta(id) {
      this.$buefy.dialog.confirm({
        message: "Deseja pagar a conta #" + id + "?",
        confirmText: "Pagar",
        cancelText: "Cancelar",
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Conta paga!",
            position: "is-bottom",
            type: "is-success"
          })
      });
    }
  }
};
</script>