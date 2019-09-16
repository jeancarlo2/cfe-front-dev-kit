<template lang="pug">
div
  Navbar(msg="Metas")
  Modal(:open.sync="AddMeta" :close="CloseModal")
  br
  b-button(@click="AddMeta = true" type="is-text" size="is-medium").flutuante
    b-icon(pack="fa" icon="plus-circle" size="is-large" type="is-success")
  .columns.is-mobile.is-centered
    .column.is-11
      .box.box-list
        b-icon(pack="fa" icon="shopping-cart")
        span.titulo Tênis para correr
        .buttons.is-marginless.is-pulled-right
          b-button(type="is-danger" size="is-small" @click='DelMeta(1)' rounded)
            b-icon(pack="fa" icon="trash" size="is-small")
          b-button(type="is-success" size="is-small" @click='AddFundos(1)' rounded)
            b-icon(pack="fa" icon="money-bill-alt" size="is-small")
        b-progress(:type="setProgress(60, 100)" :value="60" :max="100" size="is-medium" show-value) 60 / 100
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Modal from "@/modal/Metas.vue";
export default {
  components: {
    Navbar,
    Modal
  },
  data() {
      return {
        AddMeta:false
      }
    },
  methods: {
    AddFundos(id){
      this.$buefy.dialog.prompt({
          message: `Adicionar fundos a meta #${id}?`,
          confirmText: "Adicionar",
          cancelText: "Cancelar",
          inputAttrs: {
              type: 'number',
              placeholder: 'Valor',
              maxlength: 99999,
              min: 1,
              class:'is-rounded'
          },
          onConfirm: (value) => this.$buefy.toast.open({
            message: "Fundos adicionados!",
            position: "is-bottom",
            type: "is-success"
          })
      })
    },
    DelMeta(id) {
      this.$buefy.dialog.confirm({
        message: "Deseja apagar a meta #" + id + "?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Meta exlcuida!",
            position: "is-bottom",
            type: "is-success"
          })
      });
    },
    CloseModal(){
      this.AddMeta = false
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
    }
  }
};
</script>