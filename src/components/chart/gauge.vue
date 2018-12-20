<template>
  <ve-gauge :data="chartData" :settings="chartSettings"></ve-gauge>
</template>

<script>
import VeGauge from 'v-charts/lib/gauge.js'
export default {
  components: {VeGauge},
  data () {
    this.chartSettings = {
      dataType: {
        'Resultado': 'percent'
      },
      seriesMap: {
        'Resultado': {
          min: 0,
          max: 1
        }
      }
    }
    return {
      chartData: {
        columns: ['Meta', 'value'],
        rows: [
          { Meta: 'Resultado', value: 0.75 }
        ]
      }
    }
  }
}
</script>
