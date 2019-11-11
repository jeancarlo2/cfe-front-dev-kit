<template lang="pug">
b-modal(:active="open" :on-cancel="close" :can-cancel="false" full-screen)
    .box
        h1.subtitle.has-text-centered Compartilhar Lista # {{listaid}}
        hr
        form(@submit="create")
            b-field(label="Email")
                b-input(rounded required type="email" v-model="email")
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
    listaid:Number
  },
  methods: {
    create() {
      let data = {
        listaid: this.listaid,
        to: this.email
      };
      let close = this.close;
      $.post(this.api + "lista/share/" + this.usuario()._id, data).done(data=>{
        close();
      });
    }
  },
  data() {
    return {
      email: "",
    };
  }
};
</script>