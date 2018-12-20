<template>
  <ve-line
    :data="chartData"
    :after-config="afterConfig">
  </ve-line>
</template>

<script>
import VeLine from 'v-charts/lib/line'
export default {
  components: { VeLine },
  data () {
    return {
      chartData: {
        columns: ['date', 'Planejado', 'Realizado'],
        rows: [
          { 'date': '01/01', 'Planejado': 15, 'Realizado': 12 },
          { 'date': '01/02', 'Planejado': 12, 'Realizado': 25 },
          { 'date': '01/03', 'Planejado': 21, 'Realizado': 10 },
          { 'date': '01/04', 'Planejado': 41, 'Realizado': 32 },
          { 'date': '01/05', 'Planejado': 31, 'Realizado': 30 },
          { 'date': '01/06', 'Planejado': 71, 'Realizado': 55 },
          { 'date': '01/07', 'Planejado': 15, 'Realizado': 12 },
          { 'date': '01/08', 'Planejado': 12, 'Realizado': 25 },
          { 'date': '01/09', 'Planejado': 21, 'Realizado': 10 },
          { 'date': '01/10', 'Planejado': 41, 'Realizado': 32 },
          { 'date': '01/11', 'Planejado': 31, 'Realizado': 30 },
          { 'date': '01/12', 'Planejado': 71, 'Realizado': 55 }
        ]
      }
    }
  },
  methods: {
    afterConfig (options) {
      options.tooltip.showDelay = 500
      return options
    }
  }
}
</script>
