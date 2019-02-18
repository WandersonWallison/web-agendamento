<template>
  <div>
     <div>
      <md-table v-model="schedules" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">Atividades dos Assessores</h1>
          <div class="md-layout md-gutter md-small-size-100">
            <div class="md-layout-item md-small-size-100">
              <br/>
              <md-field>
                 <label for="agente">Assessores</label>
                <md-select name="agente" id="agente" v-model="selecionado">
                  <md-option v-for="agente in listaAgentes" :key="agente.id" :value="agente.id">
                    {{ agente.username }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-small-size-100">
            <div class="md-layout-item md-small-size-100">
            </div>
          </div>
    </md-table-toolbar>
      <md-table-row  class="alinhamento-table" slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Cliente" md-sort-by="Cliente">{{ item.id_lead.nome }}</md-table-cell>
        <md-table-cell md-label="Data" md-sort-by="data">{{ item.data | maskData}}</md-table-cell>
        <md-table-cell md-label="Hora" md-sort-by="hora">{{ item.hora | maskHora}}</md-table-cell>
        <md-table-cell md-label="Celular" md-sort-by="celular">{{ item.id_lead.celular }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.id_lead.telefone }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="email">{{ item.id_lead.email }}</md-table-cell>
      </md-table-row>
    </md-table>
     </div>

  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'ListaAgendamentosRealizados',
  data: () => ({
    selecionado: '',
    schedules: [],
    agentes: [],
    listaAgentes: []
  }),
  mounted () {
    /*
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2
    */
    axios.get(process.env.API + 'user?where={"ativo":true,"id_profile":2}').then(response => {
      this.listaAgentes = response.data
    })
  },
  // corrigir antes de subi o "office_schedule":8" colocar a logica do escritorio que esta na sessão
  updated () {
    axios.get(process.env.API + 'schedule?where={"ativo":true,"status":0,"agentes":' + this.selecionado + '}').then(response => {
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
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.alinhamento {
  align-items: center;
}

</style>
