<template>
  <div class="md-dialog-container">
    <form novalidate class="md-layout" @submit.prevent="validateEmpresa">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
       <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Cadastro de Empresa</span>
        </md-toolbar>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('nomeEmpresa')">
                <label for="nomeEmpresa">Nome Empresa</label>
                <md-input id="nomeEmpresa" name="nomeEmpresa" v-model="form.nomeEmpresa" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.nomeEmpresa.required">Nome do Escritório deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.nomeEmpresa.maxlength">Invalid Escritorio</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('razaoSocial')">
                <label for="razaoSocial">Razão Social</label>
                <md-input id="razaoSocial" name="razaoSocial" v-model="form.razaoSocial" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.razaoSocial.required">Responsável do Escritorio deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.razaoSocial.maxlength">Invalid responsável</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field  :class="getValidationClass('cnpj')">
                <label for="cnpj">CNPJ</label>
                <md-input type="cnpj" name="cnpj" id="cnpj" autocomplete="cnpj" v-model="form.cnpj" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.cnpj.required">CNPJ do Escritorio deve ser preenchido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('telefone')">
                <label for="telefone">Telefone</label>
                <md-input type="number" id="telefone" name="telefone" v-model="form.telefone" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.telefone.required">telefone deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.telefone.maxlength">Invalid telefone</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">E-mail</label>
                <md-input id="email" name="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">E-mail deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.email.maxlength">Invalid rua</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="site">Site</label>
                <md-input id="site" name="site" v-model="form.site" :disabled="sending" />
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
        <div class="actions alinha-button md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" type="submit" :disabled="sending">Cadastrar</md-button>
        </div>
        </md-card-actions>
      </md-card>
      <md-snackbar :md-active.sync="userSaved">A Empresa foi salva com sucesso!</md-snackbar>
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

export default {
  name: 'FormEmpresa',
  props: ['leadProps'],
  mixins: [validationMixin],
  data: () => ({
    form: {
      nomeEmpresa: null,
      razaoSocial: null,
      cnpj : null,
      telefone:null,
      email:null,
      cnpj: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      nomeEmpresa: {
        required
      },
      razaoSocial: {
        required,
        minLength: minLength(1)
      },
      telefone: {
        required,
        minLength: minLength(1)
      },
      email: {
        required,
        email,
        minLength: minLength(1)
      },
      cnpj: {
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
      this.form.cep = null
      this.form.rua = null
      this.form.numero = null
      this.form.cidade = null
      this.form.estado = null
      this.form.observacao = null
      this.form.bairro = null

      this.form.nomeEmpresa = null
      this.form.razaoSocial = null
      this.form.site = null
      this.form.telefone = null
      this.form.email = null
      this.form.cnpj = null

    },
    saveEmpresa () {
      let newEmpresa = {
        nome: this.form.nomeEmpresa,
        razao_social: this.form.razaoSocial,
        site : this.form.site,
        telefone: this.form.telefone,
        email: this.form.email,
        cnpj: this.form.cnpj
      }
      axios.post(process.env.API + 'company', newEmpresa)
        .then(response => {
          alert('Empresa Cadastrada com Sucesso!!!')
          this.clearForm()
        })
        .catch(error => {
          alert(error.response.data)
          if(error.response.data.code = 'E_UNIQUE'){
             alert('Empresa já Cadastrado!!!  \nverifique os dados de Cadastro')
          }
          console.log(error.response)
        })
    },
    validateEmpresa () {
      console.log('Validador: '+this.$v.$invalid)
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveEmpresa()
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
.alinha-button {
  margin: 2%;
}
</style>
