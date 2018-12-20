<template>
  <ve-liquidfill :data="chartData"></ve-liquidfill>
</template>

<script>
import VeLiquidfill from 'v-charts/lib/liquidfill.js'
export default {
  components: {VeLiquidfill},
  data () {
    return {
      chartData: {
        columns: ['Meta', 'percent'],
        rows: [{
          Meta: 'Agendamentos Realizados',
          percent: 0.6
        }]
      }
    }
  }
}
</script>
