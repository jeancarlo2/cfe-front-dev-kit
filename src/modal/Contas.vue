<template lang="pug">
b-modal(:active="open" :on-cancel="close" full-screen :can-cancel="false")
    .box
        h1.subtitle.has-text-centered Adicionar Conta
        hr
        form
            b-field(label="Descrição")
                b-input(rounded)
            b-field(label="Valor")
                b-input(type="number" rounded)
            b-field(label="Tipo").has-text-white
                b-select(placeholder="Tipo de parcela" rounded expanded v-model="parcela")
                    option(value=0) Fixa
                    option(value=1) Parcelada
            b-field(label="Parcelas" v-if="parcela > 0")
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
        return{
            parcela: 0
        }
    }
}
</script>