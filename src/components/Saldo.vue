<template lang="pug">
div
    .hero.is-success
        .hero-body
            .container
                h1.title.has-text-centered
                    small(style="float: left;opacity: .8;") R$
                    span 1324,22
                h2.subtitle.has-text-centered saldo geral
    br
</template>
<script>
export default {
  name: 'Saldo'
}
</script>