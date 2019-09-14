<template lang="pug">
nav.navbar.is-success
  .navbar-brand
    a.navbar-item(href="/home")
      b-icon(pack="fas" icon="chart-line")
      span(style="margin-left:10px") {{ msg }}
    a.navbar-burger
      span
      span
      span
  .navbar-menu
    .navbar-end
      a.navbar-item(href="lancamentos")
        span.icon.is-small.is-left
          i.fa.fa-wallet
        span(style="margin-left:10px") Lançamentos
      a.navbar-item(href="contas")
        span.icon.is-small.is-left
          i.fa.fa-receipt
        span(style="margin-left:10px") Contas
      a.navbar-item(href="metas")
        span.icon.is-small.is-left
          i.fa.fa-piggy-bank
        span(style="margin-left:10px") Metas
      a.navbar-item(href="relatorios")
        span.icon.is-small.is-left
          i.fa.fa-chart-line
        span(style="margin-left:10px") Relatórios
      a.navbar-item(href="conta")
        span.icon.is-small.is-left
          i.fa.fa-user
        span(style="margin-left:10px") Minha conta
</template>

<script>
$(document).ready(function() {
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});
export default {
  name: 'Navbar',
  props: {
    msg: String
  }
}
</script>