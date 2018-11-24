<template>
  <div>
    <form novalidate class='md-layout' @submit.prevent='validateUser'>
      <md-toolbar md-elevation='1' class='md-dense'>
          <span class='md-title'>Adicionar Endereço</span>
      </md-toolbar>
      <md-card class='md-layout-item md-size-100 md-small-size-100'>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cep')">
                <label for="cep">CEP</label>
                <md-input id="cep" name="cep" v-model="form.cep" :disabled="sending" v-mask = "'#####-###'" />
                <span class="md-error" v-if="!$v.form.cep.required">Cep deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.cep.maxlength">Cep invalido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('estado')">
                <label for="estado">Estados</label>
                <md-select v-model="form.estado" name="estado" id="estado">
                  <md-option value=12>Acre</md-option>
                  <md-option value=27>Alagoas</md-option>
                  <md-option value=16>Amapá</md-option>
                  <md-option value=13>Amazonas</md-option>
                  <md-option value=29>Bahia</md-option>
                  <md-option value=23>Ceará</md-option>
                  <md-option value=53>Distrito Federal</md-option>
                  <md-option value=32>Espírito Santo</md-option>
                  <md-option value=52>Goiás</md-option>
                  <md-option value=21>Maranhão</md-option>
                  <md-option value=51>Mato Grosso</md-option>
                  <md-option value=50>Mato Grosso do Sul</md-option>
                  <md-option value=31>Minas Gerais</md-option>
                  <md-option value=15>Pará</md-option>
                  <md-option value=25>Paraíba</md-option>
                  <md-option value=41>Paraná</md-option>
                  <md-option value=26>Pernambuco</md-option>
                  <md-option value=22>Piauí</md-option>
                  <md-option value=33>Rio de Janeiro</md-option>
                  <md-option value=24>Rio Grande do Norte</md-option>
                  <md-option value=43>Rio Grande do Sul</md-option>
                  <md-option value=11>Rondônia</md-option>
                  <md-option value=14>Roraima</md-option>
                  <md-option value=42>Santa Catarina</md-option>
                  <md-option value=35>São Paulo</md-option>
                  <md-option value=28>Sergipe</md-option>
                  <md-option value=17>Tocantins</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.estado.required">Estado deve ser selecionado</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cidade')">
                <label for="cidade">Cidade</label>
                <md-select name="cidade" id="cidade" v-model="selectedCidade">
                  <md-option v-for="cidade in cidades" :key="cidade.id" :value="cidade.nome">
                    {{ cidade.nome }}
                  </md-option>
                </md-select>
                <span class="md-error">Cidade não selecionado</span>
              </md-field>
            </div>

          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('rua')">
                <label for="rua">Logradouro</label>
                <md-input id="rua" name="rua" v-model="form.rua" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.rua.required">Logradouro deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.rua.maxlength">Invalid Logradouro</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('numero')">
                <label for="numero">Numero</label>
                <md-input id="numero" name="numero" v-model="form.numero" :disabled="sending" v-mask = "'#########'" />
                <span class="md-error" v-if="!$v.form.numero.required">Número deve ser preenchido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('bairro')">
                <label for="bairro">Bairro</label>
                <md-input id="bairro" name="bairro" autocomplete="bairro" v-model="form.bairro" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.bairro.required">Bairro deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.bairro.maxlength">Invalid Bairro</span>
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
  required,
  minLength
} from 'vuelidate/lib/validators'
export default {
  name: 'FormEndereco',
  props: ['selected'],
  mixins: [validationMixin],
  data: () => ({
    form: {
      cep: null,
      rua: null,
      numero: null,
      estado: null,
      cidade: null,
      bairro: null,
      selected: null
    },
    bairro: null,
    userSaved: false,
    sending: false,
    cidades: [],
    cep: [],
    selectedCidade: null,
    selectedCep: null
  }),
  directives: {mask},
  beforeUpdate () {
    axios.get('http://servicodados.ibge.gov.br/api/v1/localidades/estados/' + this.form.estado + '/municipios')
      .then(response => {
        this.cidades = response.data
        this.form.cidade = this.cidades
      })
    axios.get('https://viacep.com.br/ws/' + this.form.cep + '/json/')
      .then(response => {
        this.cep = response.data
        this.form.bairro = this.cep.bairro
        this.form.rua = this.cep.logradouro
      })
  },
  validations: {
    form: {

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
      estado: {
        required,
        minLength: minLength(2)
      },
      cidade: {
        required
      },
      bairro: {
        required,
        minLength: minLength(3)
      }
    },
    selectedCidade: {
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
      this.form.cep = null
      this.form.rua = null
      this.form.numero = null
      this.form.cidade = null
      this.form.estado = null
      this.form.bairro = null
      this.selectedCidade = null
    },
    saveEndereco () {

      let newEndereco = {
        logradouro: this.form.rua,
        numero: this.form.numero,
        bairro: this.form.bairro,
        cidade: this.selectedCidade,
        cep: this.retiraMascara(this.form.cep),
        uf: this.form.estado,
        leads_address: this.selected[0].id
      }
      console.log('Endereço: '+newEndereco)
      axios.post(process.env.API + 'address', newEndereco)
        .then((response) => {
          this.results = response.data
          alert('Endereço adicionado ' + this.selected[0].nome + ' com sucesso')
          this.clearForm()
          //window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    },
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveEndereco()
      }
    },
    retiraMascara (campo) {
      campo = campo.replace(/\D/g, '') // Remove tudo o que não é dígito
      return campo
    },
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
