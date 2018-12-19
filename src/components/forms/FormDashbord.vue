<template>
  <div class="card-expansion">
    <!--<md-toolbar class="md-accent">
      <h3 class="md-title">Dashbord - Em construção</h3>
    </md-toolbar>
    -->
    <br>
    <md-card>
      <md-card-content>
        <GChart
          type="PieChart"
          :data="chartData"
          :options="chartOptions"
        />
      </md-card-content>
    </md-card>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-content>
          <GChart
            type="LineChart"
            :data="chartData1"
            :options="chartOptions1"
          />
        </md-card-content>
      </md-ripple>
    </md-card>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-content>
         <GChart
            type="ColumnChart"
            :data="chartData2"
            :options="chartOptions2"
          />
        </md-card-content>
      </md-ripple>
    </md-card>
    <br>
    <md-card>
      <md-card-content>
        <GChart
            :settings="{packages: ['bar']}"
            :data="chartData"
            :options="chartOptions"
            :createChart="(el, google) => new google.charts.Bar(el)"
            @ready="onChartReady"
        />
      </md-card-content>
    </md-card>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-content>
         <GChart type="PieChart"
              :data="chartData4"
              :options="chartOptions4"
          />
        </md-card-content>
      </md-ripple>
    </md-card>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-content>
         <GChart
              type="ComboChart"
              :data="chartData6"
              :options="chartOptions6"
          />
        </md-card-content>
      </md-ripple>
    </md-card>
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
        ['Tarefas', 'Realizações por Agente'],
        ['Agendamentos', 11],
        ['Visitados', 2],
        ['Cancelados', 2],
        ['Não efetivados', 2],
        ['Efetivados', 7]
      ],
      chartOptions: {
        chart: {
          title: 'Performance do escritorio',
          subtitle: 'Leads, Agendados, and Efetivados: 2014-2017',
          slices: {
            4: {offset: 0.2},
            12: {offset: 0.3},
            14: {offset: 0.4},
            15: {offset: 0.5}
          }
        }
      },
      chartData1: [
        ['ID', 'Casa Amarela', 'Torre', 'Escritorios'],
        ['', 80, 167, 120],
        ['', 79, 136, 130],
        ['', 78, 184, 50],
        ['', 72, 278, 230],
        ['', 81, 200, 210],
        ['', 72, 170, 100],
        ['', 68, 477, 80]
      ],
      chartOptions1: {
        title: 'Evolução dos escritorios',
        colorAxis: { colors: ['yellow', 'red'] }
      },
      chartData2: [
        ['Mês', 'Agendados', 'Efetivados'],
        ['MAIO', 1000, 400],
        ['JUNHO', 1170, 460],
        ['JUNHO', 660, 1120],
        ['AGOSTO', 1030, 540]
      ],
      chartOptions2: {
        chart: {
          title: 'Desempenho Hunter',
          subtitle: 'Leads, Agendados, and Efetivados: MAIO-AGOSTO'
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
      chartData4: [
        ['Tafarefas', 'Horas por dia'],
        ['Trabalho', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
      ],
      chartOptions4: {
        title: 'ATIVIDADES DIARIAS',
        pieHole: 0.4
      },
      chartData5: [
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540]
      ],
      chartOptions5: {
        title: 'Company Performance',
        curveType: 'function',
        legend: { position: 'bottom' }
      },
      chartData6: [
        ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
        ['2004/05', 165, 938, 522, 998, 450, 614.6],
        ['2005/06', 135, 1120, 599, 1268, 288, 682],
        ['2006/07', 157, 1167, 587, 807, 397, 623],
        ['2007/08', 139, 1110, 615, 968, 215, 609.4],
        ['2008/09', 136, 691, 629, 1026, 366, 569.6]
      ],
      chartOptions6: {
        title: 'Ativação de clientes por escritorio',
        vAxis: {title: 'Montante captado'},
        hAxis: {title: 'Período'},
        seriesType: 'bars',
        series: {5: {type: 'line'}}
      }
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
  .md-card {
    width: 330px;
    margin: 6px;
    display: inline-block;
    vertical-align: top;
  }

</style>
