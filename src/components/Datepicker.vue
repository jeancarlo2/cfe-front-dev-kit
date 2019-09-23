<template lang="pug">
    //- button.is-primary.is-outlined.is-rounded.button.is-fullwidth.is-uppercase(@click="$refs.datepicker.toggle()")
    //-     span.subtitle {{ meses[mes] }} / {{ ano }}
    //- b-datepicker#datepicker(@change-year="trocaAno" @change-month="trocaMes" ref="datepicker" type="month" icon-pack="fas" icon-prev="angle-double-left" icon-next="angle-double-right" :month-names="meses")
    b-field
        .control.is-expanded
            b-select(v-model="mes" :change="trocaMes(mes)" expanded size="is-medium")
                option(v-for="(m, i) in meses" :value="i") {{ m }}
        .control.is-expanded
            b-select(v-model="ano" :change="trocaAno(ano)" expanded size="is-medium" )
                option(v-for="a in anos" :value="a") {{ a }}
</template>
<script>
export default {
  props: {
    trocaAno: Function,
    trocaMes: Function
  },
  created(){
      for(let i = 2017; i < 2021; i++) {
          this.anos.push(i)
      }
  },
  data() {
    return {
      mes: new Date().getMonth(),
      ano: new Date().getFullYear(),
      meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      anos: [],
    };
  }
};
</script>