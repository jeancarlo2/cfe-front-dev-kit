<template lang="pug">
nav.navbar.is-success
  .navbar-brand
    router-link.navbar-item(:to="{ name: 'dashboard'}")
      b-icon(pack="fas" icon="chart-line")
      span(style="margin-left:10px") CFE - {{ msg }}
    a.navbar-burger(v-on:click="togglemenu()")
      span
      span
      span
  .navbar-menu.has-background-success
    .navbar-end
      router-link.navbar-item.has-text-white(:to="{ name:'lancamentos' }")
        span.icon.is-small.is-left
          i.fa.fa-wallet
        span(style="margin-left:10px") Lançamentos
      router-link.navbar-item.has-text-white(:to="{ name:'contas' }")
        span.icon.is-small.is-left
          i.fa.fa-receipt
        span(style="margin-left:10px") Contas
      router-link.navbar-item.has-text-white(:to="{ name:'metas' }")
        span.icon.is-small.is-left
          i.fa.fa-piggy-bank
        span(style="margin-left:10px") Metas
      router-link.navbar-item.has-text-white(:to="{ name:'listas' }")
        span.icon.is-small.is-left
          i.fa.fa-clipboard-list
        span(style="margin-left:10px") Listas
      router-link.navbar-item.has-text-white(:to="{ name:'relatorios' }")
        span.icon.is-small.is-left
          i.fa.fa-chart-line
        span(style="margin-left:10px") Relatórios
      router-link.navbar-item.has-text-white(:to="{ name:'conta'}")
        span.icon.is-small.is-left
          i.fa.fa-user
        span(style="margin-left:10px") Minha conta
      a.navbar-item.has-text-white(v-on:click="sair()")
        span.icon.is-small.is-left
          i.fas.fa-sign-out-alt
        span(style="margin-left:10px") Sair
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  created() {
      if(!Cookies.getJSON('usuario')) this.$router.push("/");
  },
  methods: {
    sair(){
      Cookies.remove('usuario')
      this.$router.push("/");
    },
    togglemenu: function () {
      // eslint-disable-next-line
      $(".navbar-burger").toggleClass("is-active");
      // eslint-disable-next-line
      $(".navbar-menu").toggleClass("is-active");
    }
  }
}
</script>