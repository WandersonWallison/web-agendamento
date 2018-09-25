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
                  <span class="md-error" v-else-if="!$v.form.newSenha.minLength">A Nova Senha deve conter no minino 8 caracteres</span>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field :class="getValidationClass('newConfirmSenha')">
                  <label for="newConfirmSenha">Confirmar Senha</label>
                  <md-input  type="password" id="newConfirmSenha" name="newConfirmSenha" autocomplete="newConfirmSenha" v-model="form.newConfirmSenha" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.newConfirmSenha.required">A Confirmação da senha deve ser preenchido</span>
                  <span class="md-error" v-else-if="!$v.form.newConfirmSenha.minLength">A Nova Senha deve conter no minino 8 caracteres</span>
                </md-field>
              </div>
            </div>
            {{teste}}
          </md-card-content>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <md-card-actions>
            <div class="actions alinha-button md-layout">
              <md-button class="md-raised md- botao"  :disabled="sending">Cancelar</md-button>
            </div>
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
  minLength,
  email
} from 'vuelidate/lib/validators'
import moment from 'moment'
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
        minLength: minLength(8)
      },
      newConfirmSenha: {
        required,
        minLength: minLength(8)
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
      this.form.newSenha = null
      this.form.newConfirmSenha = null

    },
    somenteNumeros (num) {
        var er = /[^0-9.]/
        er.lastIndex = 0
        var campo = num
        if (er.test(campo.value)) {
          campo.value = ''
        }
    },
    saveContato () {


      alert('chegou no save')
      if(this.form.newSenha == this.form.newConfirmSenha){
        let user = {
          password: this.form.newSenha
        }
        alert('passou no if')
        axios.put(process.env.API + 'user/'+this.userAtual,user)
        .then(response => {
          this.userSaved = true
          this.sending = false
          alert('Senha alterada com sucesso')
          this.clearForm()
        })
        .catch(error => {
          if (error.response.data.code === 'E_UNIQUE') {
            alert('Contato já cadastrado, \nPor favor verificar as informações')
          }
          console.log(error.response.data)
        })
      }

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
