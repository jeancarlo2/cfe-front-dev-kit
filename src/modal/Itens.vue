<template lang="pug">
b-modal(:active="open" :on-cancel="close" full-screen :can-cancel="false")
    .box
        h1.subtitle.has-text-centered Adicionar Item
        hr
        form(@submit="create")
            b-field(label="Descrição")
                b-input(rounded v-model="titulo" required)
            b-field(label="Valor" )
                b-input(type="number" min="0.01" step="0.01" rounded required v-model="valor")
            hr
            .buttons(style="padding-bottom:10px;justify-content: center;")
                b-button(type="is-danger" rounded @click="close") Calcelar
                input.button.is-success.is-rounded(type="submit" value="Salvar")
</template>
<script>
export default {
    props: {
        open: Boolean,
        close: Function,
        listaid: String
    },
    methods:{
        create(){
            let data = {
                valor:      this.valor,
                titulo:     this.titulo,
            }
            let close = this.close
            $.post(this.api+'item/create/'+this.listaid, data)
                .done(function(data){
                    close()
                })
        }
    },
    data(){
        return{
            tipo: 1,
            titulo: '',
            valor: 0
        }
    }
}
</script>