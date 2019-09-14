<template lang="pug">
.container
    .columns.is-vcentered.is-centered.is-mobile#login
        .column.is-10
            h1.title.has-text-centered
                b-icon(pack="fas" icon="chart-line")
                span(style="margin-left:15px") CFE
            form
                .field
                    p.control.has-icons-left
                        input.input.is-medium.is-rounded(type="text" placeholder="Nome")
                        span.icon.is-small.is-left
                            i.fa.fa-user
                .field
                    p.control.has-icons-left
                        input.input.is-medium.is-rounded(type="email" placeholder="Email")
                        span.icon.is-small.is-left
                            i.fa.fa-at
                .field
                    p.control.has-icons-left
                        input.input.is-medium.is-rounded(type="password" placeholder="Senha")
                        span.icon.is-small.is-left
                            i.fa.fa-lock
                .field
                    p.control.has-icons-left
                        input.input.is-medium.is-rounded(type="password" placeholder="Repetir Senha")
                        span.icon.is-small.is-left
                            i.fa.fa-lock
                .field
                    p.control.is-expanded
                        .buttons
                            router-link.button.is-success.is-fullwidth.is-rounded(to="/dashboard") Enviar
                            button.button.is-info.is-fullwidth.is-rounded Registrar com facebook
                    p.is-fullwidth.has-text-centered
                        small ou
                    router-link.button.is-text.is-fullwidth.is-rounded(to="/") Entrar
</template>
<style lang="css" scoped>
    #login{
        padding:40px;
        min-height: 100vh;
    }
</style>