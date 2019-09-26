<template lang="pug">
div
  Navbar(msg="Metas")
  Modal(:open.sync="AddMeta" :close="CloseModal")
  br
  b-button(@click="AddMeta = true" type="is-text" size="is-large").flutuante
    i.fa.fa-plus-circle.has-text-success.fa-3x
  .columns.is-mobile.is-centered(v-for="meta in metas")
      .column.is-11
        .box.box-list
          span.titulo(@click="AddFundos(meta)") {{meta.titulo}}
          .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelMeta(meta._id)")
            b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
          span.is-pulled-right
            span R${{ converteMoeda(meta.valor) }}
          div(@click="AddFundos(meta)")
            b-progress(:type="setProgress(meta.pago, meta.valor)" :value="meta.pago" :max="parseFloat(meta.valor)" size="is-normal" show-value) {{meta.pago}}/{{meta.valor}}
</template>
<style>
.progress-wrapper .progress-value {
  top: 15px !important;
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
      AddMeta: false,
      metas:''
    };
  },
  created() {
    this.updateMeta();
  },
  methods: {
    async updateMeta() {
      this.metas = await this.meta.get();
    },
    AddFundos(meta) {
      this.$buefy.dialog.prompt({
        message: `Adicionar fundos a meta ${meta.titulo}?`,
        confirmText: "Adicionar",
        cancelText: "Cancelar",
        inputAttrs: {
          type: "number",
          placeholder: "Valor",
          maxlength: meta.valor,
          min: 1,
          class: "is-rounded"
        },
        onConfirm: (valor) => {
          let data = {
            metaid: meta._id,
            titulo: `Meta: ${meta.titulo}`,
            valor: valor,
            tipo: 0
          };
          let toast = this.$buefy.toast;
          let up = this.updateMeta;
          $.post(this.api + `meta/pagar/${meta.userid}`, data).done(data => {
            up();
            toast.open({
              message: "Fundos adicionados!",
              position: "is-bottom",
              type: "is-success"
            });
          });
        }
      });
    },
    DelMeta(id) {
      this.$buefy.dialog.confirm({
        message: "Deseja apagar a meta #" + id + "?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        onConfirm: () =>{
          let toast = this.$buefy.toast
          let up = this.updateMeta
          $.post(this.api+`meta/delete/${id}`)
            .done(data=>{
              up()
              toast.open({
                message: "Meta exlcuida!",
                position: "is-bottom",
                type: "is-success"
              })
            })
        }
      });
    },
    CloseModal() {
      this.AddMeta = false;
      this.updateMeta()
    },
    setProgress(val, max) {
      let percent = max / val;
      if (percent <= 1.25) {
        return "is-success";
      } else if (percent <= 2.2) {
        return "is-warning";
      } else {
        return "is-danger";
      }
    }
  }
};
</script>