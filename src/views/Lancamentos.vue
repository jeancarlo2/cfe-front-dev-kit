<template lang="pug">
div
  Navbar(msg="Lançamentos")
  br
  .columns.is-mobile.is-centered
    .column.is-6
      h1.has-text-centered.is-uppercase(@click="$refs.datepicker.toggle()")
        span.subtitle {{ meses[month] }}
        span.subtitle /
        span.subtitle {{ year }}
      b-datepicker#datepicker(@change-year="trocaAno" @change-month="trocaMes" ref="datepicker" type="month" icon-pack="fas" icon-prev="angle-double-left" icon-next="angle-double-right" :month-names="meses")
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar,
  },
  methods:{
    trocaMes(m){
      this.month = m
    },
    trocaAno(y){
      this.year = y
    }
  },
  data(){
    return{
      month:  new Date().getMonth(),
      year: new Date().getFullYear(),
      meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    }
  }
}
</script>