<template lang="pug">
div
  Navbar(msg="Lançamentos")
  Modal(:open.sync="AddConta" :close="CloseModal")
  b-button(@click="AddConta = true" type="is-text" size="is-large").flutuante
    i.fa.fa-plus-circle.has-text-success.fa-3x
  br
  .columns.is-mobile.is-centered
    .column.is-10
      button.is-primary.is-outlined.is-rounded.button.is-fullwidth.is-uppercase(@click="$refs.datepicker.toggle()")
        span.subtitle {{ meses[month] }} / {{ year }}
      b-datepicker#datepicker(@change-year="trocaAno" @change-month="trocaMes" ref="datepicker" type="month" icon-pack="fas" icon-prev="angle-double-left" icon-next="angle-double-right" :month-names="meses")
  h1.subtitle.has-text-centered.is-uppercase Ainda não existem lançamentos
  //- .columns.is-mobile.is-centered
    .column.is-11
      .box.box-list
        span.titulo(@click="PayConta(1)") Conta de luz
        .buttons.is-marginless.is-pulled-right
          b-button(type="is-danger" size="is-small" @click="DelConta(1)" rounded)
            b-icon(pack="fa" icon="trash" size="is-small")
        span.is-pulled-right(style="margin-right: 25px;" @click="PayConta(1)") R$ 150,00
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Modal from "@/modal/Lancamentos.vue";
export default {
  components: {
    Navbar,
    Modal,
  },
  created(){
    console.log("oi")
  },
  methods:{
    CloseModal() {
      this.AddConta = false;
    },
    DelConta(id) {
      this.$buefy.dialog.confirm({
        message: "Deseja apagar o lançamento #" + id + "?",
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
    trocaMes(m){
      this.month = m
    },
    trocaAno(y){
      this.year = y
    }
  },
  data(){
    return{
      lancamentos: false,
      AddConta: false,
      month:  new Date().getMonth(),
      year:   new Date().getFullYear(),
      meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    }
  }
}
</script>