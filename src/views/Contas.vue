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
      .box.box-list
        span.titulo(@click="PayConta(conta._id)") {{ conta.titulo }}
        .buttons.is-marginless.is-pulled-right
          b-button(type="is-danger" size="is-small" @click="DelConta(conta._id)" rounded)
            b-icon(pack="fa" icon="trash" size="is-small")
        span.is-pulled-right(style="margin-right: 25px;" @click="PayConta(conta._id)") R$ {{ converteMoeda(conta.valor) }}
  .divider
    b fixas
    hr
  .columns.is-mobile.is-centered(v-for="conta in contas.fixas")
    .column.is-11
      .box.box-list
        span.titulo(@click="PayConta(conta._id)") {{ conta.titulo }}
        .buttons.is-marginless.is-pulled-right
          b-button(type="is-danger" size="is-small" @click="DelConta(conta._id)" rounded)
            b-icon(pack="fa" icon="trash" size="is-small")
        span.is-pulled-right(style="margin-right: 25px;" @click="PayConta(conta._id)") R$ {{ converteMoeda(conta.valor) }}
</template>

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
    async update(m,y){
      this.month = m
      this.year = y
      console.log(m,y)
      // this.UpdateContas()
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
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Conta exlcuida!",
            position: "is-bottom",
            type: "is-success"
          })
      });
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