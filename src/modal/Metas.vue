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
            b-field(label="Icone")
                .buttons#select-icon(style="padding-bottom:10px;justify-content: center;")
                    b-button(@click="Icon = 'user'"     :type="AddIcon('user')")
                        b-icon(pack="fas" icon="user")
                    b-button(@click="Icon = 'home'"     :type="AddIcon('home')")
                        b-icon(pack="fas" icon="home")
                    b-button(@click="Icon = 'cart'"     :type="AddIcon('cart')")
                        b-icon(pack="fas" icon="shopping-cart")
                    b-button(@click="Icon = 'mobile'"   :type="AddIcon('mobile')")
                        b-icon(pack="fas" icon="mobile-alt")
                    b-button(@click="Icon = 'film'"     :type="AddIcon('film')")
                        b-icon(pack="fas" icon="film")
                    b-button(@click="Icon = 'hospital'" :type="AddIcon('hospital')")
                        b-icon(pack="fas" icon="hospital")
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
            Icon: false,
            AddIcon(icon){
                if(icon == this.Icon) return "is-info";
                else return "";
            },
        }
    }
}
</script>