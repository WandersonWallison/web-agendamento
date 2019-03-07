<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateOffice">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
       <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Editar Escritório</span>
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
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="cnpj">CNPJ</label>
                <md-input id="cnpj" name="cnpj" v-model="form.cnpj" :disabled="sending" v-mask = "'##.###.###/####-##'" />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('qtdVisitas')">
                <label for="qtdVisitas">Visitas por Agente</label>
                <md-select name="qtdVisitas" id="qtdVisitas" v-model="form.qtdVisitas" md-dense :disabled="sending">
                  <md-option value=1>1 Visita</md-option>
                  <md-option value=2>2 Visitas</md-option>
                  <md-option value=3>3 Visitas</md-option>
                  <md-option value=4>4 Visitas</md-option>
                </md-select>
                <span class="md-error">Quantidades de visitas não selecioando</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('telefone')">
                <label for="telefone">Telefone</label>
                <md-input id="telefone" name="telefone" v-model="form.telefone" :disabled="sending" v-mask = "'(##) ####-####'" />
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
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('site')">
                <label for="site">Site</label>
                <md-input id="site" name="site" v-model="form.site" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.site.required">site deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.site.maxlength">site inválido</span>
              </md-field>
            </div>
          </div>
          <br>
          <md-toolbar md-elevation="0" class="md-dense">
            <span class="md-title">Endereço</span>
          </md-toolbar>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cep')">
                <label for="cep">CEP</label>
                <md-input id="cep" name="cep" v-model="form.cep" :disabled="sending" v-mask = "'#####-###'" />
                <span class="md-error" v-if="!$v.form.cep.required">Cep deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.cep.maxlength">Cep inválido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('rua')">
                <label for="rua">Rua</label>
                <md-input id="rua" name="rua" v-model="form.rua" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.rua.required">Rua deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.rua.maxlength">inválido Rua</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('numero')">
                <label for="numero">Numero</label>
                <md-input id="numero" name="numero" v-model="form.numero" :disabled="sending" v-mask = "'########'" />
                <span class="md-error" v-if="!$v.form.numero.required">Número deve ser preenchido</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
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
                <md-input name="cidade" id="cidade" v-model="form.cidade" :disabled="sending"/>
                <span class="md-error" v-if="!$v.form.cidade.required">Cidade deve ser preenchido</span>
                <br>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('bairro')">
                <label for="bairro">Bairro</label>
                <md-input id="bairro" name="bairro" autocomplete="bairro" v-model="form.bairro" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.bairro.required">Bairro deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.bairro.maxlength">Bairro inválido</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
        <div class="actions  alinha-button md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" type="submit" :disabled="sending">Alterar</md-button>
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
import moment from 'moment'
import {mask} from 'vue-the-mask'

export default {
  name: 'FormUpdateEscritorio',
  props: ['selected'],
  mixins: [validationMixin],
  data () {
    return {
      form: {
        nomeEscritorio: this.selected.nome,
        responsavelEscritorio: this.selected.responsavel,
        cnpj: this.selected.cnpj,
        telefone: this.selected.telefone,
        email: this.selected.email,
        site: this.selected.site,
        qtdVisitas: this.selected.qtd_visita_dia,
        cep: this.selected.endereco[0].cep,
        rua: this.selected.endereco[0].logradouro,
        numero: this.selected.endereco[0].numero,
        estado: this.selected.endereco[0].uf,
        cidade: this.selected.endereco[0].cidade,
        bairro: this.selected.endereco[0].bairro
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      estados: [],
      cidades: [],
      cep: [],
      selectedEstado: null,
      selectedCidade: null,
      selectedCep: null,
      cidadeCadastrada: ''
    }
  },
  directives: {mask},
  validations: {
    form: {
      nomeEscritorio: {
        required
      },
      responsavelEscritorio: {
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
      site: {
        required,
        minLength: minLength(3)
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
        required
      },
      bairro: {
        required,
        minLength: minLength(3)
      },
      qtdVisitas: {
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
      this.selectedCidade = null

      this.form.nomeEscritorio = null
      this.form.responsavelEscritorio = null
      this.form.site = null
      this.form.telefone = null
      this.form.email = null
      this.form.qtdVisitas = null
      this.form.cnpj = null
    },
    updateOffice () {
      let upOffice = {
        nome: this.form.nomeEscritorio,
        responsavel: this.form.responsavelEscritorio,
        site: this.form.site,
        telefone: this.form.telefone,
        email: this.form.email,
        qtd_visita_dia: this.form.qtdVisitas,
        tempo_aceita: 0,
        abertura: moment(Date.now()).format(),
        cnpj: this.form.cnpj
      }
      let upEndereco = {
        logradouro: this.form.rua,
        numero: this.form.numero,
        bairro: this.form.bairro,
        cidade: this.form.cidade,
        cep: this.form.cep,
        uf: this.form.estado
      }
      axios.put(process.env.API + 'office/' + this.selected.id, upOffice)
        .then(response => {
          this.results = response.data
          axios.put(process.env.API + 'address/' + this.selected.endereco[0].id, upEndereco)
            .then(response => {
              alert('Escritório alterado com sucesso')
              this.sending = false
              // this.clearForm()
              window.location.reload()
            })
            .catch(error => {
              console.log('Erro de endereço Update Escritorio: ' + error.response.data)
            })
        })
        .catch(error => {
          console.log('Code erro atualiza escritório: ' + error.response.data.code)
          console.log('Erro atualiza escritório: ' + error.response.data)
        })
    },
    validateOffice () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.updateOffice()
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
</style>
