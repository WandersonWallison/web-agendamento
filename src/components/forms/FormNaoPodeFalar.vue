<template>
  <div class="form-proximo-contato">
    <form novalidate class="md-layout " @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
       <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Próximo Contato</span>
        </md-toolbar>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-datepicker id="data" name="data" date="true" time="true" v-model="form.data"  md-immediately :class="getValidationClass('data')">
                 <label>Data do próximo contato</label>
                 <span class="md-error" v-if="!$v.form.data.required">Data deve ser preenchido</span>
              </md-datepicker>
            </div>
            <!--
             <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('horario')">
                <label for="horario">Horário</label>
                <md-select name="horario" id="horario" v-model="form.horario" md-dense :disabled="sending">
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
            -->
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
        <div class="actions md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" type="submit" :disabled="sending">Salvar</md-button>
        </div>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import moment from 'moment'
import {mask} from 'vue-the-mask'
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'FormReagendamento',
  props: ['leadProps'],
  mixins: [validationMixin],
  data () {
    return {
      data_criacao: new Date(),
      form: {
        data: null,
        horario: null
      },
      dataAgendamento: '',
      sending: false
    }
  },
  directives: {mask},
  validations: {
    form: {
      data: {
        required
      }
    }
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
    },
    updateLead () {
      let dataValidade
      let newLead = {
        data_ligacao: moment(this.form.data).format(),
        status: 'Não Pode Falar'
        // hora: this.form.horario
      }
      dataValidade = this.validarDataAgendamento(moment(this.form.data).format())

      if (dataValidade) {
        alert('A Data do Próximo Contato não pode ser, \nMenor que a data atual !!!')
      } else {
        axios.put(process.env.API + 'leads/' + this.leadProps.id, newLead).then(response => {
          alert('Cadastado com sucesso')
          this.clearForm()
          window.location.reload()
        })
      }
    },
    validarDataAgendamento (data) {
      let dataAtual = Date()
      dataAtual = moment(dataAtual).format('YYYY-MM-DD')
      data = moment(data).format('YYYY-MM-DD')
      return moment(data).isBefore(dataAtual)
    },
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.updateLead()
      }
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
.form-proximo-contato {
  height: 100%;
  width: 100%;
}
</style>
