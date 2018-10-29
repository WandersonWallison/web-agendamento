<template>
  <div class="div-tamanho">
      <form novalidate class="md-layout div-tamanho" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-toolbar md-elevation="0" class="md-dense">
            <span class="md-title">Cadastro de Contato</span>
          </md-toolbar>
          <md-card-content >
            <div class="md-layout md-gutter">
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('nomeCompleto')">
                  <label for="nomeCompleto">Nome Completo</label>
                  <md-input id="nomeCompleto" name="nomeCompleto" v-model="form.nomeCompleto" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.nomeCompleto.required">Nome deve ser preenchido</span>
                  <span class="md-error" v-else-if="!$v.form.nomeCompleto.maxlength">Invalid Nome Completo</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('email')">
                  <label for="email">E-mail</label>
                  <md-input  type="email" id="email" name="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.email.required">E-mail deve ser preenchido</span>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('telefone')">
                  <the-mask class="campos-text" id="telefone" name="telefone" v-model="form.telefone" :disabled="sending" :mask="['(##) ####-####','(##) ####-####']" placeholder="Telefone"/>
                  <span class="md-error" v-if="!$v.form.telefone.required">Telefone deve ser preenchido</span>
                  <span class="md-error" v-else-if="!$v.form.telefone.maxlength">telefone invalido</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('celular')">
                  <the-mask class="campos-text" id="celular" name="celular" v-model="form.celular" :disabled="sending" :mask="['(##) #####-####','(##) #####-####']" placeholder="Celular"/>
                  <span class="md-error" v-if="!$v.form.celular.required">Celular deve ser preenchido</span>
                  <span class="md-error" v-else-if="!$v.form.celular.maxlength">Invalid celular</span>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
            </div>
            <md-field :class="getValidationClass('observacao')">
              <label for="observacao">Observação</label>
              <md-textarea type="observacao" name="observacao" id="observacao" autocomplete="observacao" v-model="form.observacao" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.observacao.required">Observacão deve ser preenchida</span>
              <md-icon>description</md-icon>
            </md-field>
          </md-card-content>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <md-card-actions>
          <div class="actions alinha-button md-layout">
            <md-button class="md-raised md-primary botao" type="submit" :disabled="sending">Cadastrar</md-button>
          </div>
          </md-card-actions>
        </md-card>
      </form>
  </div>
</template>
<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators'
import moment from 'moment'
import {TheMask} from 'vue-the-mask'

export default {
  name: 'FormCadastroLead',
  props: ['leadProps'],
  mixins: [validationMixin],
  data: () => ({
    form: {
      nomeCompleto: null,
      email: null,
      telefone: null,
      celular: null,
      observacao: null
    },
    userAtual: null,
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  components: {TheMask},
  validations: {
    form: {
      nomeCompleto: {
        required
      },
      email: {
        required,
        minLength: minLength(5),
        email
      },
      telefone: {
        required,
        minLength: minLength(4)
      },
      celular: {
        required,
        minLength: minLength(1)
      },
      observacao: {
        required
      }
    }
  },
  mounted() {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2.id
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
      this.form.nomeCompleto = null
      this.form.telefone = null
      this.form.celular = null
      this.form.email = null
      this.form.observacao = null
    },
    saveContato () {
      let newLead = {
        nome: this.form.nomeCompleto,
        email: this.form.email,
        telefone: this.form.telefone,
        celular: this.form.celular,
        obs: this.form.observacao,
        data_criacao: moment(Date.now()).format(),
        id_user_criador: this.userAtual
      }
      axios.post(process.env.API + 'leads', newLead)
        .then(response => {
          this.userSaved = true
          this.sending = false
          alert('Contato cadastado com sucesso')
          this.clearForm()
        })
        .catch(error => {
          if (error.response.data.code === 'E_UNIQUE') {
            alert('Contato já cadastrado, \nPor favor verificar as informações')
          }
          console.log(error.response.data)
        })
    },
    validateUser () {

      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveContato()
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
  .div-tamanho {
    height: 100%;
  }
  .alinha-button {
    margin: 2%;
  }
  .campos-text {
  width: 100%;
}
</style>
