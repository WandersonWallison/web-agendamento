<template>
  <div class="div-tamanho">

      <form novalidate class="md-layout div-tamanho" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-toolbar md-elevation="0" class="md-dense">
            <span class="md-title">Alterar Senha</span>
          </md-toolbar>
          <md-card-content >
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field :class="getValidationClass('newSenha')">
                  <label for="newSenha">Nova Senha</label>
                  <md-input type="password" id="newSenha" name="newSenha" v-model="form.newSenha" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.newSenha.required">A senha deve ser preenchido</span>
                  <span class="md-error" v-else-if="!$v.form.newSenha.minLength">Deve conter no minino 6 caracteres</span>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field :class="getValidationClass('newConfirmSenha')">
                  <label for="newConfirmSenha">Confirmar Senha</label>
                  <md-input  type="password" id="newConfirmSenha" name="newConfirmSenha" autocomplete="newConfirmSenha" v-model="form.newConfirmSenha" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.newConfirmSenha.required">A Confirmação da senha deve ser preenchido</span>
                  <span class="md-error" v-else-if="!$v.form.newConfirmSenha.minLength">Deve conter no minino 6 caracteres</span>
                </md-field>
              </div>
            </div>
          </md-card-content>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <md-card-actions>
            <div class="actions alinha-button md-layout">
              <md-button class="md-raised md-primary botao" type="submit" :disabled="sending">Alterar</md-button>
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
  minLength
} from 'vuelidate/lib/validators'
import {TheMask} from 'vue-the-mask'

export default {
  name: 'FormAlterPassword',
  props: ['leadProps'],
  mixins: [validationMixin],
  data: () => ({
    form: {
      newSenha: null,
      newConfirmSenha: null
    },
    userAtual: null,
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  components: {TheMask},
  validations: {
    form: {
      newSenha: {
        required,
        minLength: minLength(6)
      },
      newConfirmSenha: {
        required,
        minLength: minLength(6)
      }
    }
  },
  mounted () {
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
      this.form.newSenha = null
      this.form.newConfirmSenha = null
    },
    alterarSenha () {
      if (this.form.newSenha === this.form.newConfirmSenha) {
        let user = {
          password: this.form.newSenha
        }
        axios.put(process.env.API + 'user/' + this.userAtual, user)
          .then(response => {
            this.userSaved = true
            this.sending = false
            alert('Senha alterada com sucesso')
            this.clearForm()
            window.location.reload()
          })
          .catch(error => {
            if (error.response.data.code === 'E_UNIQUE') {
              alert('Alteração não realizada, \nPor favor verificar as informações')
            }
            console.log(error.response.data)
          })
      }
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.alterarSenha()
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
