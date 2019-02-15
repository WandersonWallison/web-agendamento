<template>
  <div>
    <md-dialog :md-active.sync="showEscritorio" class="div">
      <cad-escritorio/>
    </md-dialog>
    <md-dialog :md-active.sync="showEditEscritorio" class="div">
       <upd-escritorio :selected="selected"></upd-escritorio>
    </md-dialog>
    <md-table v-model="office" @md-selected="onSelect" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">Escritórios</h1>
        <md-button class="md-raised md-primary" @click="showEscritorio = true">
          <md-icon>business_center</md-icon>
          <md-tooltip md-direction='top'>Cadastro de Escritorio</md-tooltip>
        </md-button>
        <md-button class="md-raised md-accent" @click="validaEdicao">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction='top'>Editar Escritorio</md-tooltip>
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
        <md-table-cell md-label="Responsavel" md-sort-by="responsavel">{{ item.responsavel }}</md-table-cell>
        <md-table-cell md-label="CNPJ" md-sort-by="cnpj">{{ item.cnpj }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="email">{{item.email }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'
import CadEscritorio from '../forms/FormCadastroEscritorio.vue'
import UpdEscritorio from '../forms/FormUpdateEscritorio.vue'
export default {
  name: 'ListaOffice',
  props: ['selected'],
  components: {
    CadEscritorio,
    UpdEscritorio
  },
  data: () => ({
    selected: {},
    office: [],
    active: false,
    showEscritorio: false,
    showEditEscritorio: false
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
    },
    validaEdicao () {
      if (this.selected) {
        this.showEditEscritorio = true
      } else {
        alert('Por favor selecionar um escritorio para edição!')
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
