<template>
  <div class="div-update">
    <form novalidate class="md-layout" @submit.prevent="validateLead">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <md-toolbar md-elevation="0" class="md-dense">
            <span class="md-title">Alterar Lead</span>
          </md-toolbar>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('nome')">
                <label for="nome">Nome Completo</label>
                <md-input name="nome" id="nome" autocomplete="given-name" v-model="form.nome" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.nome.required">Nome é requerido</span>
                <span class="md-error" v-else-if="!$v.form.nome.minlength">Nome inválido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">E-mail</label>
                <md-input name="email" id="email" autocomplete="family-name" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">E-mail é requerido</span>
                <span class="md-error" v-else-if="!$v.form.email.minlength">E-mail inválido</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('telefone')">
                <label for="telefone">Telefone</label>
                <md-input id="telefone" name="telefone" autocomplete="telefone" v-model="form.telefone" :disabled="sending" v-mask = "'(##) ####-####'" />
                <span class="md-error" v-if="!$v.form.telefone.required">Teleone é requerido</span>
                <span class="md-error" v-else-if="!$v.form.telefone.maxlength">Telefone inválido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('celular')">
                <label for="celular">Celular</label>
                <md-input name="celular" id="celular" autocomplete="given-name" v-model="form.celular" :disabled="sending" v-mask = "'(##) #####-####'" />
                <span class="md-error" v-if="!$v.form.celular.required">Celular é nescessário</span>
                <span class="md-error" v-else-if="!$v.form.celular.minlength">Número celular inválido</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions class="md-card-update">
          <md-button type="submit" class=" md-raised md-primary" :disabled="sending">Atualizar</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import {mask} from 'vue-the-mask'
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength

} from 'vuelidate/lib/validators'

export default {
  name: 'FormUpdadeLeadAgendamento',
  props: ['leadProps'],
  mixins: [validationMixin],
  data () {
    return {
      form: {
        nome: null,
        email: null,
        telefone: null,
        celular: null,
        obs: null
      },
      results: []
    }
  },
  validations: {
    form: {
      nome: {
        required,
        minLength: minLength(3)
      },
      telefone: {
        required,
        minLength: minLength(9)
      },
      celular: {
        required,
        minLength: minLength(9)
      },
      email: {
        required,
        email
      }
    }
  },
  directives: {mask},
  mounted () {
    this.form.nome = this.leadProps.nome
    this.form.telefone = this.leadProps.telefone
    this.form.email = this.leadProps.email
    this.form.celular = this.leadProps.celular
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
      this.form.nome = null
      this.form.email = null
      this.form.telefone = null
      this.form.celular = null
      this.form.email = null
    },
    updateLead () {
      this.sending = true
      let newLead = {
        nome: this.form.nome,
        email: this.form.email,
        telefone: this.form.telefone,
        celular: this.form.celular
      }
      axios.put(process.env.API + 'leads/' + this.leadProps.id, newLead)
        .then(response => {
          this.results = response.data
          alert('Lead alterado com sucesso')
          window.location.reload()
        })
        .catch(error => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },
    validateLead () {
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
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .div-update {
    width: 100%;
    height: 100%;
  }
  .md-card-update {
    margin-right: 5%;
    margin-top:  2%;

  }
</style>
