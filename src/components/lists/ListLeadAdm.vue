<template>
  <div>
    <md-table v-model="lead" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">Leads</h1>
      </md-table-toolbar>
      <md-table-row
        class="alinhamento-table"
        slot='md-table-row'
        slot-scope='{ item }'
        :class='getClass(item)'
        md-selectable='single'
      >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Data Criação" md-sort-by="data_criacao">{{ item.data_criacao | maskData }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="nome">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="Celular" md-sort-by="celular">{{ item.celular  }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="email">{{item.email }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Listalead',
  data: () => ({
    lead: [],
    perfil: [],
    active: false,
    newValuePassword: null,
    showAlteraSenha: false,
    bloqueio: false,
    EmpresaId: '',
    showUpdateEmpresa: false,
    showEmpresa: false
  }),
  filters: {
    maskData: function (v) {
      v = moment(v).format('DD/MM/YYYY')
      return v
    }
  },
  mounted () {
    /* const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.EmpresaId = authUser2.id_lead */
    axios.get(process.env.API + 'leads').then(response => {
      this.lead = response.data
    })
  },
  methods: {
    getClass: ({ id }) => ({
      'md-primary': id
    })
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
.div{
  overflow: auto;
  height: 75%;
  width: 85%;
}
</style>
