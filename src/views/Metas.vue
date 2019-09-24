<template lang="pug">
div
  Navbar(msg="Metas")
  Modal(:open.sync="AddMeta" :close="CloseModal")
  br
  b-button(@click="AddMeta = true" type="is-text" size="is-large").flutuante
    i.fa.fa-plus-circle.has-text-success.fa-3x
  .columns.is-mobile.is-centered
      .column.is-11
        .box.box-list
          span.titulo(@click="AddFundos(1)") Meta
          .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelMeta(conta._id)")
            b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
          span.is-pulled-right
            span R${{ converteMoeda(1) }}
          div(@click="AddFundos(1)")
            b-progress(:type="setProgress(10, 100)" :value="10" :max="100" size="is-normal" show-value) 1/10
</template>
<style>
.progress-wrapper .progress-value{
  top:15px!important
}
</style>
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