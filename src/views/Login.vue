<template lang="pug">
    .container
        .columns.is-vcentered.is-centered.is-mobile#login
            .column.is-10
                h1.title.has-text-centered
                    b-icon(pack="fas" icon="chart-line")
                    span(style="margin-left:15px") CFE
                form(@submit="checkForm" v-on:submit.prevent)
                    b-field
                        b-input(type="email" rounded required placeholder="Email" size="is-medium" iconPack="fas" icon="at" v-model="email")
                    b-field
                        b-input(type="password" rounded required placeholder="Senha" size="is-medium" iconPack="fas" icon="lock" v-model="senha" password-reveal)
                    .field
                        p.control.is-expanded
                        .buttons
                            input.button.is-success.is-fullwidth.is-rounded(type="submit" value="Entrar")
                            //- button.button.is-info.is-fullwidth.is-rounded Entrar com facebook
                        p.is-fullwidth.has-text-centered
                            small ou
                        router-link.button.is-text.is-fullwidth.is-rounded(to="/registrar") Registrar-se
</template>
<script>
export default {
    methods:{
        checkForm(){
            let buefy = this.$buefy;
            let router = this.$router;
            $.post(this.api+'usuario/login',{
                email: this.email,
                senha: this.senha
            }).done(function(data){
                console.log(data.length)
                if(data.length != 0){
                    Cookies.set('usuario', data)
                    router.push("dashboard")
                }else{
                    buefy.dialog.alert({
                        type: 'is-danger',
                        message: 'Email ou senha errados, tente novamente.',
                        confirmText: 'Ok',
                    })
                }
            })
        }
    },
    created() {
      console.log(Cookies.getJSON('usuario'))
      if(Cookies.getJSON('usuario')) this.$router.push("dashboard");

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