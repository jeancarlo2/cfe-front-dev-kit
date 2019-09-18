<template lang="pug">
div
    .hero.is-success
        .hero-body
            .container
                h1.title.has-text-centered
                    small(style="float: left;opacity: .8;") R$
                    span {{ (value)? value : "0,00" }}
                h2.subtitle.has-text-centered saldo geral
        .hero-footer        
            p.has-text-centered
                router-link.button.is-text.has-text-white(to="lancamentos") ver lançamentos
    br
</template>
<script>
export default {
  props:{
      value: String
  }
}
</script>