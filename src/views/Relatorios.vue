<template lang="pug">
div
    Navbar(msg="Relatórios")
    br
    .columns.is-mobile.is-centered
        .column.is-11(style="padding-top: 0;")
            Datepicker(:update="update")
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Datepicker from '@/components/Datepicker.vue'
export default {
  components: {
    Navbar,
    Datepicker
  },
  methods:{
    async update(m,y){
        this.month = m
        this.year = y
        console.log(m,y)
    },
    async UpdateContas(){
        this.contas  = await this.conta.get(this.month, this.year)
    }
  }
}
</script>