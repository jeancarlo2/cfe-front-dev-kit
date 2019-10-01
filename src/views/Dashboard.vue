<template lang="pug">
div
  Navbar(msg="Dashboard")
  Saldo(:value="(saldo)?saldo:null" more=1)
  Contas
  Metas
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Saldo  from '@/components/Saldo.vue'
import Contas from '@/components/Contas.vue'
import Metas  from '@/components/Metas.vue'
export default {
  data(){
    return {
      saldo:false,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      contas:0,
      metas:0
    }
  },
  async created() {
      if(!this.usuario()) this.$router.push("/");
      this.updateSaldo()
  },
  methods:{
    async updateSaldo(){
      this.saldo  = await this.lancamento.saldo(this.month, this.year)
      this.saldo  = this.converteMoeda(this.saldo)
    },
  },
  components: {
    Navbar,
    Saldo,
    Contas,
    Metas
  }
}
</script>
