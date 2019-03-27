<template>
  <div>
    <md-table v-model="people" md-card @md-selected="onSelect">
       <md-table-toolbar>
        <h1 class="md-title">Lista de Leads</h1>
        <md-button class="md-icon-button" @click="showDialog = true">
          <md-tooltip md-direction="top">Cadastro de Lead</md-tooltip>
          <md-icon>contact_phone</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showUpdateLead = true">
          <md-tooltip md-direction="top">Atualizar Lead</md-tooltip>
          <md-icon>update</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showUpdateCliente = true">
          <md-tooltip md-direction="top">Ativar Cliente</md-tooltip>
          <md-icon>person</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showEndereco = true">
          <md-tooltip md-direction="top">Adicionar Endereço</md-tooltip>
          <md-icon>location_on</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showConta = true">
          <md-tooltip md-direction="top">Adicionar Conta</md-tooltip>
          <md-icon>attach_money</md-icon>
        </md-button>
        <md-button @click="desativar = true" class="md-icon-button">
          <md-tooltip md-direction="top">Excluir</md-tooltip>
          <md-icon>delete</md-icon>
        </md-button>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
        <md-table-cell md-label="Nome" md-sort-by="nome">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="Celular" md-sort-by="celular">{{ item.celular }}</md-table-cell>
      </md-table-row>
    </md-table>
      <div>
        <md-table v-model="selected" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Detalhamento</h1>
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
    <md-dialog class="md-dialog-update" :md-active.sync="showUpdateLead">
      <div class="alinhar-esquerda">
        <md-button class="md-primary" @click="showUpdateLead = false"><md-icon>clear</md-icon></md-button>
      </div>
      <div class="div-update">
        <up-lead :selected="selected"></up-lead>
      </div>
    </md-dialog>
    <md-dialog class="md-dialog-update" :md-active.sync="showUpdateCliente">
      <div class="alinhar-esquerda">
        <md-button class="md-primary" @click="showUpdateCliente = false"><md-icon>clear</md-icon></md-button>
      </div>
      <div class="div-update">
      <up-cliente :selected="selected"></up-cliente>
      </div>
    </md-dialog>
    <md-dialog :md-active.sync="showEndereco">
      <div class="alinhar-esquerda">
        <md-button class="md-primary" @click="showEndereco = false"><md-icon>clear</md-icon></md-button>
      </div>
      <div class="div">
      <endereco :selected="selected"></endereco>
      </div>
    </md-dialog>
    <md-dialog :md-active.sync="showConta">
      <div class="alinhar-esquerda">
        <md-button class="md-primary" @click="showConta = false"><md-icon>clear</md-icon></md-button>
      </div>
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

    <md-dialog :md-active.sync="showDialog" class="div-contato">
      <cad-lead/>
    </md-dialog>
  </div>
</template>

<script>
import UpLead from '../forms/FormUpdateLead.vue'
import UpCliente from '../forms/FormUpdateCliente.vue'
import Endereco from '../forms-endereco/FormEndereco.vue'
import Conta from '../forms/FormConta.vue'
import CadLead from '../forms/FormCadastroLead.vue'
import axios from 'axios'
export default {
  name: 'listCrudLead',
  props: ['selected'],
  components: {
    UpLead,
    UpCliente,
    Endereco,
    Conta,
    CadLead
  },
  data: () => ({
    selected: [],
    people: [],
    showUpdateLead: false,
    showUpdateCliente: false,
    showEndereco: false,
    showConta: false,
    desativar: false,
    atual: [],
    showDialog: false
  }),
  filters: {
    maskFone: function (v) {
      v = v.replace(/\D/g, '') // Remove tudo o que não é dígito
      v = v.replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
      v = v.replace(/(\d)(\d{4})$/, '$1-$2') // Coloca hífen entre o quarto e o quinto dígitos
      return v
    }
  },
  mounted () {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2
    axios.get(process.env.API + 'leads?where={"ativo": true,"id_office":' + this.userAtual.id_office + '}')
      .then(response => {
        this.people = response.data
      })
  },
  methods: {
    getClass: ({ id }) => ({
      'md-primary': id
    }),
    onCancel () {
      this.value = 'Disagreed'
    },
    onConfirm () {
      let newLead = {
        ativo: false
      }
      // for (var i = 0; i <= this.selected.length; i++) {
      axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
        .then(response => {
          window.location.reload()
        })
      // }
    },
    onSelect (items) {
      this.selected = items
    },
    getAlternateLabel (count) {
      let plural = ''
      if (count > 1) {
        plural = 's'
      }
      return `${count} Usuário${plural} selecionado${plural}`
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
  .div-update {
    width: 100%;
  }
  .md-dialog-update {
    width: 63%;
    height: 60%;
    overflow: auto;
  }
  .alinhar-esquerda {
    align-items: flex-end;
  }
</style>
