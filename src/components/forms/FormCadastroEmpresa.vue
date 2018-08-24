<template>
  <div>
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
          <br>
          <md-toolbar md-elevation="0" class="md-dense">
            <span class="md-title">Endereço</span>
          </md-toolbar>
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
      cep: null,
      rua: null,
      numero: null,
      estado: null,
      cidade: null,
      bairro: null,
      observacao: null,      
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
        rezao_social: this.form.razaoSocial,
        site : this.form.site,
        telefone: this.form.telefone,
        email: this.form.email,        
        cnpj: this.form.cnpj
      }
      let newEndereco = {
        rua: this.form.rua,
        numero: this.form.numero,
        bairro: this.form.bairro,
        cidade: this.form.cidade,
        cep: this.form.cep,
        uf: this.form.estado
      }
      alert('Testando o envio: '+newEmpresa)
      axios.post(process.env.API + 'company', newEmpresa)
        .then(response => {
          newEndereco.office_address = response.data.id
          axios.post(process.env.API + 'address', newEndereco)
          .then(response => {            
            alert('Empresa cadastada com successo')
            this.userSaved = true
            this.sending = false
            this.clearForm()
            window.location.reload()
          })
          .catch(error => {
            alert('Erro endereco ' + error)
            console.log(error.response.data)
          })
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
