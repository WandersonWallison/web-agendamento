<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
       <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Agendamento</span>
        </md-toolbar>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-datepicker id="data" name="data" date="true" time="true" v-model="form.data" :md-disabled-dates="disabledDates" :class="getValidationClass('data')">
                 <label>Data Agendamento</label>
                 <span class="md-error" v-if="!$v.form.data.required">Data deve ser preenchido</span>
              </md-datepicker>
            </div>
             <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('horario')">
                <label for="horario">Horário</label>
                <md-select name="horario" id="horario" v-model="form.horario" md-dense :disabled="sending">
                  <md-option  value=""></md-option>
                  <md-option value="1">08:00</md-option>
                  <md-option value="2">09:00</md-option>
                  <md-option value="3">10:00</md-option>
                  <md-option value="4">11:00</md-option>
                  <md-option value="5">14:00</md-option>
                  <md-option value="6">15:00</md-option>
                  <md-option value="7">16:00</md-option>
                  <md-option value="8">17:00</md-option>
                  <md-option value="9">18:00</md-option>
                  <md-option value="10">19:00</md-option>
                  <md-option value="11">20:00</md-option>
                  <md-option value="12">21:00</md-option>
                  <md-option value="13">22:00</md-option>
                </md-select>
                <span class="md-error">Hórario de Agendamento deve ser informado</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('rua')">
                <label for="rua">Rua</label>
                <md-input id="rua" name="rua" v-model="form.rua" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.rua.required">Rua deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.rua.maxlength">Invalid rua</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('numero')">
                <label for="numero">Número</label>
                <md-input  type="number" id="numero" name="numero" autocomplete="numero" v-model="form.numero" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.numero.required">Número deve ser preenchido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cep')">
                <label for="cep">CEP</label>
                <md-input  type="number" id="cep" name="cep" autocomplete="cep" v-model="form.cep" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.cep.required">Cep deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.cep.maxlength">Cep invalido</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('bairro')">
                <label for="bairro">Bairro</label>
                <md-input id="bairro" name="bairro" autocomplete="bairro" v-model="form.bairro" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.rua.required">Bairro deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.rua.maxlength">Invalid Bairro</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cidade')">
                <label for="cidade">Cidade</label>
                <md-input id="cidade" name="cidade" autocomplete="cidade" v-model="form.cidade" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.cep.required">Cidade deve ser preenchido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('estado')">
                <label for="estado">Estado</label>
                <md-select name="estado" id="estado" v-model="form.estado" md-dense :disabled="sending">
                  <md-option velue=""></md-option>
                    <md-option value="ac">Acre</md-option>
                    <md-option value="al">Alagoas</md-option>
                    <md-option value="am">Amazonas</md-option>
                    <md-option value="ap">Amapá</md-option>
                    <md-option value="ba">Bahia</md-option>
                    <md-option value="ce">Ceará</md-option>
                    <md-option value="df">Distrito Federal</md-option>
                    <md-option value="es">Espírito Santo</md-option>
                    <md-option value="go">Goiás</md-option>
                    <md-option value="ma">Maranhão</md-option>
                    <md-option value="mt">Mato Grosso</md-option>
                    <md-option value="ms">Mato Grosso do Sul</md-option>
                    <md-option value="mg">Minas Gerais</md-option>
                    <md-option value="pa">Pará</md-option>
                    <md-option value="pb">Paraíba</md-option>
                    <md-option value="pr">Paraná</md-option>
                    <md-option value="pe">Pernambuco</md-option>
                    <md-option value="pi">Piauí</md-option>
                    <md-option value="rj">Rio de Janeiro</md-option>
                    <md-option value="rn">Rio Grande do Norte</md-option>
                    <md-option value="ro">Rondônia</md-option>
                    <md-option value="rs">Rio Grande do Sul</md-option>
                    <md-option value="rr">Roraima</md-option>
                    <md-option value="sc">Santa Catarina</md-option>
                    <md-option value="se">Sergipe</md-option>
                    <md-option value="sp">São Paulo</md-option>
                    <md-option value="to">Tocantins</md-option>
                </md-select>
                <span class="md-error">Estado não selecioando</span>
              </md-field>
            </div>
          </div>
          <md-field>
            <label for="observacao">Observação</label>
            <md-input type="observacao" name="observacao" id="observacao" autocomplete="observacao" v-model="form.observacao" :disabled="sending" />
          </md-field>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
        <div class="actions md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" type="submit" :disabled="sending">Agendar</md-button>
        </div>
        </md-card-actions>
      </md-card>
      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'FormAgenda',
  props: ['leadProps'],
  mixins: [validationMixin],
  data: () => ({
    form: {
      data: null,
      horario: null,
      cep: null,
      rua: null,
      numero: null,
      estado: null,
      cidade: null,
      bairro: null,
      observacao: null
    },
    resultAgente: null,
    listAgentes:[],
    resp: [],
    agentes: [],
    results: [],
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      data: {
        required
      },
      horario: {
        required,
        minLength: minLength(1)
      },
      rua: {
        required,
        minLength: minLength(4)
      },
      numero: {
        required,
        minLength: minLength(1)
      },
      cep: {
        required,
        minLength: minLength(5)
      },
      cidade: {
        required,
        minLength: minLength(3)
      },
      estado: {
        required,
        minLength: minLength(2)
      },
      bairro: {
        required,
        minLength: minLength(3)
      }
    }
  },
  beforeUpdate(){
     this.getAgente()
  },
  mounted () {
    axios.get(process.env.API + 'user?where={"id_profile": 2}')
    .then(response => {
    this.resp = response.data
     for (let index = 0; index < this.resp.length; index++) {
            this.listAgentes.push(this.resp[index].id)
        }
  })
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
      this.form.email = null
      this.form.cep = null
      this.form.rua = null
      this.form.numero = null
      this.form.cidade = null
      this.form.estado = null
      this.form.observacao = null
      this.form.bairro = null
    },
    saveAgenda () {

      let newAgenda = {
        data: moment(this.form.data).format(),
        hora: this.form.horario,
        obs: this.form.observacao,
        id_lead: this.leadProps.id,
        agentes: this.resultAgente
      }
      let newEndereco = {
        rua: this.form.rua,
        numero: this.form.numero,
        bairro: this.form.bairro,
        cidade: this.form.cidade,
        cep: this.form.cep,
        uf: this.form.estado,
        schedule_address: ''
      }
      axios.post(process.env.API + 'schedule', newAgenda)
        .then(response => {
          newEndereco.schedule_address = response.data.id
          axios.post(process.env.API + 'address', newEndereco)
          .then(response => {
            alert('Agendamento cadastado com success')
            this.userSaved = true
            this.sending = false
            this.clearForm()
            window.location.reload()
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
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveAgenda()
      }
    },
    getAgente () {
      const finalArray = []
      let data = moment(this.form.data).format('YYYY-MM-DD')
      axios.get(process.env.API + 'schedule/?data=' + data)
      .then(response => {
        this.results = response.data
        for (let index = 0; index < this.results.length; index++) {
            if(this.results[index].agentes){
              this.agentes.push(this.results[index].agentes.id)
            }
        }
        this.listAgentes.forEach((element) => this.agentes.forEach((element2) => {
           if (element != element2){
              finalArray.push(element)
           }
        })
        )
      this.resultAgente = finalArray[(finalArray.length-1)]
      })
      .catch(error => {
          console.log(error)
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
