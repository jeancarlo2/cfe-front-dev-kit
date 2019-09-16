<template lang="pug">
.columns.is-centered.is-mobile
    Modal(:open.sync="AddConta" :close="CloseModal")
    .column.is-11
        .box
            span.subtitle Contas
            b-button(@click="AddConta = true" type="is-text" style="float: right;")
                b-icon.has-text-success(pack="fa" icon="plus-circle")
            hr
            .columns.is-mobile
                .column.is-12(style="padding:5px 15px")
                    span.titulo Conta de luz
                    b-button.is-pulled-right(type="is-info" size="is-small" rounded @click="PayConta(1)") pagar
            hr
            p.has-text-centered
                router-link.button.is-text(to="contas") ver contas
</template>
<script>
import Modal from "@/modal/Contas.vue";
export default {
  components: {
    Modal
  },
  data() {
    return {
      AddConta: false,
    };
  },
  methods: {
    CloseModal() {
      this.AddConta = false;
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