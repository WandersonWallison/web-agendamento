<template>
  <div>
    <md-dialog :md-active.sync="showEmpresa" class="div">
      <cad-Empresa/>
    </md-dialog>
    <md-dialog :md-active.sync="showUpdateEmpresa" class="div">
       <upd-empresa :selected="selected"></upd-empresa>
    </md-dialog>
    <md-table v-model="company" @md-selected="onSelect" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">Empresas</h1>
        <md-button class="md-raised md-primary" @click="showEmpresa = true">
          <md-icon class='botao-red'>location_city</md-icon>
          <md-tooltip md-direction='top'>Cadastro de Empresa</md-tooltip>
        </md-button>
        <md-button class="md-raised md-accent" @click="validaEdicao">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction='top'>Editar Empresa</md-tooltip>
        </md-button>
      </md-table-toolbar>
      <md-table-row
        class="alinhamento-table"
        slot='md-table-row'
        slot-scope='{ item }'
        :class='getClass(item)'
        md-selectable='single'
      >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="nome">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="CNPJ" md-sort-by="cnpj">{{ item.cnpj }}</md-table-cell>
        <md-table-cell md-label="Razão Social" md-sort-by="razao_social">{{ item.razao_social }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="email">{{item.email }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'
import CadEmpresa from '../forms/FormCadastroEmpresa.vue'
import UpdEmpresa from '../forms/FormUpdateEmpresa.vue'
export default {
  name: 'Listacompany',
  props: ['selected'],
  components: {
    CadEmpresa,
    UpdEmpresa
  },
  data: () => ({
    selected: {},
    company: [],
    perfil: [],
    active: false,
    newValuePassword: null,
    showAlteraSenha: false,
    bloqueio: false,
    EmpresaId: '',
    showUpdateEmpresa: false,
    showEmpresa: false
  }),
  mounted () {
    /* const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.EmpresaId = authUser2.id_company */
    axios.get(process.env.API + 'company').then(response => {
      this.company = response.data
    })
  },
  methods: {
    getClass: ({ id }) => ({
      'md-primary': id
    }),
    onSelect (item) {
      this.selected = item
    },
    validaEdicao () {
      if (this.selected) {
        this.showUpdateEmpresa = true
      } else {
        alert('Por favor selecionar uma empresa para edição!')
      }
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
.div{
  overflow: auto;
  height: 75%;
  width: 85%;
}
</style>
