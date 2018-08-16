<template>
  <div>
    <md-table v-model="schedules" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">Painel de Agendamento</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.id_lead.nome }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.id_lead.email }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.id_lead.telefone }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status">
          <md-button class="md-icon-button md-raised md-primary" @click="aceito">
            <md-tooltip md-direction="top">Aceito</md-tooltip>            
            <md-icon>thumb_up</md-icon>
          </md-button>
          <md-button class="md-icon-button md-raised md-accent"  @click="notAceito">
            <md-tooltip md-direction="top">Não aceito</md-tooltip>
            <md-icon>thumb_down</md-icon>
          </md-button>
          </md-table-cell>
      </md-table-row>
    </md-table>
  <div v-if="selected">
     <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Contato</span>
      </md-toolbar>

      <md-list class="md-double-line">
        <md-subheader>Phone</md-subheader>

        <md-list-item>
          <md-icon class="md-primary">phone</md-icon>

          <div class="md-list-item-text">
            <span>{{ selected.id_lead.telefone }}</span>
            <span>Mobile</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>sms</md-icon>
          </md-button>
        </md-list-item>

        <md-divider></md-divider>
        <md-subheader>Email</md-subheader>

        <md-list-item>
          <md-icon class="md-primary">email</md-icon>

          <div class="md-list-item-text">
            <span>{{ selected.id_lead.email }}</span>
            <span>Personal</span>
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
          <md-icon>map</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].logradouro }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon>map</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].cidade }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon>map</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].bairro }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon>map</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].numero }}</span>
        </md-list-item>
        <md-list-item>
          <md-icon>map</md-icon>
          <span class="md-list-item-text">{{ selected.endereco[0].estado }}</span>
        </md-list-item>

      </md-list>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'ListeAgendamento',
    data: () => ({
      selected: {},
      schedules: []
    }),
    mounted () {
    axios.get(process.env.API + 'schedule?where={"status": 0}')
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
          alert('Confirmado agendamento')
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data.code)
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
          window.location.reload()
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
    margin-top: 16px
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
</style>
