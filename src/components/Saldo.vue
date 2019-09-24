<template lang="pug">
div
    .hero(:class="(parseFloat(value)>=0)? 'is-success':'is-danger'")
        .hero-body
            .container
                h1.title.has-text-centered
                    small(style="float: left;opacity: .8;") R$
                    span {{ (value)? value : "0,00" }}
                h2.subtitle.has-text-centered(v-if="parseInt(more) == 1") saldo geral
        .hero-footer(v-if="parseInt(more) == 1")       
            p.has-text-centered
                router-link.button.is-text.has-text-white(to="lancamentos") ver lançamentos
    br
</template>
<script>
export default {
  props:{
      value: String,
      more: String
  }
}
</script>