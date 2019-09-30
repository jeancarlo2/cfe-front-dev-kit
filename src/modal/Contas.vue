<template lang="pug">
b-modal(:active="open" :on-cancel="close" full-screen :can-cancel="false")
    .box
        h1.subtitle.has-text-centered Adicionar Conta
        hr
        form(@submit="create")
            b-field(label="Descrição")
                b-input(rounded v-model="titulo" required)
            b-field(label="Valor")
                b-input(type="number" v-model="valor" min="0.01" step="0.01" rounded required)
            b-field(label="Tipo").has-text-white
                b-select(placeholder="Tipo de parcela" rounded expanded v-model="tipo")
                    option(value=0) Fixa
                    option(value=1) Parcelada
            b-field(label="Parcelas" v-if="tipo > 0" v-model="valor")
                b-input(type="number" min="1" v-model="parcelas" required rounded)
            hr
            .buttons(style="padding-bottom:10px;justify-content: center;")
                b-button(type="is-danger" rounded @click="close") Calcelar
                input.button.is-success.is-rounded(type="submit" value="Salvar")
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
                parcelas:   this.parcelas
            }
            let close = this.close
            console.log(data) 
            $.post(this.api+'conta/create/'+this.usuario()._id, data)
                .done(function(data){
                    close()
                })
        }
    },
    data(){
        return{
            parcelas: 0,
            tipo: 0,
            titulo: '',
            valor: 0
        }
    }
}
</script>