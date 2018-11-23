<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateEmpresa">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
       <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Cadastro de Escritorio</span>
        </md-toolbar>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('nomeEscritorio')">
                <label for="nomeEscritorio">Nome Escritório</label>
                <md-input id="nomeEscritorio" name="nomeEscritorio" v-model="form.nomeEscritorio" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.nomeEscritorio.required">Nome do Escritório deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.nomeEscritorio.maxlength">Invalid Escritorio</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('responsavelEscritorio')">
                <label for="responsavelEscritorio">Responsável Escritorio</label>
                <md-input id="responsavelEscritorio" name="responsavelEscritorio" v-model="form.responsavelEscritorio" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.responsavelEscritorio.required">Responsável do Escritorio deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.responsavelEscritorio.maxlength">Invalid responsável</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <the-mask class="campos-text" name="cnpj" id="cnpj" autocomplete="cnpj" v-model="form.cnpj" :disabled="sending" :mask="['##.###.###/####-##','##.###.###/####-##']" placeholder="CNPJ" />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('tempoAceite')">
                <label for="tempoAceite">Tempo Para Aceite</label>
                <md-select name="tempoAceite" id="tempoAceite" v-model="form.tempoAceite" md-dense :disabled="sending">
                  <md-option velue=""></md-option>
                    <md-option value=12>12 Horas</md-option>
                    <md-option value=24>24 Horas</md-option>
                    <md-option value=36>26 Horas</md-option>
                    <md-option value=48>48 Horas</md-option>
                </md-select>
                <span class="md-error">Tempo de Aceito não selecioando</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('qtdVisitas')">
                <label for="qtdVisitas">Quantidade de visitas por Agente</label>
                <md-select name="qtdVisitas" id="qtdVisitas" v-model="form.qtdVisitas" md-dense :disabled="sending">
                  <md-option velue=""></md-option>
                    <md-option value=1>1 Visita</md-option>
                    <md-option value=2>2 Visita</md-option>
                    <md-option value=3>3 Visita</md-option>
                    <md-option value=4>4 Visita</md-option>
                </md-select>
                <span class="md-error">Quantidades de visitas não selecioando</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('site')">
                <label for="site">Site</label>
                <md-input id="site" name="site" v-model="form.site" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.site.required">Site deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.site.maxlength">Site inválido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('telefone')">
                <the-mask class="campos-text" id="telefone" name="telefone" v-model="form.telefone" :disabled="sending" :mask="['(##) #####-####','(##) #####-####']" placeholder="Telefone"/>
                <span class="md-error" v-if="!$v.form.telefone.required">telefone deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.telefone.maxlength">Telefone inválido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">E-mail</label>
                <md-input id="email" name="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">E-mail deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.email.maxlength">Rua inválido</span>
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
                <span class="md-error" v-else-if="!$v.form.rua.maxlength">inválido Rua</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('numero')">
                <the-mask class="campos-text" id="numero" name="numero" v-model="form.numero" :disabled="sending" :mask="['########','########']" placeholder="Numero"/>
                <span class="md-error" v-if="!$v.form.numero.required">Número deve ser preenchido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cep')">
                <the-mask class="campos-text" id="cep" name="cep" v-model="form.cep" :disabled="sending" :mask="['#####-###','#####-###']" placeholder="CEP"/>
                <span class="md-error" v-if="!$v.form.cep.required">Cep deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.cep.maxlength">Cep inválido</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="estado">Estados</label>
                <md-select name="estado" id="estado" v-model="selectedEstado">
                  <md-option v-for="estado in estados" :key="estado.id" :value="estado.id">
                    {{ estado.nome}}
                  </md-option>
                </md-select>
                <br>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="cidade">Cidade</label>
                <md-select name="cidade" id="cidade" v-model="selectedCidade">
                  <md-option v-for="cidade in cidades" :key="cidade.id" :value="cidade.id">
                    {{ cidade.nome}}
                  </md-option>
                </md-select>
                <br>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('bairro')">
                <label for="bairro">Bairro</label>
                <md-input id="bairro" name="bairro" autocomplete="bairro" v-model="form.bairro" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.rua.required">Bairro deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.rua.maxlength">Bairro inválido</span>
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
        <div class="actions  alinha-button md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" type="submit" :disabled="sending">Cadastrar</md-button>
        </div>
        </md-card-actions>
      </md-card>
      <md-snackbar :md-active.sync="userSaved">O Escritório {{ lastUser }} foi salvo com sucesso!</md-snackbar>
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
import moment from 'moment'
import {TheMask} from 'vue-the-mask'

export default {
  name: 'FormEscritorio',
  props: ['leadProps'],
  mixins: [validationMixin],
  data: () => ({
    form: {
      nomeEscritorio: null,
      responsavelEscritorio: null,
      cnpj: '',
      telefone: null,
      email: null,
      cep: null,
      rua: null,
      numero: null,
      estado: null,
      cidade: null,
      bairro: null,
      observacao: null,
      qtdVisitas: null,
      site: null,
      tempoAceite: null
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    estados: [],
    cidades: [],
    cep: [],
    selectedEstado: null,
    selectedCidade: null,
    selectedCep: null
  }),
  beforeCreate () {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        this.estados = response.data
      })
  },
  beforeUpdate () {
    axios.get('http://servicodados.ibge.gov.br/api/v1/localidades/estados/' + this.selectedEstado + '/municipios')
      .then(response => {
        this.cidades = response.data
      })
    axios.get('https://viacep.com.br/ws/' + this.form.cep + '/json/')
      .then(response => {
        this.cep = response.data
        this.form.bairro = this.cep.bairro
        this.form.rua = this.cep.logradouro
        this.form.observacao = this.cep.complemento
        this.form.cidade = this.cep.localidade
        this.form.estado = this.cep.uf
      })
  },
  components: {TheMask},
  validations: {
    form: {
      nomeEscritorio: {
        required
      },
      responsavelEscritorio: {
        required,
        minLength: minLength(1)
      },
      site: {
        required,
        minLength: minLength(1)
      },
      telefone: {
        required,
        minLength: minLength(1)
      },
      email: {
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
      },
      qtdVisitas: {
        required
      },
      tempoAceite: {
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

      this.form.nomeEscritorio = null
      this.form.responsavelEscritorio = null
      this.form.site = null
      this.form.telefone = null
      this.form.email = null
      this.form.qtdVisitas = null
      this.form.cnpj = null
      this.form.tempoAceite = null
    },
    saveEmpresa () {
      let newEmpresa = {
        nome: this.form.nomeEscritorio,
        responsavel: this.form.responsavelEscritorio,
        site: this.form.site,
        telefone: this.form.telefone,
        email: this.form.email,
        qtd_visita_dia: this.form.qtdVisitas,
        tempo_aceita: this.form.tempoAceite,
        abertura: moment(Date.now()).format(),
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

      axios.post(process.env.API + 'office', newEmpresa)
        .then(response => {
          newEndereco.schedule_address = response.data.id
          axios.post(process.env.API + 'address', newEndereco)
            .then(response => {
              console.log(response)
              alert('Escritorio cadastado com sucesso')
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
          if (error.response.data.code === 'E_UNIQUE') {
            alert('Escritorio já Cadastrado!!!  \nverifique os dados de Cadastro')
          }
        })
    },
    validateEmpresa () {
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
.campos-text {
  width: 100%;
}
</style>
