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
  .columns.is-mobile.is-centered(v-for="conta in contas.parceladas")
    .column.is-11
      .box.box-list(:class="conta.pago.length ? 'receita':''")
        span.titulo(@click="pp(conta)") {{ conta.titulo }}
        .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelConta(conta._id)")
          b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
        span.is-pulled-right(@click="pp(conta)")
          span R${{ converteMoeda(conta.valor) }}
        div(@click="pp(conta)")
          b-progress(:type="setProgress(conta.pagos.length*(conta.valor/conta.parcelas), conta.valor)" :value="conta.pagos.length*(conta.valor/conta.parcelas)" :max="parseFloat(conta.valor)" size="is-normal" show-value) {{ (conta.pagos.length)?conta.pagos.length:0 }} / {{conta.parcelas}}
  .divider
    b fixas
    hr
  .columns.is-mobile.is-centered(v-for="conta in contas.fixas")
    .column.is-11
      .box.box-list(:class="conta.pago.length ? 'receita':''")
        span.titulo(@click="pp(conta)") {{ conta.titulo }}
        .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelConta(conta._id)")
          b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
        span.is-pulled-right(style="margin-right: 25px;" @click="pp(conta)") R$ {{ converteMoeda(conta.valor) }}
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