<template lang="pug">
div
  Navbar(msg="Dashboard")
  Saldo
  Contas
  Metas
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Saldo  from '@/components/Saldo.vue'
import Contas from '@/components/Contas.vue'
import Metas  from '@/components/Metas.vue'
export default {
  name: 'dashboard',
  components: {
    Navbar,
    Saldo,
    Contas,
    Metas
  }
}
</script>
