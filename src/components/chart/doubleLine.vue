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
        columns: ['date', 'cost', 'profit'],
        rows: [
          { 'date': '01/01', 'cost': 15, 'profit': 12 },
          { 'date': '01/02', 'cost': 12, 'profit': 25 },
          { 'date': '01/03', 'cost': 21, 'profit': 10 },
          { 'date': '01/04', 'cost': 41, 'profit': 32 },
          { 'date': '01/05', 'cost': 31, 'profit': 30 },
          { 'date': '01/06', 'cost': 71, 'profit': 55 }
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
