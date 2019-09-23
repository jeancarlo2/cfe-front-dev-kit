<template lang="pug">
.container
    .columns.is-vcentered.is-centered.is-mobile#login
        .column.is-10
            h1.title.has-text-centered
                b-icon(pack="fas" icon="chart-line")
                span(style="margin-left:15px") CFE
            form(@submit="checkForm" v-on:submit.prevent)
                b-field
                    b-input(type="text" rounded required placeholder="Nome" size="is-medium" iconPack="fas" icon="user" v-model="nome")
                b-field
                    b-input(type="email" @blur="checkEmail" rounded required placeholder="Email" size="is-medium" iconPack="fas" icon="at" v-model="email")
                b-field
                    b-input(type="password" rounded required placeholder="Senha" size="is-medium" iconPack="fas" icon="lock" v-model="senha" password-reveal)
                .field
                    p.control.is-expanded
                        .buttons
                            input.button.is-success.is-fullwidth.is-rounded(type="submit")
                            //- button.button.is-info.is-fullwidth.is-rounded Registrar com facebook
                    p.is-fullwidth.has-text-centered
                        small ou
                    router-link.button.is-text.is-fullwidth.is-rounded(to="/") Entrar
</template>
<script>
export default {
    methods:{
        checkEmail(){
            if(!this.email) return false;
            let buefy = this.$buefy;
            let resetemail = () => {
                this.email = ''
            }
            $.post(this.api+'usuario/check-email/'+this.email).done(function(data){
                console.log(data)
                if(data.length){
                    buefy.dialog.alert({
                        type: 'is-danger',
                        message: 'Esse email já foi cadastrado!',
                        confirmText: 'Tentar novamente'
                    })
                   resetemail() 
                }
            })
        },
        checkForm(){
            let buefy = this.$buefy;
            let router = this.$router;
            $.post(this.api+'usuario/register/',{
                nome:this.nome,
                email: this.email,
                senha: this.senha
            }).done(function(data){
                console.log(data)
                if(data.length){
                    buefy.dialog.alert({
                        type: 'is-success',
                        message: 'Cadastro efetuado com sucesso!',
                        confirmText: 'Fazer login',
                        onConfirm(){
                            router.push("/")
                        }
                    })
                }else{
                    buefy.dialog.alert({
                        type: 'is-danger',
                        message: 'Erro ao cadastrar, tente novamente.',
                        confirmText: 'Ok',
                        onConfirm(){
                            router.push("registrar")
                        }
                    })
                }
            })
        }
    },
    data(){
        return{
            nome:'',
            email:'',
            senha:'',
        }
    }
}
</script>
<style lang="css" scoped>
    #login{
        padding:40px;
        min-height: 100vh;
    }
</style>