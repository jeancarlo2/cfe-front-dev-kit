<template lang="pug">
b-modal(:active="open" :on-cancel="close" full-screen :can-cancel="false")
    .box
        h1.subtitle.has-text-centered Adicionar Lançamento
        hr
        form
            b-field(label="Descrição")
                b-input(rounded)
            b-field(label="Valor")
                b-input(type="number" rounded)
            b-field(label="Tipo").has-text-white
                b-select(placeholder="Tipo" rounded expanded v-model="tipo")
                    option(value=0) Receita
                    option(value=1) Despesa
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
        return{
            tipo: 0
        }
    }
}
</script>