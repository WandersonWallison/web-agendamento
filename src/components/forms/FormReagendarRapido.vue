<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateAgendamento">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
       <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Reagendar Rápido</span>
        </md-toolbar>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('hora')">
                <label for="hora">Hora Expiração</label>
                <md-select name="hora" id="hora" v-model="form.hora" md-dense :disabled="sending">
                  <md-option value="1">01:00</md-option>
                  <md-option value="2">02:00</md-option>
                  <md-option value="3">03:00</md-option>
                  <md-option value="4">04:00</md-option>
                  <md-option value="5">05:00</md-option>
                  <md-option value="6">06:00</md-option>
                  <md-option value="7">07:00</md-option>
                  <md-option value="8">08:00</md-option>
                  <md-option value="9">09:00</md-option>
                  <md-option value="10">10:00</md-option>
                  <md-option value="11">11:00</md-option>
                  <md-option value="12">12:00</md-option>
                  <md-option value="14">14:00</md-option>
                  <md-option value="16">16:00</md-option>
                  <md-option value="18">18:00</md-option>
                  <md-option value="20">20:00</md-option>
                  <md-option value="24">1 dia</md-option>
                  <md-option value="36">1 dia e 12:00</md-option>
                  <md-option value="48">2 dias</md-option>
                  <md-option value="72">3 dias</md-option>
                  <md-option value="96">4 dias</md-option>
                </md-select>
                <span class="md-error">Hora de expiração deve ser informado</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('minutos')">
                <label for="minutos">Minutos Expiração</label>
                <md-select name="minutos" id="minutos" v-model="form.minutos" md-dense :disabled="sending">
                  <md-option value="05">00:05</md-option>
                  <md-option value="10">00:10</md-option>
                  <md-option value="15">00:15</md-option>
                  <md-option value="20">00:20</md-option>
                  <md-option value="25">00:25</md-option>
                  <md-option value="30">00:30</md-option>
                  <md-option value="35">00:35</md-option>
                  <md-option value="40">00:40</md-option>
                  <md-option value="45">00:45</md-option>
                  <md-option value="50">00:50</md-option>
                  <md-option value="55">00:55</md-option>
                </md-select>
                <span class="md-error">Minutos de Agendamento deve ser informado</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
        <div class="actions md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" type="submit" :disabled="sending">Reagendar</md-button>
        </div>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  required
} from 'vuelidate/lib/validators'

export default {
  name: 'FormReagendarRapido',
  props: ['leadProps'],
  mixins: [validationMixin],
  data () {
    return {
      ultimo: this.leadProps.agendamentos.length - 1,
      selectedDate: null,
      disabledDates: [],
      data_criacao: new Date(),
      data_expiracao: '',
      form: {
        data: this.leadProps.agendamentos[0].data ? this.leadProps.agendamentos[0].data : null,
        horario: this.leadProps.agendamentos[0].hora ? this.leadProps.agendamentos[0].hora : null,
        hora: null,
        minutos: null
      },
      dataAgendamento: '',
      datasAgendadas: [],
      resultAgente: null,
      listAgentes: [],
      resp: [],
      agentes: [],
      results: [],
      sending: false,
      enderecoAgendamento: null
    }
  },
  validations: {
    form: {
      hora: {
        required
      },
      minutos: {
        required
      }
    }
  },
  beforeUpdate () {
    this.pegarAgenteAgendamento()
    this.data_expiracao = new Date()
  },
  mounted () {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2
    axios.get(process.env.API + 'user?where={"id_profile": 2,"id_office":' + this.userAtual.id_office + '}')
      .then(response => {
        this.resp = response.data
        for (let index = 0; index < this.resp.length; index++) {
          this.listAgentes.push(this.resp[index].id)
        }
      })
    axios.get(process.env.API + 'schedule?where={"office_schedule":' + this.userAtual.id_office + '}')
      .then(response => {
        this.dataAgendamento = response.data
        for (let i = 0; i < this.dataAgendamento.length; i++) {
          this.datasAgendadas.push(moment(this.dataAgendamento[i].data).format('YYYY-MM-DD'))
        }
        this.disabledDates = this.datasAgendadas
      })
    this.buscarEndereco()
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.data = ''
      this.form.horario = null
      this.form.minutos = null
      this.form.hora = null
    },
    saveAgenda () {
      this.pegarAgenteAgendamento()
      let newAgenda = {
        data: moment(this.form.data).format(),
        hora: this.form.horario,
        obs: this.form.observacao,
        id_lead: this.leadProps.id,
        agentes: this.resultAgente,
        office_schedule: this.leadProps.id_office,
        data_criacao: moment(this.data_criacao).format(),
        data_expiracao: moment(new Date()).add(this.form.hora, 'h').add(this.form.minutos, 'minutes').format(),
        qtd_retorno: this.leadProps.agendamentos[0].qtd_retorno + 1
      }
      let newEndereco = {
        logradouro: this.enderecoAgendamento[0].logradouro,
        numero: this.enderecoAgendamento[0].numero,
        bairro: this.enderecoAgendamento[0].bairro,
        cidade: this.enderecoAgendamento[0].cidade,
        cep: this.enderecoAgendamento[0].cep,
        uf: this.enderecoAgendamento[0].uf,
        schedule_address: ''
      }
      let newLead = {
        momento_atual: 3
      }
      axios.post(process.env.API + 'schedule', newAgenda)
        .then(response => {
          newEndereco.schedule_address = response.data.id
          axios.post(process.env.API + 'address', newEndereco)
            .then(response => {
              this.sending = false
              /* Axios de Atualizar o lead para momento_atual = 3  */
              axios.put(process.env.API + 'leads/' + this.leadProps.id, newLead)
                .then(response => {
                  alert('Agendamento cadastado com sucesso')
                  this.deletaAgendamento()
                  this.clearForm()
                  window.location.reload()
                })
            })
            .catch(error => {
              alert('Erro no cadastro de Endereco ' + error)
              console.log(error.response.data)
            })
        })
        .catch(error => {
          alert('agenda ' + error.response.data.code)
          console.log(error.response.data)
        })
    },
    validateAgendamento () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveAgenda()
      }
    },
    deletaAgendamento () {
      axios.delete(process.env.API + 'schedule/' + this.leadProps.agendamentos[0].id)
        .then(response => {})
    },
    pegarAgenteAgendamento () {
      if (this.listAgentes) {
        let x = Math.floor((Math.random() * this.listAgentes.length))
        // let data = moment(this.form.data).format('YYYY-MM-DD')
        this.resultAgente = this.listAgentes[x]
      } else {
        alert('Não há Agentes cadastrado para o seu escritório')
      }
    },
    buscarEndereco () {
      axios.get(process.env.API + 'address?where={"schedule_address":' + this.leadProps.agendamentos[0].id + '}')
        .then(response => {
          this.enderecoAgendamento = response.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
}
</style>
