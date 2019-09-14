<template lang="pug">
nav.navbar.is-success
  .navbar-brand
    router-link.navbar-item(to="dashboard")
      b-icon(pack="fas" icon="chart-line")
      span(style="margin-left:10px") CFE - {{ msg }}
    a.navbar-burger(v-on:click="togglemenu()")
      span
      span
      span
  .navbar-menu
    .navbar-end
      router-link.navbar-item(to="lancamentos")
        span.icon.is-small.is-left
          i.fa.fa-wallet
        span(style="margin-left:10px") Lançamentos
      router-link.navbar-item(to="contas")
        span.icon.is-small.is-left
          i.fa.fa-receipt
        span(style="margin-left:10px") Contas
      router-link.navbar-item(to="metas")
        span.icon.is-small.is-left
          i.fa.fa-piggy-bank
        span(style="margin-left:10px") Metas
      router-link.navbar-item(to="relatorios")
        span.icon.is-small.is-left
          i.fa.fa-chart-line
        span(style="margin-left:10px") Relatórios
      router-link.navbar-item(to="conta")
        span.icon.is-small.is-left
          i.fa.fa-user
        span(style="margin-left:10px") Minha conta
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  methods: {
    togglemenu: function () {
      // eslint-disable-next-line
      $(".navbar-burger").toggleClass("is-active");
      // eslint-disable-next-line
      $(".navbar-menu").toggleClass("is-active");
    }
  }
}
</script>