<template>
  <ve-pie
    :data="chartData"
    :after-config="afterConfig"
  />
</template>

<script>
import VePie from 'v-charts/lib/pie.common.js'
export default {
  components: { VePie },
  data () {
    return {
      chartData: {
        columns: ['date', 'cost', 'profit'],
        rows: [
          { 'date': 'Recife-PE', 'cost': 123, 'profit': 3 },
          { 'date': 'Goiania-GO', 'cost': 1223, 'profit': 6 },
          { 'date': 'Salvador-BA', 'cost': 2123, 'profit': 90 },
          { 'date': 'Betin-MG', 'cost': 4123, 'profit': 12 },
          { 'date': 'Santo Andre-SP', 'cost': 3123, 'profit': 15 },
          { 'date': 'São Paulo-SP', 'cost': 7123, 'profit': 20 }
        ]
      }
    }
  }
}
</script>
