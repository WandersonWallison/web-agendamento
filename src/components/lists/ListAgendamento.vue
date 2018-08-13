<template>
  <div class="conteudo-alinhamento">
    <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Confimação de Agendamento</span>
    </md-toolbar>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title"></h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Buscar pelo nome..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <!--
      <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
        <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
      </md-table-empty-state>
      -->
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Código" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="name">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="title">{{ item.telefone }}</md-table-cell>
       <md-table-cell md-label="Status" md-sort-by="status">
          <md-button class="md-icon-button md-raised md-primary">
            <md-tooltip md-direction="top">Aceito</md-tooltip>
            <md-icon>thumb_up</md-icon>
          </md-button>
          <md-button class="md-icon-button md-raised md-accent">
            <md-tooltip md-direction="top">Não aceito</md-tooltip>
            <md-icon>thumb_down</md-icon>
          </md-button>
          </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
import axios from 'axios'
const toLower = text => {
  return text.toString().toLowerCase()
}
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.nome).includes(toLower(term)))
  }
  return items
}
export default {
  name: 'listAgendamento',
  data: () => ({
    search: null,
    searched: [],
    users: []
  }),
  mounted () {
    axios.get(process.env.API + 'leads')
      .then(response => {
        this.users = response.data
        this.searched = response.data
      })
  },
  methods: {
    newUser () {
      window.alert('Noop')
    },
    searchOnTable () {
      this.searched = searchByName(this.users, this.search)
    }
  },
  created () {
    this.searched = this.users
  }
}
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 300px;
  }
  .conteudo-alinhamento{
     text-align: left;
  }
  .butoom-02{
    background-color: green;
  }
  .butoom-03{
    background-color: rgb(220, 235, 13);
  }
  .butoom-04{
    background-color: rgb(235, 102, 13);
  }
</style>
