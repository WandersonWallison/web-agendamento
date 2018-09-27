<template>
  <div>
    <form novalidate class='md-layout' @submit.prevent='validateUser'>
      <md-card class='md-layout-item md-size-100 md-small-size-100'>
       <md-toolbar md-elevation='0' class='md-dense'>
          <span class='md-title'>Cadastro de Usuário</span>
        </md-toolbar>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('office')">
                <label for="office">Escritorio</label>
                <md-select name="office" id="office" v-model="form.office" md-dense :disabled="sending">
                <md-option v-for="office in offices" :key="office.id" :value="office.id">
                  {{ office.nome }}
                </md-option>
                </md-select>
                  <span class="md-error">Escritorio não selecionado</span>
                <br>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('profile')">
                <label for="profile">Tipo de Usuário</label>
                <md-select name="profile" id="profile" v-model="form.profile" md-dense :disabled="sending">
                  <md-option velue=""></md-option>
                    <md-option value="1">MANAGER</md-option>
                    <md-option value="2">AGENTE</md-option>
                    <md-option value="3">HUNTER</md-option>
                </md-select>
                <span class="md-error">Perfil não selecionado</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <div v-if="form.profile!=3">
                <md-field>
                  <label for="cvm">CVM</label>
                  <md-input id="cvm" name="cvm" v-model="form.cvm" :disabled=false />
                </md-field>
              </div>
            </div>

          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('nomeAgente')">
                  <label for="nomeAgente">Nome Completo</label>
                  <md-input id="nomeAgente" name="nomeAgente" v-model="form.nomeAgente" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.nomeAgente.required">Nome do Agente deve ser preenchido</span>
                  <span class="md-error" v-else-if="!$v.form.nomeAgente.maxlength">Invalid Escritorio</span>
                </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('email')">
                  <label for="email">E-mail</label>
                  <md-input type='email' id="email" name="email" v-model="form.email" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.email.required">E-mail deve ser preenchido</span>
                  <span class="md-error" v-else-if="!$v.form.email.maxlength">Invalid email</span>
                </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('telefone')">
                <the-mask class="campos-text" id="telefone" name="telefone" v-model="form.telefone" :disabled="sending" :mask="['(##) ####-####','(##) ####-####']" placeholder="Telefone"/>
                <span class="md-error" v-if="!$v.form.telefone.required">telefone deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.telefone.maxlength">Invalid telefone</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('celular')">
                <the-mask class="campos-text" id="celular" name="celular" v-model="form.celular" :disabled="sending" :mask="['(##) #####-####','(##) #####-####']" placeholder="Celular"/>
                <span class="md-error" v-if="!$v.form.celular.required">celular deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.celular.maxlength">Invalid celular</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="redeSocial">Rede Sociais</label>
                <md-input id="redeSocial" name="redeSocial" v-model="form.redeSocial" :disabled="sending" />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
                <md-datepicker :class="getValidationClass('dataInicio')" id="dataInicio" name="dataInicio" date="true" time="true" v-model="form.dataInicio">
                    <label>Data Inicio</label>
                    <span class="md-error" v-if="!$v.form.dataInicio.required">Data Inicio deve ser preenchido</span>
                </md-datepicker>
            </div>
            <div class="md-layout-item md-small-size-100">
                <md-datepicker :md-closed="idade()" :class="getValidationClass('dataNascimento')"  id="dataNascimento" name="dataNascimento" date="true" time="true" v-model="form.dataNascimento">
                  <label>Data Nascimento</label>
                  <span class="md-error" v-if="!$v.form.dataNascimento.required">Data Nascimento deve ser preenchido</span>
                </md-datepicker>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('rg')">
                <the-mask class="campos-text" id="rg" name="rg" v-model="form.rg" :disabled="sending" :mask="['#.###.###','#.###.###']" placeholder="RG"/>
                <span class="md-error" v-if="!$v.form.rg.required">RG deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.rg.maxlength">Invalid rg</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cpf')">
                <the-mask class="campos-text" id="cpf" name="cpf" v-model="form.cpf" :disabled="sending" :mask="['###.###.###-##','###.###.###-##']" placeholder="CPF"/>
                <span class="md-error" v-if="!$v.form.cpf.required">cpf deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.cpf.maxlength">Invalid cpf</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('genero')">
                  <label for="genero">Gênero</label>
                  <md-select v-model="form.genero" name="genero" id="genero">
                    <md-option value=""></md-option>
                    <md-option value="F">Feminino</md-option>
                    <md-option value="M">Masculino</md-option>
                  </md-select>
                  <span class="md-error" v-if="!$v.form.genero.required">Gênero deve ser selecionado</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('escolaridade')">
                  <label for="escolaridade">Escolaridade</label>
                  <md-select v-model="form.escolaridade" name="escolaridade" id="escolaridade">
                    <md-option value="Ensino Fundamental">Ensino Fundamental</md-option>
                    <md-option value="Ensino Medio">Ensino médio</md-option>
                    <md-option value=" Ensino Superior">Ensino Superior</md-option>
                    <md-option value="Ensino pós superior">Ensino pós superior</md-option>
                  </md-select>
                  <span class="md-error" v-if="!$v.form.escolaridade.required">Escolaridade deve ser selecionado</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('estadoCivil')">
                  <label for="estadoCivil">Estado Civil</label>
                  <md-select v-model="form.estadoCivil" name="estadoCivil" id="estadoCivil">
                    <md-option value=""></md-option>
                    <md-option value="Solteiro">Solteiro</md-option>
                    <md-option value="Casado">Casado</md-option>
                    <md-option value="Divorciado">Divorciado</md-option>
                    <md-option value="Viúvo">Viúvo</md-option>
                    <md-option value="Outros">Outros</md-option>
                  </md-select>
                  <span class="md-error" v-if="!$v.form.estadoCivil.required">Estado Civil deve ser selecionado</span>
                </md-field>
              </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="nomeConjuge">Nome Conjuge</label>
                  <md-input id="nomeConjuge" name="nomeConjuge" v-model="form.nomeConjuge" :disabled="sending" />
                </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('nomeMae')">
                <label for="nomeMae">Nome Mãe</label>
                <md-input id="nomeMae" name="nomeMae" v-model="form.nomeMae" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.nomeMae.required">Nome Mãe deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.nomeMae.maxlength">Invalid nome Mae</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="nomePai">Nome Pai</label>
                <md-input id="nomePai" name="nomePai" v-model="form.nomePai" :disabled="sending" />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
          </div>
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
                <the-mask class="campos-text" id="numero" name="numero" v-model="form.numero" :disabled="sending" :mask="['########','########']" placeholder="Numero"/>
                <span class="md-error" v-if="!$v.form.numero.required">Número deve ser preenchido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cep')">
                <the-mask class="campos-text" id="cep" name="cep" v-model="form.cep" :disabled="sending" :mask="['#####-###','#####-###']" placeholder="CEP"/>
                <span class="md-error" v-if="!$v.form.cep.required">Cep deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.cep.maxlength">Cep invalido</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('estado')">
                <label for="estado">Estados</label>
                <md-select name="estado" id="estado" v-model="selectedEstado">
                  <md-option v-for="estado in estados" :key="estado.id" :value="estado.id">
                    {{ estado.nome}}
                  </md-option>
                </md-select>
                <span class="md-error">Estado não selecionado</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cidade')">
                <label for="cidade">Cidade</label>
                <md-select name="cidade" id="cidade" v-model="selectedCidade">
                  <md-option v-for="cidade in cidades" :key="cidade.id" :value="cidade.nome">
                    {{ cidade.nome}}
                  </md-option>
                </md-select>
                  <span class="md-error">Cidade não selecionado</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('bairro')">
                <label for="bairro">Bairro</label>
                <md-input id="bairro" name="bairro" autocomplete="bairro" v-model="form.bairro" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.bairro.required">Bairro deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.bairro.rua.maxlength">Invalid Bairro</span>
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
        <div class="alinha-button actions md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" type="submit" :disabled="sending">Cadastrar</md-button>
        </div>
        </md-card-actions>
      </md-card>
      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with sucesso!</md-snackbar>
    </form>
  </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators'
import {TheMask} from 'vue-the-mask'

export default {
  name: 'FormEmpresa',
  props: ['leadProps'],
  mixins: [validationMixin],
  data: () => ({
    form: {
      nomeAgente: null,
      email : null,
      senha : null,
      telefone:null,
      celular : null,
      dataInicio : null,
      dataNascimento: null,
      cvm : '',
      nomeConjuge : null,
      nomeMae : null,
      nomePai : null,
      redeSocial : '',
      rg : null,
      cpf : null,
      cep : null,
      rua : null,
      numero : null,
      estado : null,
      cidade : null,
      bairro : null,
      observacao : null,
      qtdVisitas : null,
      metaAnual : null,
      estadoCivil : null,
      escolaridade : null,
      genero : null,
      profile : null,
      escritorio: null,
      selected: null
    },
    userSaved : false,
    sending : false,
    lastUser : null,
    infoSenha : false,
    offices: [],
    estados: [],
    cidades: [],
    cep: [],
    selectedEstado: null,
    selectedCidade: null,
    selectedCep: null,
    novoUsuario: null,
    teste: null
  }),
   beforeCreate() {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => {
    this.estados = response.data
    })
  },
  beforeUpdate() {
    axios.get('http://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ this.selectedEstado +'/municipios')
    .then(response => {
    this.cidades = response.data
    })
    ,
    axios.get('https://viacep.com.br/ws/'+ this.form.cep +'/json/')
    .then(response => {
      this.cep = response.data
      this.form.bairro = this.cep.bairro,
      this.form.rua = this.cep.logradouro,
      this.form.observacao = this.cep.complemento
    })
  },
  components: {TheMask},
  validations: {
    form: {

      nomeAgente: {
        required
      },
      email: {
        required,
        minLength: minLength(1),
        email
      },
      dataInicio: {
        required
      },
      dataNascimento: {
        required
      },
      telefone: {
        required,
        minLength: minLength(1)
      },
      celular: {
        required,
        minLength: minLength(1)
      },
      rg: {
        required,
        minLength: minLength(1)
      },
      cpf: {
        required,
        minLength: minLength(1)
      },
      nomeMae: {
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
      genero: {
        required
      },
      escolaridade: {
        required
      },
      estadoCivil: {
        required
      },
      profile: {
        required
      },
      office:{
         required
      }
    }
  },
  created() {
    axios.get(process.env.API + 'office')
    .then(response => {
    this.offices = response.data
    })
  },
  methods: {

    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
        console.log('field.$dirty : '+ field.$dirty)
        console.log('field.$invalid :'+ field.$invalid)
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
      this.form.nomeAgente = null
      this.form.email = null
      this.form.senha = null
      this.form.telefone = null
      this.form.celular = null
      this.form.dataInicio = null
      this.form.cvm = null
      this.form.rg = null
      this.form.cpf = null
      this.form.dataNascimento = null
      this.form.genero = null
      this.form.estadoCivi = null
      this.form.escolaridade = null
      this.form.nomeConjuge  = null
      this.form.nomeMae = null
      this.form.nomePai = null
      this.form.redeSocial = null
      this.form.observacao = null
      this.form.profile = null
      this.escritorio = null
    },
    saveEmpresa () {
      let senhaGerada
      senhaGerada = this.geradorPassword()

      let newUsuario = {
        username : this.form.nomeAgente,
        email : this.form.email,
        password : senhaGerada,
        telefone : this.form.telefone,
        celular : this.form.celular,
        data_inicio : this.form.dataInicio,
        cvm : this.form.cvm,
        cnh_rg  : this.form.rg,
        cpf : this.form.cpf,
        data_nascimento : this.form.dataNascimento,
        escolaridade : this.form.escolaridade,
        estado_civil: this.form.estadoCivil,
        nome_conjuge : this.form.nomeConjuge ,
        nome_mae : this.form.nomeMae,
        nome_pai : this.form.nomePai,
        rede_social : this.form.redeSocial,
        genero: this.form.genero,
        id_profile : this.form.profile,
        id_office: this.form.office
      }

      this.novoUsuario = newUsuario

      let newEndereco = {
        logradouro: this.form.rua,
        numero: this.form.numero,
        bairro: this.form.bairro,
        cidade: this.selectedCidade,
        cep: this.form.cep,
        uf: this.selectedEstado
      }
      axios.post(process.env.API + 'user', newUsuario)
        .then(response => {
          newEndereco.user_address = response.data.id
          axios.post(process.env.API + 'address', newEndereco)
            .then(response => {
                  alert('Agente cadastado com succeso \n' +
                'Dados de Acesso do Agente: ' +
                  this.form.nomeAgente +
                '\n Usuario: ' +
                  this.form.email +
                '\n Senha: ' + senhaGerada )
                this.userSaved = true
                this.sending = false
                this.clearForm()
                window.location.reload()
                })
          .catch(error => {
            alert('Erro no cadastro do Endereço')
          console.log(error.response.data)
          })
        })
        .catch(error => {
          if (error.response.data.code === 'E_UNIQUE') {
              alert('Agente já Cadastrado \nPor favor verificar os dados de cadastro')
          }
          console.log(error.response.data)
        })
    },
    validateUser () {
      this.$v.$touch()

      console.log("validate do form "+ this.$v.$invalid)
      if (!this.$v.$invalid) {
            this.saveEmpresa()

      }
    },
     geradorPassword () {
      this.pass = ''
      for (var i = 0; i < 8; i++) {
        this.pass += this.getRandomChar()
      }
      return this.pass
    },
   idade() {
    var hoje = new Date()
    var nascimento = new Date(this.form.dataNascimento)
    var diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
    if(diferencaAnos < 18){
      alert('Usuário menor de 18 Anos\n')
    }
    return diferencaAnos

},

    getRandomChar(){
      var ascii = [[48, 57] , [64, 90] , [97, 122]]
      var i = Math.floor(Math.random() * ascii.length)
      return String.fromCharCode(Math.floor(Math.random() * (ascii[i][1]-ascii[i][0])) + ascii[i][0])
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
