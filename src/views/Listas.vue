<template lang="pug">
div
    Navbar(msg="Listas")
    Modal(:open.sync="AddLista" :close="CloseModal")
    Share(:open.sync="Share" :listaid.sync="listaid" :close="CloseShare")
    br
    b-button(@click="AddLista = true" type="is-text" size="is-large").flutuante
        i.fa.fa-plus-circle.has-text-success.fa-3x
    .columns.is-mobile.is-centered(v-for="lista in listas")
        .column.is-11
            .box.box-list
                span.titulo(@click="OpenLista(lista._id)") {{lista._id}}# {{ lista.titulo }}
                .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelLista(lista._id)")
                    b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
                .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="Share = true; listaid = parseFloat(lista._id)")
                    b-icon(pack="fa" icon="share" type="is-info" size="is-small")
    .divider
      b Compartilhadas
      hr
    .columns.is-mobile.is-centered(v-for="lista in lista_shared")
        .column.is-11
            .box.box-list
                span.titulo(@click="OpenLista(lista.listaid)") {{lista.listaid}}# {{ lista.titulo }}
                .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelListaShare(lista._id)")
                    b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
</template>
<style>
.progress-wrapper .progress-value{
  top:15px!important
}
</style>
<script>
import Navbar     from "@/components/Navbar.vue";
import Modal      from "@/modal/Listas.vue";
import Share      from "@/modal/Compartilhar.vue";
export default {
  components: {
    Navbar,
    Modal,
    Share
  },
  data() {
    return {
      AddLista: false,
      listas: false,
      lista_shared: false,
      Share: false,
      listaid:0
    };
  },
  created(){
    this.UpdateListas()
  },
  methods: {
    async UpdateListas(){
        this.listas  = await this.lista.get()
        this.lista_shared = await this.lista.getShared()
    },
    OpenLista(id){
      this.$router.push("lista/"+id)
    },
    CloseModal() {
      this.AddLista = false
      this.UpdateListas()
    },
    CloseShare() {
      this.Share = false;
      this.UpdateListas()
    },
    DelListaShare(id){
      this.$buefy.dialog.confirm({
        message: "Deseja apagar a lista compartilhada?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        onConfirm: () =>{
          let toast = this.$buefy.toast
          let up = this.UpdateListas
          $.post(this.api+`lista/delete/shared/${id}`)
            .done(data=>{
              up()
              toast.open({
                message: "Lista exlcuida!",
                position: "is-bottom",
                type: "is-success"
              })
            })
        }
      });
    },
    DelLista(id) {
      this.$buefy.dialog.confirm({
        message: "Deseja apagar a lista #" + id + "?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        onConfirm: () =>{
          let toast = this.$buefy.toast
          let up = this.UpdateListas
          $.post(this.api+`lista/delete/${id}`)
            .done(data=>{
              up()
              toast.open({
                message: "Lista exlcuida!",
                position: "is-bottom",
                type: "is-success"
              })
            })
        }
      });
    }
  }
};
</script>