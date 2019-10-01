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
            .columns(v-for="cc in contas.parceladas")
              .column
                .bx(@click="pp(cc)" :class="cc.pago.length ? 'receita':''")
                  span.titulo {{ cc.titulo }}
                  span.is-pulled-right
                    span R${{ converteMoeda(cc.valor) }}
                  div
                    b-progress(:type="setProgress(cc.pagos.length*(cc.valor/cc.parcelas), cc.valor)" :value="cc.pagos.length*(cc.valor/cc.parcelas)" :max="parseFloat(cc.valor)" size="is-normal" show-value) {{ (cc.pagos.length)?cc.pagos.length:0 }} / {{cc.parcelas}}
            span.subtitle Contas
              b  Fixas
            hr
            .columns(v-for="cc in contas.fixas")
              .column
                .bx(@click="pc(cc)" :class="cc.pago.length ? 'receita':''")
                  span.titulo {{ cc.titulo }}
                  span.is-pulled-right
                    span R${{ converteMoeda(cc.valor) }}
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
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      contas:0,
      metas:0
    };
  },
  methods: {
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
    async UpdateContas(){
        this.contas  = await this.conta.get(this.month, this.year, 3)
        this.$parent.updateSaldo()
    },
    CloseModal() {
      this.AddConta = false;
      this.UpdateContas()
    },
  }
};
</script>