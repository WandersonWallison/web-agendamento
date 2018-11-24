<template>
  <div class="conteudo-alinhamento conteiner">
  <md-conteiner class="conteiner" >
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onMouseOver">
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
      <md-table-row slot="md-table-row" slot-scope='{ item }' md-selectable="single" :class="getClass(item)">
        <md-table-cell md-label="" md-sort-by="id" md-numeric><div v-if="item.momento_atual === 5"><md-icon class='botao-red'>alarm</md-icon><md-tooltip md-direction="top">Reagendar Urgente, Agente não confirmou</md-tooltip></div></md-table-cell>
        <md-table-cell md-label="Código" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="name">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="title">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status">
          <md-button class="md-icon-button md-raised md-primary" @click="atendeu">
            <md-tooltip md-direction="top">Atendeu</md-tooltip>
            <md-icon>phone</md-icon>
          </md-button>
          <md-button class="md-icon-button butoom-03 md-accent" @click="naoAtendeu">
            <md-tooltip md-direction="top">Não Atendeu</md-tooltip>
            <md-icon>thumb_down</md-icon>
          </md-button>
          <md-button class="md-icon-button md-raised md-accent" @click="dadosIncorretos">
            <md-tooltip md-direction="top">Dados incorretos</md-tooltip>
            <md-icon>no_sim</md-icon>
          </md-button>
          <md-button class="md-icon-button butoom-02" @click="naoPodeFalar">
            <md-tooltip md-direction="top">Não pode falar</md-tooltip>
            <md-icon>mic_off</md-icon>
          </md-button>
          <md-button class="md-icon-button butoom-04" @click="naoAceitaVisita">
            <md-tooltip md-direction="top">Não aceita visita</md-tooltip>
            <md-icon>voice_over_off</md-icon>
          </md-button>
          </md-table-cell>
          <md-table-cell md-label="Marcar Agendamento" md-sort-by="marcar">
              <md-button class="md-icon-button butoom-05" @click="addSelected">
            <md-tooltip md-direction="top">Agendamento</md-tooltip>
            <md-icon>schedule</md-icon>
          </md-button>
          </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialog">
      <div class="div">
          <agenda :leadProps="leadProps"></agenda>
      </div>
    </md-dialog>
  </md-conteiner>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Agenda from '../forms/FormAgendamento.vue'
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
  name: 'ListaClientes',
  props: ['leadProps'],
  components: {
    Agenda
  },
  data: () => ({
    search: null,
    selected: {},
    searched: [],
    users: [],
    showDialog: false,
    leadProps: {},
    data_atendimento: Date.now(),
    userAtual: false
  }),
  mounted () {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2.id
    let dataAtual = moment(Date.now()).format('YYYY-MM-DD')

    axios.get(process.env.API+'leads?where={"or":[{"momento_atual": 1},{"momento_atual":5}],"id_user_editor":' + this.userAtual + '," data_expiracao ":{"<":"' + this.dataAtual + '"}}')
      .then(response => {
        this.users = response.data
        this.searched = response.data
      })
  },
  methods: {
    atendeu () {
      let newLead = {
        data_atendimento: moment(this.data_atendimento).format()
      }
      axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
        .then((response) => {
          this.results = response.data
          alert('Cliente atendeu a ligação')
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },
    naoAtendeu () {
      let newLead = {
        data_criacao: moment(this.data_atendimento).format()
      }
      axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
        .then((response) => {
          this.results = response.data
          alert('Cliente Não atendeu a ligação')
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },
    dadosIncorretos () {
      let newLead = {
        status: 'Dados Incorrtos',
        ativo: false
      }
      axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
        .then((response) => {
          this.results = response.data
          alert('Cliente com os dados incorreto')
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },
    naoPodeFalar () {
      let newLead = {
        data_criacao: moment(this.data_atendimento).format()
      }
      axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
        .then((response) => {
          this.results = response.data
          alert('No Momento não pode falar')
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },
    naoAceitaVisita () {
      let newLead = {
        status: 'Não Aceita Visita',
        ativo: false
      }
      axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
        .then((response) => {
          this.results = response.data
          alert('Cliente Não Aceita Visita')
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },
    getClass: ({ id }) => ({
      'md-primary': id
    }),
    addSelected () {
      if (!this.selected) {
        alert('Selecione um contato da lista')
      } else {
        this.showDialog = true
        this.leadProps = this.selected
      }
    },
    newUser () {
      window.alert('Noop')
    },
    onMouseOver (item) {
      this.selected = item
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
.conteudo-alinhamento {
  text-align: left;
}
.butoom-02 {
  background-color: green;
}
.butoom-03 {
  background-color: rgb(220, 235, 13);
}
.butoom-04 {
  background-color: rgb(235, 102, 13);
}
.butoom-05 {
  background-color: #15da93;
}
.div {
  overflow: auto;
  margin-left: 2%;
}
.conteiner {
  height: 100%;
}
.botao-red {
  background-color: #ff1515;
}
</style>
