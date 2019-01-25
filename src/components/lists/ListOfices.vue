<template>
  <div>
    <md-table v-model="office" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">Escritorios</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" class="alinhamento-table">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="name">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Responsavel" md-sort-by="email">{{ item.responsavel }}</md-table-cell>
        <md-table-cell md-label="CNPJ" md-sort-by="gender">{{ item.cnpj }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="title">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="title">{{item.email }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ListaOffice',
  data: () => ({
    selected: {},
    office: [],
    perfil: [],
    active: false,
    newValuePassword: null,
    showAlteraSenha: false,
    bloqueio: false,
    escritorioId: ''
  }),
  mounted () {
    /* const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.escritorioId = authUser2.id_office */

    axios.get(process.env.API + 'office').then(response => {
      this.office = response.data
    })
  },
  methods: {
    getClass: ({ id }) => ({
      'md-primary': id
    }),
    onSelect (item) {
      this.selected = item
    }
  }
}
</script>

<style lang='scss' scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.alinhamento-table {
  text-align: left;
}
</style>
