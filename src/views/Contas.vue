<template lang="pug">
div
  Navbar(msg="Contas")
  Modal(:open.sync="AddConta" :close="CloseModal")
  br
  b-button(@click="AddConta = true" type="is-text" size="is-large").flutuante
    i.fa.fa-plus-circle.has-text-success.fa-3x
  br
  .columns.is-mobile.is-centered
    .column.is-11(style="padding-top: 0;")
      Datepicker(:update="update")
  .divider
    b parceladas
    hr
  .columns.is-mobile.is-centered(v-for="cc in contas.parceladas")
    .column.is-11
      .box.box-list(:class="cc.pago.length ? 'receita':''")
        span.titulo(@click="pp(cc)") {{ cc.titulo }}
        .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelConta(cc._id)")
          b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
        span.is-pulled-right(@click="pp(cc)")
          span R${{ converteMoeda(cc.valor) }}
        div(@click="pp(cc)")
          b-progress(:type="setProgress(cc.pagos.length*(cc.valor/cc.parcelas), cc.valor)" :value="cc.pagos.length*(cc.valor/cc.parcelas)" :max="parseFloat(cc.valor)" size="is-normal" show-value) {{ (cc.pagos.length)?cc.pagos.length:0 }} / {{cc.parcelas}}
  .divider
    b fixas
    hr
  .columns.is-mobile.is-centered(v-for="cc in contas.fixas")
    .column.is-11
      .box.box-list(:class="cc.pago.length ? 'receita':''")
        span.titulo(@click="pc(cc)") {{ cc.titulo }}
        .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelConta(cc._id)")
          b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
        span.is-pulled-right(style="margin-right: 25px;" @click="pp(cc)") R$ {{ converteMoeda(cc.valor) }}
</template>
<style>
.progress-wrapper .progress-value{
  top:15px!important
}
</style>
<script>
import Navbar     from "@/components/Navbar.vue";
import Datepicker from "@/components/Datepicker.vue";
import Modal      from "@/modal/Contas.vue";

export default {
  components: {
    Datepicker,
    Navbar,
    Modal
  },
  data() {
    return {
      AddConta: false,
      contas: false,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
  },
  created(){
    this.UpdateContas()
  },
  methods: {
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
    async update(m,y){
      this.month = m
      this.year = y
      console.log(m,y)
      this.UpdateContas()
    },
    async UpdateContas(){
        this.contas  = await this.conta.get(this.month, this.year)
    },
    CloseModal() {
      this.AddConta = false;
    },
    DelConta(id) {
      this.$buefy.dialog.confirm({
        message: "Deseja apagar a conta #" + id + "?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        onConfirm: () =>{
          let toast = this.$buefy.toast
          let up = this.UpdateContas
          $.post(this.api+`conta/delete/${id}`)
            .done(data=>{
              up()
              toast.open({
                message: "Conta exlcuida!",
                position: "is-bottom",
                type: "is-success"
              })
            })
        }
      });
    },
    // Pagar parcela
    async pp(cc){
      let p = await this.conta.PayParcela(cc)
      if(p) this.UpdateContas()
    },
    // Pagar conta
    async pc(cc){
      let p = await this.conta.PayConta(cc)
      if(p) this.UpdateContas()
    },
  }
};
</script>