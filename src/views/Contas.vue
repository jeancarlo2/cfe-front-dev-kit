<template lang="pug">
div
  Navbar(msg="Contas")
  Modal(:open.sync="AddConta" :close="CloseModal")
  br
  b-button(@click="AddConta = true" type="is-text" size="is-large").flutuante
    i.fa.fa-plus-circle.has-text-success.fa-3x
  .columns.is-mobile.is-centered
    .column.is-11
      .box.box-list
        span.titulo(@click="PayConta(1)") Conta de luz
        .buttons.is-marginless.is-pulled-right
          b-button(type="is-danger" size="is-small" @click="DelConta(1)" rounded)
            b-icon(pack="fa" icon="trash" size="is-small")
        span.is-pulled-right(style="margin-right: 25px;" @click="PayConta(1)") R$ 150,00
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Modal from "@/modal/Contas.vue";

export default {
  components: {
    Navbar,
    Modal
  },
  data() {
    return {
      AddConta: false
    };
  },
  methods: {
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