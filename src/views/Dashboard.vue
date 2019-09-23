<template lang="pug">
div
  Navbar(msg="Dashboard")
  Saldo(:value="usuario.saldo" more=1)
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
      usuario: Cookies.getJSON('usuario')
    }
  },
  created() {
      console.log(this.usuario)
      if(!this.usuario) this.$router.push("/");

  },
  components: {
    Navbar,
    Saldo,
    Contas,
    Metas
  }
}
</script>
