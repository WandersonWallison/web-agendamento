<template>
  <ve-map :data="chartData"></ve-map>
</template>

<script>
import VeMap from 'v-charts/lib/map.common'
  export default {
    components: { VeMap },
    data () {
      return {
        chartData: {
          columns: ['location', 'UK'],
          rows: [
            {'location': '吉林', 'GDP': 123, 'person': 123, 'area': 92134 },
            {'location': '北京', 'GDP': 1223, 'person': 2123, 'area': 29234 },
            {'location': '上海', 'GDP': 2123, 'person': 1243, 'area': 94234 },
            {'location': '浙江', 'GDP': 4123, 'person': 5123, 'area': 29234 }
          ]
        },
        chartSettings: {
          position: 'world',
          // selectData: true,
          selectedMode: 'single'
        }
      }
    }
  }
</script>
