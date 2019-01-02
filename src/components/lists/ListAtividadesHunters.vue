<template>
  <div>
    <md-table v-model="schedules" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">Agendamentos</h1>
      </md-table-toolbar>
      <md-table-row  class="alinhamento-table" slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Agente" md-sort-by="agente">{{ item.agentes.username }}</md-table-cell>
        <md-table-cell md-label="Data" md-sort-by="data">{{ item.data | maskData}}</md-table-cell>
        <md-table-cell md-label="Hora" md-sort-by="hora">{{ item.hora | maskHora}}</md-table-cell>
        <md-table-cell md-label="Escritorio" md-sort-by="escritorio">{{ item.office_schedule.nome }}</md-table-cell>
        <md-table-cell md-label="Cliente" md-sort-by="Cliente">{{ item.id_lead.nome }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'ListaAgendamentosRealizados',
  data: () => ({
    selected: {},
    schedules: [],
    perfil: [],
    active: false
  }),
  mounted () {
    axios.get(process.env.API + 'schedule?where={"ativo":true,"status":0,"office_schedule":8}').then(response => {
      this.schedules = response.data
    })
  },
  methods: {
    getClass: ({ id }) => ({
      'md-primary': id
    }),
    onSelect (item) {
      this.selected = item
    }
  },
  filters: {
    maskData: function (v) {
      v = moment(v).format('DD/MM/YYYY')
      return v
    },
    maskHora: function (v) {
      switch (v) {
        case 1:
          v = '08:00'
          break
        case 2:
          v = '09:00'
          break
        case 3:
          v = '10:00'
          break
        case 4:
          v = '11:00'
          break
        case 5:
          v = '12:00'
          break
        case 6:
          v = '13:00'
          break
        case 7:
          v = '14:00'
          break
        case 8:
          v = '15:00'
          break
        case 9:
          v = '16:00'
          break
        case 10:
          v = '17:00'
          break
        case 11:
          v = '18:00'
          break
        case 12:
          v = '19:00'
          break
        case 13:
          v = '20:00'
          break
        case 14:
          v = '21:00'
          break
        case 15:
          v = '22:00'
          break
      }
      return v
    }
  }
}
</script>
<style lang='scss' scoped>
.md-table + .md-table {
  margin-top: 5px;
}
.alinhamento-table {
  text-align: left;
}

</style>
