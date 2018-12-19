<template>
  <div>
    <form novalidate class='md-layout' @submit.prevent='validateUser'>
      <md-toolbar md-elevation='1' class='md-dense'>
          <span class='md-title'>Adicionar Conta</span>
      </md-toolbar>
      <md-card class='md-layout-item md-size-100 md-small-size-100'>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('banco')">
                <label for="banco">Banco</label>
                <md-select name="banco" id="banco" v-model="selectedbanco">
                  <md-option v-for="banco in bancos" :key="banco.id" :value="banco.code +' - '+ banco.name">
                    {{ banco.code +' - '+ banco.name }}
                  </md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.conta.required">Banco não selecionado</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('conta')">
                  <label for="conta">Conta</label>
                  <md-input id="conta" name="conta" v-model="form.conta" :disabled="sending" v-mask = "'###################'" />
                  <span class="md-error" v-if="!$v.form.conta.required">conta deve ser preenchido</span>

                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('agencia')">
                  <label for="agencia">Agencia</label>
                  <md-input id="agencia" name="agencia" v-model="form.agencia" :disabled="sending" v-mask = "'########'" />
                  <span class="md-error" v-if="!$v.form.agencia.required">agencia deve ser preenchido</span>
                </md-field>
              </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('renda')">
                <label for="renda">Renda</label>
                <md-input id="renda" name="renda" v-model="form.renda" :disabled="sending" v-mask = "'#########,##'" />
                <span class="md-error" v-if="!$v.form.renda.required">Renda deve ser preenchido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('aplicacao')">
                <label for="aplicacao">Aplicação</label>
                <md-input id="aplicacao" name="aplicacao" v-model="form.aplicacao" :disabled="sending" v-mask = "'###################'" />
                <span class="md-error" v-if="!$v.form.aplicacao.required">Aplicacao deve ser preenchido</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
        <div class="alinha-button actions md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" type="submit" :disabled="sending">Cadastrar</md-button>
        </div>
        </md-card-actions>
      </md-card>
      <!--<md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with sucesso!</md-snackbar> -->
    </form>
  </div>
</template>
<script>
import {mask} from 'vue-the-mask'
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  required
} from 'vuelidate/lib/validators'
export default {
  name: 'FormBanco',
  props: ['selected'],
  mixins: [validationMixin],
  data: () => ({
    form: {
      agencia: null,
      renda: null,
      aplicacao: null,
      estado: null,
      conta: null,
      bairro: null,
      selected: null
    },
    bairro: null,
    userSaved: false,
    sending: false,
    bancos: [],
    selectedbanco: null
  }),
  directives: {mask},
  mounted () {
    axios.get('http://brazilian-banks-api.herokuapp.com/')
      .then(response => {
        this.bancos = response.data
      })
  },
  validations: {
    form: {
      banco: {
        required
      },
      renda: {
        required
      },
      aplicacao: {
        required
      },
      agencia: {
        required
      },
      conta: {
        required
      }
    },
    selectedbanco: {
      required
    }

  },
  created () {
    axios.get(process.env.API + 'office')
      .then(response => {
        this.offices = response.data
      })
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      this.teste = field
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.agencia = null
      this.form.renda = null
      this.form.aplicacao = null
      this.form.conta = null
      this.selectedbanco = null
    },
    saveConta () {
      let newConta = {
        nome: this.selectedBanco,
        ag: this.form.agencia,
        n_conta: this.form.conta,
        renda: this.form.renda,
        aplicacao: this.form.aplicacao,
        leads_bank: this.selected[0].id
      }
      axios.post(process.env.API + 'bank', newConta)
        .then(response => {
          this.results = response.data
          alert('Conta adicionado ' + this.selected[0].nome + 'com sucesso')
          window.location.reload()
          console.log(response.data)
        })
        .catch(error => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveConta()
      }
    },
    retiraMascara (campo) {
      campo = campo.replace(/\D/g, '') // Remove tudo o que não é dígito
      return campo
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
.alinha-button {
  margin: 2%;
}
.campos-text {
  width: 100%;
}
.alinhar-cabecario {
  margin-left: 0%;
}
</style>
