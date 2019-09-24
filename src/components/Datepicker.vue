<template lang="pug">
    b-field
        .control.is-expanded
            b-select(v-model="mes" expanded size="is-medium")
                option(v-for="(m, i) in meses" :value="i") {{ m }}
        .control
            b-select(v-model="ano" expanded size="is-medium" )
                option(v-for="a in anos" :value="a") {{ a }}
        .control.is-expanded
          b-button.is-fullwidth(size="is-medium" type="is-info" @click="update(mes,ano)") Ir
</template>
<script>
export default {
  props: {
    update: Function,
  },
  created(){
      for(let i = 2017; i < 2021; i++) {
          this.anos.push(i)
      }
  },
  data() {
    return {
      meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      anos: [],
      mes: new Date().getMonth(),
      ano: new Date().getFullYear(),
    };
  }
};
</script>