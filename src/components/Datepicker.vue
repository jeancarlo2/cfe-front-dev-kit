<template lang="pug">
  form#date-picker
    b-field
        .control.is-expanded
            b-select(v-model="mes" :change="submit()" expanded size="is-normal")
                option(v-for="(m, i) in meses" :value="i") {{ m }}
        .control
            b-select(v-model="ano" :change="submit()" expanded size="is-normal")
                option(v-for="a in anos" :value="a") {{ a }}
        //- .control.is-expanded
        //-   input.button.is-success.is-rounded(type="submit" value="Salvar")
        //-   b-button.is-fullwidth(size="is-normal" type="is-info" @click="update(mes,ano)") Ir
</template>
<script>
export default {
  props: {
    update: Function,
  },
  methods:{
    submit(){
      this.update(this.mes,this.ano)
    }
  },
  created(){
      for(let i = 2017; i < 2022; i++) {
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