<template>
  <div>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
export default {
  components: { VeLine },
  data () {
    return {
      chartData: {
        columns: ['date', 'Valores investido'],
        rows: [
          { 'date': '01-01', 'Valores investido': 1231 },
          { 'date': '01-02', 'Valores investido': 1223 },
          { 'date': '01-03', 'Valores investido': 2123 },
          { 'date': '01-04', 'Valores investido': 4123 },
          { 'date': '01-05', 'Valores investido': 3123 },
          { 'date': '01-06', 'Valores investido': 7123 }
        ]
      }
    }
  }
}
</script>
