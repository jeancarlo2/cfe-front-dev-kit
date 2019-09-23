<template lang="pug">
b-modal(:active="open" :on-cancel="close" full-screen :can-cancel="false")
    .box
        h1.subtitle.has-text-centered Adicionar Lançamento
        hr
        form
            b-field(label="Descrição")
                b-input(rounded v-model="titulo")
            b-field(label="Valor" )
                b-input(type="number" step="0.01" rounded v-model="valor")
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
                valor:      this.valor,
                tipo:       this.tipo,
                titulo:     this.titulo,
                conta:      false,
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
            tipo: 1,
            titulo: '',
            valor: 0
        }
    }
}
</script>