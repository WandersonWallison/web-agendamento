<template>
  <div class="card-expansion">
    <br>
    <md-card>
      <md-card-content>
        <line-chart/>
      </md-card-content>
    </md-card>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-content>
          <pie-chart/>
        </md-card-content>
      </md-ripple>
    </md-card>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-content>
          <double-line-chart/>
        </md-card-content>
      </md-ripple>
    </md-card>
    <br>
    <md-card>
      <md-card-content>
        <liquidfill-chart/>
      </md-card-content>
    </md-card>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-content>
          <histogram-chart/>
        </md-card-content>
      </md-ripple>
    </md-card>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-content>
          <gauge-chart/>
        </md-card-content>
      </md-ripple>
    </md-card>
  </div>
</template>
<script>
import LineChart from './../chart/line.vue'
import DoubleLineChart from './../chart/doubleLine.vue'
import PieChart from './../chart/pie.vue'
import BarChart from './../chart/bar.vue'
import HistogramChart from './../chart/histogram.vue'
import GaugeChart from './../chart/gauge.vue'
import LiquidfillChart from './../chart/liquidfill.vue'
export default {
  name: 'dashbord',
  components: {
    LineChart,
    DoubleLineChart,
    PieChart,
    BarChart,
    HistogramChart,
    GaugeChart,
    LiquidfillChart
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .md-content {
      width: 50%;
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
