<template lang="pug">
b-modal(:active="open" :on-cancel="close" full-screen :can-cancel="false")
    .box
        h1.subtitle.has-text-centered Adicionar Lançamento
        hr
        form
            b-field(label="Descrição")
                b-input(rounded v-model="descricao")
            b-field(label="Valor" )
                b-input(type="number" rounded v-model="valor")
            b-field(label="Tipo").has-text-white
                b-select(placeholder="Tipo" rounded expanded v-model="tipo")
                    option(value=1) Receita
                    option(value=0) Despesa
            hr
            .buttons(style="padding-bottom:10px;justify-content: center;")
                b-button(type="is-danger" rounded @click="close") Calcelar
                b-button(type="is-success" rounded @click="create") Salvar
</template>
<script>
export default {
    props: {
        open: Boolean,
        close: Function
    },
    methods:{
        create(){
            let data = {
                descricao: this.descricao,
                valor: this.valor,
                tipo: this.tipo,
                conta: false,
            }
            let close = this.close
            $.post(this.api+'lancamento/create/'+this.usuario._id, data)
                .done(function(data){
                    close()
                })
        }
    },
    data(){
        return{
            usuario: Cookies.getJSON('usuario'),
            tipo: 1,
            descricao: '',
            valor: 0
        }
    }
}
</script>