<template>
  <div>
    <md-toolbar class="md-accent">
      <h3 class="md-title">Dashbord - Em construção</h3>      
    </md-toolbar>
    <br>
    <br>
    <md-content>
        <GChart type="LineChart" :data="chartData4" :options="chartOptions4"/>
        <GChart :settings="{packages: ['bar']}" :data="chartData" :options="chartOptions" :createChart="(el, google) => new google.charts.Bar(el)"  @ready="onChartReady" />
        <GChart
            :settings="{packages: ['bar']}"    
            :data="chartData"
            :options="chartOptions"
            :createChart="(el, google) => new google.charts.Bar(el)"
            @ready="onChartReady"
        /> 
    </md-content>
    <md-content>
         <GChart type="LineChart" :data="chartData4" :options="chartOptions4"/>   
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions"/>
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions"/>  
    </md-content>    
  </div>
</template>
<script>
import { GChart } from 'vue-google-charts'

    export default {
        name: 'dashbord',
        components: {
            GChart
        },
        data () {
            return {
            // Array will be automatically processed with visualization.arrayToDataTable function
                chartsLib: null,
                chartData: [
                    ['Ano', 'Leads', 'Agendados', 'Efetivados'],
                    ['2014', 1000, 400, 200],
                    ['2015', 1170, 460, 250],
                    ['2016', 660, 1120, 300],
                    ['2017', 1030, 540, 350]
                ],
                chartOptions: {
                    chart: {
                        title: 'Performance do escritorio',
                        subtitle: 'Leads, Agendados, and Efetivados: 2014-2017',
                    }
                },
                chartData1: [
                    ["ID", "X", "Y", "Escritorio"],
                    ["", 80, 167, 120],
                    ["", 79, 136, 130],
                    ["", 78, 184, 50],
                    ["", 72, 278, 230],
                    ["", 81, 200, 210],
                    ["", 72, 170, 100],
                    ["", 68, 477, 80]
                ],
                chartOptions1: {
                    colorAxis: { colors: ["yellow", "red"] }
                },
                chartData2: [
                    ['Mês', 'Agendados', 'Efetivados'],
                    ['MAIO',  1000,  400],
                    ['JUNHO',  1170,  460],
                    ['JUNHO',  660,   1120],
                    ['AGOSTO',  1030,  540]
                ],  
                    chartOptions2: {
                    chart: {
                        title: 'Desempenho Hunter',
                        subtitle: 'Leads, Agendados, and Efetivados: MAIO-AGOSTO',
                    }
                },            
                chartData3: [
                        ['Blueberry', 44],                     
                        ['Strawberry', 13]
                ],
                chartOptions3: {
                    chart: {
                        title: 'Grafico de Pizza'
                    }                    
                },
                chartData4:[                            
                    ['Task', 'Hours per Day'],
                    ['Work',     11],
                    ['Eat',      2],
                    ['Commute',  2],
                    ['Watch TV', 2],
                    ['Sleep',    7]
                ],
                chartOptions4:{
                    title: 'ATIVIDADES DIARIAS',
                    pieHole: 0.4,
                }
                        
            }

        },
        computed: { 
            chartOptions () {
            if (!this.chartsLib) return null
                return this.chartsLib.charts.Bar.convertOptions({
                    chart: {
                        title: 'Company Performance',
                        subtitle: 'Sales, Expenses, and Profit: 2014-2017'
                    },
                    bars: 'horizontal', // Required for Material Bar Charts.
                        hAxis: { format: 'decimal' },
                        height: 400,
                        colors: ['#1b9e77', '#d95f02', '#7570b3']
                })
            }
        },
        methods: {
            onChartReady (chart, google) {
            this.chartsLib = google
        }   
        }
    }
</script>
<style lang="scss" scoped>
  .md-content {
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .BubbleChart {
      width: 80%;
      height: 25%;
  }
  .Style-chart {
      width: 40%;
  }

</style>
