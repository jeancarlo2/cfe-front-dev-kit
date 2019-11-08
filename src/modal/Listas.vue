<template lang="pug">
b-modal(:active="open" :on-cancel="close" :can-cancel="false" full-screen)
    .box
        h1.subtitle.has-text-centered Criar Lista
        hr
        form(@submit="create")
            b-field(label="Nome da lista")
                b-input(rounded required v-model="titulo")
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
  methods: {
    create() {
      let data = {
        titulo: this.titulo
      };
      let close = this.close;
      $.post(this.api + "lista/create/" + this.usuario()._id, data).done(data=>{
        close();
      });
    }
  },
  data() {
    return {
      titulo: "",
    };
  }
};
</script>