<template lang="pug">
div
  Navbar(msg="Minha Conta")
  .columns.is-centered.is-mobile(style="margin-top:20px")
    .column.is-8
      figure.image
        img(src="@/assets/user.png")
      h1.title.has-text-centered(style="margin-top:20px") {{usuario().nome}}
      h2.subtitle.has-text-centered(style="margin-top:20px") {{usuario().email}}
      p 
        b-button(type="is-danger" icon-pack="fa" icon-left="trash" @click="deleteAcc").is-fullwidth Excluir conta
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  methods:{
    deleteAcc() {
      this.$buefy.dialog.confirm({
        title:  "Excluir conta",
        message: "Isso apagará todos os dados referentes a sua conta.",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        onConfirm: () =>{
          let update = () => this.$router.push("/");
          $.post(this.api+`lancamento/delete/${this.usuario()._id}`).done(data => {
            this.$buefy.toast.open({
              message: "Conta exlcuida!",
              position: "is-bottom",
              type: "is-success"
            })
            Cookies.remove('usuario')
            update()
          })
        }
      });
    }
  }
}
</script>