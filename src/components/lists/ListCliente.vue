<template>
  <div class="conteudo-alinhamento conteiner">
    <!-- Dialog da observação  -->
    <md-dialog-prompt
      :md-active.sync="objLead"
      v-model="valueLead"
      md-title="Observação"
      md-input-maxlength="40"
      md-input-placeholder="Escreva a observação"
      md-confirm-text="Salvar"
      @md-confirm='addObservacao'/>
    <!-- Fim da Observação -->
    <!-- Dialog do reagendamento -->
    <md-dialog :md-active.sync="showDialogReagendamento">
      <md-tabs md-dynamic-height>
        <md-tab md-label="Cliente">
          <p>Nome: {{ this.agendamento.nome }}</p>
          <p>E-mail: {{ this.agendamento.email }}</p>
          <p>Telefone: {{ this.agendamento.telefone }}</p>
          <p>Celular: {{ this.agendamento.celular }}</p>
        </md-tab>
        <md-tab md-label="Agendamento">
          <p>Codigo: {{ this.agendamento.codigo }}</p>
          <p>Data: {{ this.agendamento.data | maskData }}</p>
          <p>Hora: {{ this.agendamento.hora | maskHora }}</p>
          <p>Motivo: {{ this.agendamento.motivo }}</p>
          <p>Retorno: {{ this.agendamento.retorno }}</p>
        </md-tab>
        <md-tab md-label="Assessor">
          <p>Nome: {{ this.agendamento.nomeAgente }}</p>
          <p>Telefone: {{ this.agendamento.telefoneAgente }}</p>
          <p>E-mail: {{ this.agendamento.emailAgente }}</p>
          <p>CVM: {{ this.agendamento.cvmAgente }}</p>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogReagendamento = false">Sair</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- Fim do reagendamento  -->
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onMouseOver">
       <br/>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class='md-title'>Agendar visitas</h1>
        </div>
        <!-- Inicio do Menu suspenso do Hunter -->
        <div>
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
          <md-button class="md-icon-button butoom-05" @click="addSelected">
            <md-tooltip md-direction="top">Agendamento</md-tooltip>
            <md-icon>schedule</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope='{ item }' md-selectable="single"  :class="getClass(item)">
        <md-table-cell md-label="">
          <div v-if="item.momento_atual === 5" @click="showDialogReagendamento2" >
            <span style="color: red;">{{ item.agendamentos[0].qtd_retorno }}</span>
            <md-icon class='md-icon-button md-raised md-accent'>alarm</md-icon>
            <md-tooltip md-direction="top">Reagendar Urgente, Agente não confirmou. Clique duas vezes para mais detalhes </md-tooltip>
          </div>
        </md-table-cell>
        <md-table-cell md-label="Código" md-sort-by="id" >{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="name">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="Celular" md-sort-by="celular">{{ item.celular }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Observações" md-sort-by="obsevacoes">{{ item.obs }}
          <md-tooltip md-direction="top">{{ item.obs }}</md-tooltip>
        </md-table-cell>
        <md-table-cell md-label="Ações" style="text-align: center;">
            <md-button class="md-icon-button butoom-06" v-if="item.momento_atual === 5" @click="reagendamentoRapido()" >
              <md-tooltip md-direction="top">Agendar Rápido</md-tooltip>
              <md-icon>input</md-icon>
            </md-button>
            <md-button class="md-icon-button butoom-06" v-if="item.momento_atual === 5" @click="addSelectedReagendamento()">
              <md-tooltip md-direction="top">Reagendamento</md-tooltip>
              <md-icon>restore</md-icon>
            </md-button>
            <md-button class="md-icon-button butoom-06" @click="objLead=true">
              <md-tooltip md-direction="top">Adicionar Observação</md-tooltip>
              <md-icon>insert_comment</md-icon>
            </md-button>
            <md-button class="md-icon-button butoom-06" @click="mupdateLead">
              <md-tooltip md-direction="top">Editar Lead</md-tooltip>
              <md-icon>edit</md-icon>
            </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialog" class="dialog-agendamento">
      <div class="div">
          <agenda :leadProps="leadProps"></agenda>
      </div>
    </md-dialog>
    <md-dialog :md-active.sync="showDialogReagendamento3" class="dialog-agendamento">
      <div class="div">
          <reagendamento :leadProps="leadProps"></reagendamento>
      </div>
    </md-dialog>
    <md-dialog :md-active.sync="showDialogReagendamento4" class="dialog-agendamento">
      <div class="div">
          <reagendar-rapido :leadProps="leadProps"></reagendar-rapido>
      </div>
    </md-dialog>
    <md-dialog :md-active.sync="showUpdateLead">
      <update-lead :leadProps="leadProps"></update-lead>
    </md-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import Agenda from '../forms/FormAgendamento.vue'
import Reagendamento from '../forms/FormReagendamento.vue'
import ReagendarRapido from '../forms/FormReagendarRapido.vue'
import UpdateLead from '../forms/FormUpdateLeadAgendamento.vue'
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
  listaCliente: 'ListaClientes',
  props: ['leadProps'],
  components: {
    Agenda,
    Reagendamento,
    ReagendarRapido,
    UpdateLead
  },
  data: () => ({
    search: null,
    selected: {},
    searched: [],
    users: [],
    showDialog: false,
    showDialogReagendamento: false,
    showDialogReagendamento3: false,
    showDialogReagendamento4: false,
    showUpdateLead: false,
    leadProps: {},
    data_atendimento: Date.now(),
    userAtual: false,
    objLead: false,
    valueLead: null,
    agendamento: {
      nome: null,
      email: null,
      telefone: null,
      celular: null,
      codigo: null,
      data: null,
      hora: null,
      motivo: null,
      retorno: null,
      idAgente: null,
      nomeAgente: null,
      telefoneAgente: null,
      emailAgente: null,
      cvmAgente: null
    }

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
    }
  },
  mounted () {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2.id
    let dataAtual = moment(Date.now()).format('YYYY-MM-DD')
    axios.get(process.env.API + 'leads?where={"or":[{"momento_atual":1},{"momento_atual":5}],"id_user_editor":' + this.userAtual + ',"data_expiracao":{">":"' + dataAtual + '"}}')
      .then(response => {
        this.users = response.data
        this.searched = response.data
      })
  },
  methods: {
    atendeu () {
      if (this.selected !== null && this.selected.id) {
        let newLead = {
          data_atendimento: moment(this.data_atendimento).format()
        }
        axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
          .then(response => {
            this.results = response.data
            alert('Cliente atendeu a ligação')
            // window.location.reload()
          })
          .catch(error => {
            alert('Selecione um contato')
            console.log(error.response.data)
          })
      } else {
        alert('Por Favor \n selecione um contato para realizar solicitação! ')
      }
    },
    naoAtendeu () {
      if (this.selected !== null && this.selected.id) {
        let newLead = {
          data_criacao: moment(this.data_atendimento).format(),
          status: 'Não Atendeu'
        }
        axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
          .then(response => {
            this.results = response.data
            alert('Cliente Não atendeu a ligação')
            window.location.reload()
          })
          .catch(error => {
            alert('Selecione um contato')
            console.log(error.response.data)
          })
      } else {
        alert('Por Favor \n selecione um contato para realizar solicitação! ')
      }
    },
    dadosIncorretos () {
      if (this.selected !== null && this.selected.id) {
        let newLead = {
          status: 'Dados Incorretos',
          ativo: false
        }
        axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
          .then(response => {
            this.results = response.data
            alert('Cliente com os dados incorreto')
            window.location.reload()
          })
          .catch(error => {
            alert('Selecione um contato')
            console.log(error.response.data)
          })
      } else {
        alert('Por Favor \n selecione um contato para realizar solicitação! ')
      }
    },
    naoPodeFalar () {
      if (this.selected !== null && this.selected.id) {
        let newLead = {
          data_criacao: moment(this.data_atendimento).format(),
          status: 'Não pode falar'
        }
        axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
          .then(response => {
            this.results = response.data
            alert('No Momento não pode falar')
            window.location.reload()
          })
          .catch(error => {
            alert('Selecione um contato')
            console.log(error.response.data)
          })
      } else {
        alert('Por Favor \n selecione um contato para realizar solicitação! ')
      }
    },
    naoAceitaVisita () {
      if (this.selected !== null && this.selected.id) {
        let newLead = {
          status: 'Não Aceita Visita',
          ativo: false
        }
        axios.put(process.env.API + 'leads/' + this.selected.id, newLead)
          .then(response => {
            this.results = response.data
            alert('Cliente Não Aceita Visita')
            window.location.reload()
          })
          .catch(error => {
            alert('Selecione um contato')
            console.log(error.response.data)
          })
      } else {
        alert('Por Favor \n selecione um contato para realizar solicitação! ')
      }
    },
    showDialogReagendamento2 () {
      this.agendamento.nome = this.selected.nome
      this.agendamento.email = this.selected.email
      this.agendamento.telefone = this.selected.telefone
      this.agendamento.celular = this.selected.celular
      this.agendamento.idAgente = this.selected.agendamentos[0].agentes
      // -------------------------------------------------------------
      this.agendamento.codigo = this.selected.agendamentos[0].id
      this.agendamento.data = this.selected.agendamentos[0].data
      this.agendamento.hora = this.selected.agendamentos[0].hora
      this.agendamento.motivo = this.selected.agendamentos[0].motivo
      this.agendamento.retorno = this.selected.agendamentos[0].qtd_retorno

      axios.get(process.env.API + 'user/' + this.agendamento.idAgente)
        .then(response => {
          this.agendamento.nomeAgente = response.data.username
          this.agendamento.cvmAgente = response.data.cvm
          this.agendamento.emailAgente = response.data.email
          this.agendamento.telefoneAgente = response.data.telefone
        })
        .catch(error => {
          alert('erro na busca de agente' + error)
        })
      if (this.selected.id) {
        this.showDialogReagendamento = true
      } else {
        this.showDialogReagendamento = false
        alert('Selecione o contato para realizar a visualização!!')
      }
    },
    mupdateLead () {
      if (!this.selected) {
        alert('Selecione um lead para edição')
      } else {
        this.showUpdateLead = true
        this.leadProps = this.selected
      }
    },
    getClass: ({ id }) => ({
      'md-primary': id
    }),
    addSelected () {
      if (this.selected !== null && this.selected.id) {
        if (this.selected.momento_atual === 5) {
          alert(' Lead já agendando precisa realizar um \n Reagendamento Rapido ou Ligar para o cliente \n para um reagendamento !!!')
        } else {
          this.showDialog = true
          this.leadProps = this.selected
        }
      } else {
        alert('Selecione um contato da lista')
      }
    },
    addSelectedReagendamento () {
      if (this.selected !== null && this.selected.id) {
        this.showDialogReagendamento3 = true
        this.leadProps = this.selected
      } else {
        alert('Selecione um contato da lista')
      }
    },
    reagendamentoRapido () {
      if (this.selected !== null && this.selected.id) {
        this.showDialogReagendamento4 = true
        this.leadProps = this.selected
      } else {
        alert('Selecione um contato da lista')
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
    },
    addObservacao () {
      if (this.selected) {
        let lead = {
          obs: this.selected.obs + 'Hunter: ' + this.valueLead
        }
        axios.put(process.env.API + 'leads/' + this.selected.id, lead)
          .then(response => {
            this.objLead = false
            window.location.reload(this.listaCliente)
          })
          .catch(error => {
            if (error.response.data.code === 'E_UNIQUE') {
              alert('Erro na alteração de senha')
            }
          })
      } else {
        alert(' Por favor selecionar uma cliente \n para adicionar Observações! ')
      }
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
.butoom-06 {
  background-color: honeydew;
}
.div {
  overflow: auto;
  /* margin-left: 2%; */
}
.conteiner {
  height: 100%;
}
.botao-red {
  background-color: #ff1515;
}
.dialog-agendamento {
  width: 70%;
}
.md-dialog {
  max-width: 768px;
}
</style>
