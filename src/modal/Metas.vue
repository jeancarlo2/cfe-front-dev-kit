<template lang="pug">
b-modal(:active="open" :on-cancel="close" :can-cancel="false" full-screen)
    .box
        h1.subtitle.has-text-centered Adicionar Meta
        hr
        form
            b-field(label="Descrição")
                b-input(rounded)
            b-field(label="Valor")
                b-input(type="number" rounded)
            hr
            .buttons(style="padding-bottom:10px;justify-content: center;")
                b-button(type="is-danger" rounded @click="close") Calcelar
                b-button(type="is-success" rounded) Salvar
</template>

<script>
export default {
    props: {
        open: Boolean,
        close: Function
    },
    data(){
        return {
        
        }
    }
}
</script>