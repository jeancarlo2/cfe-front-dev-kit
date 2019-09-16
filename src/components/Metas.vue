<template lang="pug">
.columns.is-centered.is-mobile
    Modal(:open.sync="AddMeta" :close="CloseModal")
    .column.is-11
        .box
            span.subtitle Metas
            b-button(@click="AddMeta = true" style="float: right;" type="is-text")
                b-icon.has-text-success(pack="fa" icon="plus-circle")
            hr
            .columns.is-mobile
                .column.is-12(style="padding:5px 15px")
                    b-icon(pack="fa" icon="home" size="is-small")
                    span.titulo Conta de luz
                    b-progress(:type="setProgress(60)" :value="60")
            br
            hr
            p.has-text-centered
                router-link.button.is-text(to="metas") ver metas
</template>
<script>
import Modal from "@/modal/Metas.vue";
export default {
  components: {
    Modal
  },
  data() {
      return {
        AddMeta:false
      }
    },
  methods: {
    CloseModal(){
      this.AddMeta = false
    },
    setProgress(val) {
      if (val < 40) {
        return "is-danger";
      } else if (val > 40 && val < 65) {
        return "is-warning";
      } else {
        return "is-success";
      }
    }
  }
};
</script>