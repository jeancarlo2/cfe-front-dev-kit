<template lang="pug">
b-modal(:active="open" :on-cancel="close" :can-cancel="false" full-screen)
    .box
        h1.subtitle.has-text-centered Adicionar Meta
        hr
        form(@submit="create")
            b-field(label="Descrição")
                b-input(rounded required v-model="titulo")
            b-field(label="Valor")
                b-input(type="number" v-model="valor" min="0.01" step="0.01" required rounded)
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
        valor: this.valor,
        titulo: this.titulo
      };
      let close = this.close;
      $.post(this.api + "meta/create/" + this.usuario._id, data).done(function(
        data
      ) {
        close();
      });
    }
  },
  data() {
    return {
      titulo: "",
      valor: 0
    };
  }
};
</script>