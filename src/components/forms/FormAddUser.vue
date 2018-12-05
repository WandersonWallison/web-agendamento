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
                <label for="office">Escritório</label>
                <md-select name="office" id="office" v-model="form.office" md-dense :disabled="sending">
                <md-option v-for="office in offices" :key="office.id" :value="office.id">
                  {{ office.nome }}
                </md-option>
                </md-select>
                  <span class="md-error">Escritório não selecionado</span>
                <br>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('profile')">
                <label for="profile">Tipo de Usuário</label>
                <md-select name="profile" id="profile" v-model="form.profile" md-dense :disabled="sending">
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
                <label for="telefone">Telefone</label>
                <md-input type="tel" id="telefone" name="telefone" v-model="form.telefone" :disabled="sending" v-mask = "'(##) ####-####'" />
                <span class="md-error" v-if="!$v.form.telefone.required">telefone deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.telefone.maxlength">Invalid telefone</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('celular')">
                <label for="telefone">Celular</label>
                <md-input type="tel" id="celular" name="celular" v-model="form.celular" :disabled="sending" v-mask = "'(##) #####-####'" />
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
                <label for="rg">RG</label>
                <md-input id="rg" name="rg" v-model="form.rg" :disabled="sending" v-mask = "'#.###.###'" />
                <span class="md-error" v-if="!$v.form.rg.required">RG deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.rg.maxlength">Invalid rg</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cpf')">
                <label for="cpf">CPF</label>
                <md-input id="cpf" name="cpf" v-model="form.cpf" :disabled="sending" v-mask = "'###.###.###-##'" />
                <span class="md-error" v-if="!$v.form.cpf.required">cpf deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.cpf.maxlength">Invalid cpf</span>
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
          </div>
          <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('genero')">
                  <label for="genero">Gênero</label>
                  <md-select v-model="form.genero" name="genero" id="genero">
                    <md-option value="F">Feminino</md-option>
                    <md-option value="M">Masculino</md-option>
                  </md-select>
                  <span class="md-error" v-if="!$v.form.genero.required">Gênero deve ser selecionado</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('estadoCivil')">
                  <label for="estadoCivil">Estado Civil</label>
                  <md-select v-model="form.estadoCivil" name="estadoCivil" id="estadoCivil">
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
                  <label for="nomeConjuge">Nome Cônjuge</label>
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
                <label for="rua">Logradouro</label>
                <md-input id="rua" name="rua" v-model="form.rua" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.rua.required">Logradouro deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.rua.maxlength">Invalid Logradouro</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('numero')">
                <label for="numero">Número</label>
                <md-input id="numero" name="numero" v-model="form.numero" :disabled="sending" v-mask = "'#########'" />
                <span class="md-error" v-if="!$v.form.numero.required">Número deve ser preenchido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cep')">
                <label for="cep">CEP</label>
                <md-input id="cep" name="cep" v-model="form.cep" :disabled="sending" v-mask = "'#####-###'" />
                <span class="md-error" v-if="!$v.form.cep.required">Cep deve ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.cep.maxlength">Cep invalido</span>
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
                <md-select name="cidade" id="cidade" v-model="selectedCidade">
                  <md-option v-for="cidade in cidades" :key="cidade.id" :value="cidade.nome">
                    {{ cidade.nome }}
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
                <span class="md-error" v-else-if="!$v.form.bairro.maxlength">Invalid Bairro</span>
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
import {mask} from 'vue-the-mask'
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators'
export default {
  name: 'FormUsuario',
  props: ['leadProps'],
  mixins: [validationMixin],
  data: () => ({
    form: {
      nomeAgente: null,
      email: null,
      senha: null,
      telefone: null,
      celular: null,
      dataInicio: '',
      dataNascimento: '',
      cvm: '',
      nomeConjuge: '',
      nomeMae: '',
      nomePai: '',
      redeSocial: '',
      rg: null,
      cpf: '',
      cep: null,
      rua: null,
      numero: null,
      estado: null,
      cidade: null,
      bairro: null,
      observacao: '',
      qtdVisitas: null,
      metaAnual: null,
      estadoCivil: null,
      escolaridade: '',
      genero: null,
      profile: null,
      escritorio: null,
      office: null,
      selected: null
    },
    bairro: null,
    userSaved: false,
    sending: false,
    lastUser: null,
    infoSenha: false,
    offices: [],
    estados: [],
    cidades: [],
    cep: [],
    selectedCidade: null,
    selectedCep: null,
    novoUsuario: null
  }),
  directives: {mask},
  beforeUpdate () {
    axios.get('http://servicodados.ibge.gov.br/api/v1/localidades/estados/' + this.form.estado + '/municipios')
      .then(response => {
        this.cidades = response.data
        this.form.cidade = this.cidades
      })
    axios.get('https://api.postmon.com.br/v1/cep/' + this.form.cep)
      .then(response => {
        this.cep = response.data
        if (this.cep.bairro) {
          this.form.bairro = this.cep.bairro
        }
        if (this.cep.logradouro) {
          this.form.rua = this.cep.logradouro
        }
        if (this.cep.complemento) {
          this.form.observacao = this.cep.complemento
        }
      })
      .catch(error => {
        // alert('Erro no cadastro do Endereço')
        console.log(error.response.data)
      })
  },
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
      office: {
        required
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
      this.form.nomeConjuge = null
      this.form.nomeMae = null
      this.form.nomePai = null
      this.form.redeSocial = null
      this.form.observacao = null
      this.form.profile = null
      this.form.office = null
      this.escritorio = null
      this.selectedCidade = null
    },
    saveEmpresa () {
      let cvmValidado
      let senhaGerada

      cvmValidado = this.validarCVM()
      senhaGerada = this.geradorPassword()

      let newUsuario = {
        username: this.form.nomeAgente,
        email: this.form.email,
        password: senhaGerada,
        telefone: this.retiraMascara(this.form.telefone),
        celular: this.retiraMascara(this.form.celular),
        data_inicio: this.form.dataInicio,
        cvm: this.form.cvm,
        cnh_rg: this.retiraMascara(this.form.rg),
        cpf: this.retiraMascara(this.form.cpf),
        data_nascimento: this.form.dataNascimento,
        escolaridade: this.form.escolaridade,
        estado_civil: this.form.estadoCivil,
        nome_conjuge: this.form.nomeConjuge,
        nome_mae: this.form.nomeMae,
        nome_pai: this.form.nomePai,
        rede_social: this.form.redeSocial,
        genero: this.form.genero,
        id_profile: this.form.profile,
        id_office: this.form.office
      }
      this.novoUsuario = newUsuario
      let newEndereco = {
        logradouro: this.form.rua,
        numero: this.form.numero,
        bairro: this.form.bairro,
        cidade: this.selectedCidade,
        cep: this.retiraMascara(this.form.cep),
        uf: this.form.estado
      }
      if (cvmValidado) {
        axios.post(process.env.API + 'user', newUsuario)
          .then(response => {
            newEndereco.user_address = response.data.id
            axios.post(process.env.API + 'address', newEndereco)
              .then(response => {
                alert('Cadastro realizado com succeso \n' +
                'Dados de Acesso: ' +
                this.form.nomeAgente +
                '\n Usuario: ' +
                this.form.email +
                '\n Senha: ' + senhaGerada)
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
              alert('Dados já Cadastrado \nPor favor verificar os dados de cadastro')
            }
            console.log(error.response.data)
          })
      } else {
        alert('Campo CVM deve ser preenchido')
      }
    },
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveEmpresa()
      }
    },
    geradorPassword () {
      this.pass = ''
      for (let i = 0; i < 8; i++) {
        this.pass += this.getRandomChar()
      }
      return this.pass
    },
    idade () {
      let hoje = new Date()
      let nascimento = new Date(this.form.dataNascimento)
      let diferencaAnos = hoje.getFullYear() - nascimento.getFullYear()
      if (diferencaAnos < 18) {
        alert('Usuário menor de 18 Anos\n')
      }
      return diferencaAnos
    },
    getRandomChar () {
      let ascii = [[48, 57], [64, 90], [97, 122]]
      let i = Math.floor(Math.random() * ascii.length)
      return String.fromCharCode(Math.floor(Math.random() * (ascii[i][1] - ascii[i][0])) + ascii[i][0])
    },
    retiraMascara (campo) {
      campo = campo.replace(/\D/g, '') // Remove tudo o que não é dígito
      return campo
    },
    validarCVM () {
      if (this.form.profile != 3 && this.form.cvm === '') {
        return false
      } else {
        return true
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
