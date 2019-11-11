<template lang="pug">
div
    Navbar(:msg="title")
    Modal(:open.sync="AddItem" :close="CloseModal" :listaid="listaid")
    b-button(@click="AddItem = true" type="is-text" size="is-large").flutuante
        i.fa.fa-plus-circle.has-text-success.fa-3x
    br
    .columns.is-mobile.is-centered(v-for="it in itens")
        .column.is-11
            .box.box-list(:class="it.pago.length ? 'receita':''")
                span.titulo(@click="Pagar(it)") {{ it.titulo }}
                .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelItem(it._id)")
                    b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
                span.is-pulled-right(style="margin-right: 25px;" @click="Pagar(it)") R$ {{ converteMoeda(it.valor) }}
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Modal from "@/modal/Itens.vue";

export default {
  components: {
    Navbar,
    Modal
  },
  data() {
    return {
        title: "",
        listaid: this.$route.params.id,
        AddItem: false,
        itens:[]
    };
  },
  created() {
    this.title = "Lista #" + this.listaid;
    this.UpdateItens();
  },
  methods: {
    async UpdateItens() {
      this.itens = await this.lista.itens(this.listaid);
    },
    CloseModal() {
      this.AddItem = false;
      this.UpdateItens();
    },
    Pagar(item) {
        if(item.pago.length){
            this.$buefy.toast.open({
                message: "Este item já foi pago!",
                position: "is-bottom",
                type: "is-warning"
            })
            return false
        }
      this.$buefy.dialog.confirm({
        message: `Pagar o item: ${item.titulo}?`,
        confirmText: "Pagar",
        cancelText: "Cancelar",
        // inputAttrs: {
        //   type: "number",
        //   placeholder: "Valor",
        //   maxlength: item.valor,
        //   min: 1,
        //   class: "is-rounded"
        // },
        onConfirm: (valor) => {
          let data = {
            itemid: item._id,
            titulo: `Item: ${item.titulo}`,
            valor: item.valor,
            tipo: 0
          };
          let toast = this.$buefy.toast;
          let up = this.UpdateItens;
          $.post(this.api + `item/pagar/${this.usuario()._id}`, data).done(data => {
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
    DelItem(id) {
      this.$buefy.dialog.confirm({
        message: "Deseja apagar o item #" + id + "?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        onConfirm: () => {
          let toast = this.$buefy.toast;
          let up = this.UpdateItens;
          $.post(this.api + `item/delete/${id}`).done(data => {
            up();
            toast.open({
              message: "Item exlcuido!",
              position: "is-bottom",
              type: "is-success"
            });
          });
        }
      });
    }
  }
};
</script>