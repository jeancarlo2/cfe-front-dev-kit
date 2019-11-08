<template lang="pug">
div
    Navbar(msg="Listas")
    Modal(:open.sync="AddLista" :close="CloseModal")
    br
    b-button(@click="AddLista = true" type="is-text" size="is-large").flutuante
        i.fa.fa-plus-circle.has-text-success.fa-3x
    .columns.is-mobile.is-centered(v-for="lista in listas")
        .column.is-11
            .box.box-list
                span.titulo(@click="OpenLista(lista._id)") {{lista._id}}# {{ lista.titulo }}
                .buttons.is-pulled-right(style="margin-left:10px;margin-botton:5px!important" @click="DelLista(lista._id)")
                    b-icon(pack="fa" icon="trash" type="is-danger" size="is-small")
                //- div(@click="pp(cc)")
                    //- b-progress(:type="setProgress(cc.pagos.length*(cc.valor/cc.parcelas), cc.valor)" :value="cc.pagos.length*(cc.valor/cc.parcelas)" :max="parseFloat(cc.valor)" size="is-normal" show-value) {{ (cc.pagos.length)?cc.pagos.length:0 }} / {{cc.parcelas}}
</template>
<style>
.progress-wrapper .progress-value{
  top:15px!important
}
</style>
<script>
import Navbar     from "@/components/Navbar.vue";
import Modal      from "@/modal/Listas.vue";
export default {
  components: {
    Navbar,
    Modal
  },
  data() {
    return {
      AddLista: false,
      listas: false,
    };
  },
  created(){
    this.UpdateListas()
  },
  methods: {
    async UpdateListas(){
        this.listas  = await this.lista.get()
    },
    OpenLista(id){
      this.$router.push("lista/"+id)
    },
    CloseModal() {
      this.AddLista = false
      this.UpdateListas()
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