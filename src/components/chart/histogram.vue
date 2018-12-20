<template>
  <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
</template>

<script>
import VeHistogram from 'v-charts/lib/histogram.js'
export default {
  components: {VeHistogram},
  data () {
    this.chartSettings = {
      metrics: ['contactado', 'visitado'],
      dimension: ['date']
    }
    return {
      chartData: {
        columns: ['date', 'contactado', 'visitado', 'growthRate', 'people'],
        rows: [
          { 'contactado': 1523, 'date': '01/01', 'visitado': 1523, 'growthRate': 0.12, 'people': 100 },
          { 'contactado': 1623, 'date': '01/02', 'visitado': 1523, 'growthRate': 0.345, 'people': 100 },
          { 'contactado': 2123, 'date': '01/03', 'visitado': 1523, 'growthRate': 0.7, 'people': 100 },
          { 'contactado': 4123, 'date': '01/04', 'visitado': 1523, 'growthRate': 0.31, 'people': 100 }
        ]
      }
    }
  }
}
</script>
