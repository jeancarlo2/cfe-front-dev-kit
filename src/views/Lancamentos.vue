<template lang="pug">
div
  Navbar(msg="Lançamentos")
  Saldo(:value="(saldo)?saldo:null" more=0)
  Modal(:open.sync="AddConta" :close="CloseModal")
  b-button(@click="AddConta = true" type="is-text" size="is-large").flutuante
    i.fa.fa-plus-circle.has-text-success.fa-3x
  br
  .columns.is-mobile.is-centered
    .column.is-11(style="padding-top: 0;")
      Datepicker(:update="update")
  .columns.is-mobile.is-centered(v-for="lancamento in lancamentos")
    .column.is-11
      .box.box-list(:class="lancamento.tipo ? 'receita':'despesa'")
        span.titulo {{ lancamento.titulo }}
        .buttons.is-marginless.is-pulled-right
          b-button(type="is-danger" size="is-small" @click="DelConta(lancamento._id)" rounded)
            b-icon(pack="fa" icon="trash" size="is-small")
        span.is-pulled-right(style="margin-right: 25px;" ) R$ {{ converteMoeda(lancamento.valor) }}
</template>

<script>
import Navbar     from '@/components/Navbar.vue'
import Datepicker from '@/components/Datepicker.vue'
import Saldo      from '@/components/Saldo.vue'
import Modal      from "@/modal/Lancamentos.vue";
export default {
  components: {
    Navbar,
    Datepicker,
    Modal,
    Saldo,
  },
  async created(){
    this.UpdateLancamentos()
    this.UpdateSaldo()
  },
  methods:{
    CloseModal() {
      this.AddConta = false;
      this.UpdateLancamentos()
      this.UpdateSaldo()
    },
    async UpdateLancamentos(){
        this.lancamentos  = await this.lancamento.get(this.month, this.year)
    },
    async UpdateSaldo(){
      this.saldo        = await this.lancamento.saldo(this.month, this.year)
      this.saldo        = this.converteMoeda(this.saldo)
    },
    DelConta(id) {
      this.$buefy.dialog.confirm({
        message: "Deseja apagar o lançamento #" + id + "?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        onConfirm: () =>{
          let update = ()=>{
            this.UpdateLancamentos()
            this.UpdateSaldo()
          }
          $.post(this.api+`lancamento/delete/${id}`).done(data => {
            this.$buefy.toast.open({
              message: "Conta exlcuida!",
              position: "is-bottom",
              type: "is-success"
            })
            update()
          })
        }
      });
    },
    async update(m,y){
      this.month = m
      this.year = y
      this.UpdateLancamentos()
      this.UpdateSaldo()
    }
  },
  data(){
    return{
      saldo:false,
      lancamentos: false,
      AddConta: false,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    }
  }
}
</script>