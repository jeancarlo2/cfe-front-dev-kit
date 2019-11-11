<template lang="pug">
div
    Navbar(msg="Relatórios")
    br
    .columns.is-mobile.is-centered
        .column.is-11(style="padding-top: 0;")
            Datepicker(:update="update")
    .divider
      b Receita x Despesa
      hr
    .columns.is-mobile.is-centered
      .column.is-11
        canvas#chart
    .divider
      b Despesas
      hr
    .columns.is-mobile.is-centered
      .column.is-11
        canvas#chart2
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Datepicker from '@/components/Datepicker.vue'
import Chart from 'chart.js'
export default {
  components: {
    Navbar, 
    Datepicker
  },
  data(){
    return{
      lancamentos: false,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      chart:[]
    }
  },
  async mounted(){
    var colorarray  = ["rgba(75, 192, 192, 1)","rgba(255, 99, 132, 1)"];
    this.chart[0] = new Chart($('#chart').get(0).getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Receita', 'Despesa'],
                datasets: [{
                    data: [],
                    backgroundColor:colorarray,
                    borderColor:"#fff",
                }]
            },
            options:{
              legend: {
              display: true,
              position: 'bottom',
              labels: {
                  fontColor: '#fff'
              }
          }
      }
    });
    colorarray = ["rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)","rgba(54, 162, 235, 1)","rgba(153, 102, 255, 1)","rgba(201, 203, 207, 1)"];
    this.chart[1] = new Chart($('#chart2').get(0).getContext('2d'), {
          type: 'bar',
          data:{
            labels:["Despesas","Contas","Metas","Itens"],
            datasets:[{
              data:[],
              backgroundColor:colorarray,
              borderColor:"#fff",
              borderWidth: "2"
            }]},
           options: { 
        legend: {
            display:false
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 12,
                    stepSize: 15,
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 10,
                    stepSize: 1,
                    beginAtZero: true
                }
            }]
        }
    }
      });
  },
  created(){
    this.UpdateLancamentos();
  },
  methods:{
    async UpdateLancamentos(){
        this.lancamentos  = await this.lancamento.get(this.month, this.year)
        var rc = this.lancamentos.filter( v => v.tipo)
        var dp = this.lancamentos.filter( v => v.tipo != 1 )
        var rtotal = 0
        var dtotal = 0
        rc.map( i => rtotal = parseFloat(rtotal) + parseFloat(i.valor) )
        dp.map( i => dtotal = parseFloat(dtotal) + parseFloat(i.valor) )
        console.log(this.chart[0])
        this.chart[0].data.datasets[0].data = [rtotal, dtotal]
        this.chart[0].update()
        var despesas = [0,0,0,0]
        dp.map( i =>{
          let valor = parseFloat(i.valor)
          if(i.itemid){
            despesas[3] = despesas[3] + valor;
          }else if(i.contaid){
            despesas[1] = despesas[1] + valor;
          }else if(i.metaid){
            despesas[2] = despesas[2] + valor;
          }else{
            despesas[0] = despesas[0] + valor;
          }
        })
        this.chart[1].data.datasets[0].data = despesas;
        this.chart[1].update()
        
    },
    async update(m,y){
        this.month = m;
        this.year = y;
        this.UpdateLancamentos()
    }
  }
}
</script>