<template>
  <div>
    <md-table v-model="people" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">Lista de Agentes</h1>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
        <div class="md-toolbar-section-end">
          <div v-if="count == 1">
            <md-button class="md-icon-button" @click="showUpdateLead = true">
            <md-tooltip md-direction="top">Atualizar</md-tooltip>
            <md-icon>update</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="showEndereco = true">
            <md-tooltip md-direction="top">Endereço</md-tooltip>
            <md-icon>location_on</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="showConta = true">
            <md-tooltip md-direction="top">Conta</md-tooltip>
            <md-icon>attach_money</md-icon>
            </md-button>
          </div>
          <md-button @click="desativar = true" class="md-icon-button">
            <md-tooltip md-direction="top">Destivar</md-tooltip>
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" :md-disabled="item.username.includes('Stave')" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Nome" md-sort-by="nome">{{ item.username }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="Cpf" md-sort-by="cpf">{{ item.cpf }}</md-table-cell>
      </md-table-row>
    </md-table>
  <div>
    <md-table v-model="selected" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Detalhe</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
         <md-card>
      <md-card-header>
        <div class="md-title">{{ item.nome }}</div>
        <div class="md-subhead">{{ item.email }}</div>
      </md-card-header>
    </md-card>
      </md-table-row>
    </md-table>
  </div>
    <md-dialog :md-active.sync="showUpdateLead">
      <div class="div">
      <up-lead :selected="selected"></up-lead>
      </div>
    </md-dialog>

    <md-dialog :md-active.sync="showEndereco">
      <div class="div">
      <endereco :selected="selected"></endereco>
      </div>
    </md-dialog>
    <md-dialog :md-active.sync="showConta">
      <div class="div">
      <conta :selected="selected"></conta>
      </div>
    </md-dialog>
    <md-dialog-confirm
      :md-active.sync="desativar"
      md-title="Deseja realmete desativar estas contatos?"
      md-content="Ele (s) não serão mais exibidos na lista"
      md-confirm-text="Sim"
      md-cancel-text="Não"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
import UpLead from '../forms/FormUpdateLead.vue'
import Endereco from '../forms-endereco/FormEndereco.vue'
import Conta from '../forms/FormConta.vue'
import axios from 'axios'
export default {
  name: 'ListaAgentes',
  props: ['selected'],
  components: {
    UpLead,
    Endereco,
    Conta
  },
  data: () => ({
    selected: [],
    people: [],
    showUpdateLead: false,
    showEndereco: false,
    showConta: false,
    desativar: false,
    atual: []
  }),
  filters: {
      maskFone: function (v) {
        v = v.replace(/\D/g,'') // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
        v = v.replace(/(\d)(\d{4})$/, '$1-$2') // Coloca hífen entre o quarto e o quinto dígitos
        return v
      }
  },
  mounted () {
  axios.get(process.env.API + 'user?id_profile=2')
  .then(response => {
    console.log('response: ' + response.data)
    this.people = response.data
  })
  },
  methods: {
    onCancel () {
      this.value = 'Disagreed'
    },
    onConfirm(){
      let newLead = {
        ativo: false
      }
      for (var i = 0; i <= this.selected.length; i++) {
        axios.put(process.env.API+'user/' + this.selected[i].id, newLead)
          .then(response => {
            console.log(i + 'alterado')
            window.location.reload()})
      }
    },
    onSelect (items) {
      this.selected = items
    },
    getAlternateLabel (count) {
      let plural = ''
      if (count > 1) {
        plural = 's'
        }
      return `${count} user${plural} selected`
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
  }
  .md-dialog {
  width: 70%;
  height: 70%;
  max-width: 100%;
  }
  .div{
    overflow: auto;
   margin-left: 2%;
  }
</style>
