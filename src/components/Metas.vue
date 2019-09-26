<template lang="pug">
.columns.is-centered.is-mobile
    Modal(:open.sync="AddMeta" :close="CloseModal")
    .column.is-11
        .box
            span.subtitle Metas
            b-button(@click="AddMeta = true" style="float: right;" type="is-text")
                b-icon.has-text-success(pack="fa" icon="plus-circle")
            hr
            .columns.is-mobile(v-for="meta in metas")
              .column
                span.titulo(@click="AddFundos(meta)") {{meta.titulo}}
                span.is-pulled-right
                  span R${{ converteMoeda(meta.valor) }}
                div(@click="AddFundos(meta)")
                  b-progress(:type="setProgress(meta.pago, meta.valor)" :value="meta.pago" :max="parseFloat(meta.valor)" size="is-normal" show-value) {{meta.pago}}/{{meta.valor}}
            br
            hr
            p.has-text-centered
                router-link.button.is-text(to="metas") ver metas
</template>
<script>
import Modal from "@/modal/Metas.vue";
export default {
  components: {
    Modal
  },
  created(){
    this.updateMeta()
  },
  data() {
      return {
        AddMeta:false,
        metas:''
      }
    },
  methods: {
    async updateMeta() {
      this.metas = await this.meta.get(3);
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
            titulo: `Meta:${meta.titulo}`,
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
    CloseModal(){
      this.AddMeta = false
      this.updateMeta()
    },
    setProgress(val) {
      if (val < 40) {
        return "is-danger";
      } else if (val > 40 && val < 65) {
        return "is-warning";
      } else {
        return "is-success";
      }
    }
  }
};
</script>