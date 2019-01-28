<template>
  <div>
    <md-table v-model="schedules" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">Painel de Agendamento</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" class="alinhar-texto" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Data agendamento" md-sort-by="data">{{ item.data | maskData }}</md-table-cell>
        <md-table-cell md-label="Hora" md-sort-by="hora">{{ item.hora | maskHora }} hs</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.id_lead.nome }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.id_lead.email }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.id_lead.telefone }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status">
          <div v-if="item.status === 0">
          <md-button class="md-icon-button md-raised md-primary" @click="aceito">
            <md-tooltip md-direction="top">Aceito</md-tooltip>
            <md-icon>thumb_up</md-icon>
          </md-button>
          <md-button class="md-icon-button md-raised md-accent"  @click="notAceito">
            <md-tooltip md-direction="top">Não aceito</md-tooltip>
            <md-icon>thumb_down</md-icon>
          </md-button>
          </div>
          </md-table-cell>
      </md-table-row>
    </md-table>
  <div v-if="selected">
     <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Detalhamento</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon class="md-primary">phone</md-icon>
          <div class="md-list-item-text">
            <span>{{ selected.id_lead.telefone }}</span>
          </div>
        </md-list-item>
        <md-list-item>
          <md-icon class="md-primary">email</md-icon>
          <div class="md-list-item-text">
            <span>{{ selected.id_lead.email }}</span>
          </div>
        </md-list-item>
        <md-list-item>
          <md-icon class="md-primary">description</md-icon>
          <div class="md-list-item-text">
            <span>{{ selected.id_lead.obs }}</span>
          </div>
        </md-list-item>
      </md-list>
    </div>

    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Endereço</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon class="md-primary">person_pin</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].logradouro }}</span>
          <md-icon class="md-primary">person_pin</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].numero }}</span>
        </md-list-item>
        <md-list-item>
          <md-icon class="md-primary">person_pin</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].bairro }}</span>
          <md-icon class="md-primary">person_pin</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].cidade }}</span>
        </md-list-item>
        <md-list-item>
          <md-icon class="md-primary">person_pin</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].uf | estadosBrasileiro }}</span>
        </md-list-item>

      </md-list>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'ListaAgendamento',
  data: () => ({
    selected: {},
    schedules: [],
    id_usuario: null,
    id_lead: null,
    results: [],
    formataca: ''
  }),
  filters: {
    maskFone: function (v) {
      v = v.replace(/\D/g, '') // Remove tudo o que não é dígito
      v = v.replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
      v = v.replace(/(\d)(\d{4})$/, '$1-$2') // Coloca hífen entre o quarto e o quinto dígitos
      return v
    },
    maskData: function (v) {
      v = moment(v).format('DD/MM/YYYY')
      return v
    },
    estado: function (v) {

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
    },
    estadosBrasileiro: function (v) {
      v = v.toUpperCase(v)

      switch (v) {
        case 'AC':
          v = 'Acre'
          break
        case 'AL':
          v = 'Alagoas'
          break
        case 'AP':
          v = 'Amapá'
          break
        case 'AM':
          v = 'Amazonas'
          break
        case 'BA':
          v = 'Bahia'
          break
        case 'CE':
          v = 'Ceará'
          break
        case 'DF':
          v = 'Distrito Federal'
          break
        case 'GO':
          v = 'Goiás'
          break
        case 'MA':
          v = 'Maranhão'
          break
        case 'MT':
          v = 'Mato Grosso'
          break
        case 'MS':
          v = 'Mato Grosso do Sul'
          break
        case 'MG':
          v = 'Minas Gerais'
          break
        case 'PA':
          v = 'Pará'
          break
        case 'PB':
          v = 'Paraíba'
          break
        case 'PR':
          v = 'Paraná'
          break
        case 'PE':
          v = 'Pernambuco'
          break
        case 'PI':
          v = 'Piauí'
          break
        case 'RJ':
          v = 'Rio de Janeiro'
          break
        case 'RN':
          v = 'Rio Grande do Norte'
          break
        case 'RS':
          v = 'Rio Grande do Sul'
          break
        case 'RO':
          v = 'Rondônia'
          break
        case 'RR':
          v = 'Roraima'
          break
        case 'SC':
          v = 'Santa Catarina'
          break
        case 'SP':
          v = 'São Paulo'
          break
        case 'SE':
          v = 'Sergipe'
          break
        case 'TO':
          v = 'Tocantins'
          break
      }
      return v
    }
  },

  mounted () {
    const userLogado = window.localStorage.getItem('Usuario')
    const user = JSON.parse(userLogado)
    this.id_usuario = user.id

    axios.get(process.env.API + 'schedule?where={"agentes": ' + this.id_usuario + ',"status":{"!=":2}}')
    // axios.get(process.env.API + 'schedule?where={"agentes": '+this.id_usuario+'}')
      .then(response => {
        this.schedules = response.data
        this.selected = null
      })
  },
  methods: {
    aceito () {
      let newAgenda = {
        status: 1
      }
      axios.put(process.env.API + 'schedule/' + this.selected.id, newAgenda)
        .then((response) => {
          this.results = response.data
          this.updateLead(4)
          /* window.location.reload() */
        })
        .catch((error) => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },

    updateLead (id) {
      let newLead = {
        momento_atual: id
      }
      axios.put(process.env.API + 'leads/' + this.results.id_lead.id, newLead)
        .then((response) => {
          window.location.reload()
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    },
    notAceito () {
      let newAgenda = {
        status: 2
      }
      axios.put(process.env.API + 'schedule/' + this.selected.id, newAgenda)
        .then((response) => {
          this.results = response.data
          alert('Não confirmou agendamento')
          this.updateLead(5)
        })
        .catch((error) => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },
    getClass: ({ id }) => ({
      'md-primary': id === 2,
      'md-accent': id === 3
    }),
    onSelect (item) {
      this.selected = item
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px;
  }
  .viewport {
    width: 45%;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    margin-top: 5%;
    border: 1px solid rgba(#000, .12);
  }
  .alinhar-texto {
    text-align: left;
  }
</style>
