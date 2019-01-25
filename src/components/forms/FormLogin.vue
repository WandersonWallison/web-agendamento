<template>
  <div class="centered-container2" @keyup.enter="auth">
    <md-content class="md-elevation-3">
      <form>
        <div class="title2">
        <!--<img src="../../assets/marca_branca_fundo_transparente.png"> -->
        <img src="../../assets/nova_logo_ProsperidadeInvestimentos.png">
        </div>
        <div class="form2">
          <md-field>
            <label >E-mail</label>
            <md-input v-model="login.email" autofocus></md-input>
          </md-field>
          <md-field md-has-password>
            <label>Password</label>
            <md-input v-model="login.password" type="password"></md-input>
          </md-field>
          <div class="input_white">{{menssage}}</div>
          <br>
        </div>
        <div class="actions2 md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" @click="auth">Entrar</md-button>
        </div>
        <div class="loading-overlay2" v-if="loading">
          <md-progress-spinner md-mode='indeterminate' md-diameter='50' :md-stroke='4'></md-progress-spinner>
        </div>
      </form>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      login: {
        email: '',
        password: ''
      },
      leads: [],
      results: null,
      inicio: null,
      menssage: null
    }
  },
  mounted () {
    axios.get(process.env.API + 'leads?where={"data_expiracao":{">":"2018/12/31"}}')
      .then(response => {
        this.leads = response.data
      })
  },
  methods: {
    validaDataExpiracao () {
      let newLead = {
        id_user_editor: 0,
        momento_atual: 1,
        data_expiracao: moment('0000/00/00').format(),
        // obs: ''
      }
      for (var i = 0; i <= this.leads.length; i++) {
        newLead.obs = this.leads[i].obs + ' Hunter: Não atuou no lead'
        axios.put(process.env.API + 'leads/' + this.leads[i].id, newLead)
          .then(response => {
          })
      }
    },
    auth () {
      this.menssage = null
      this.results = null
      if (this.login.email !== '' && this.login.password !== '') {
        // this.loading = true
        axios
          .post(process.env.API + 'login', this.login)
          .then(response => {
            if (response.data.user === false) {
              this.$router.push('/')
              if (response.data.message === 'Username not found') {
                this.menssage = 'Usuário não encontrado!'
              } else {
                this.menssage = 'A senha incorreta!'
              }
            } else {
              // this.results = response.data.message
              window.localStorage.setItem('Usuario', JSON.stringify(response.data.user))
              if (response.data.user.id_profile === 1) {
                this.$router.push('/home')
                this.loading = false
                this.validaDataExpiracao()
              } else if (response.data.user.id_profile === 3) {
                this.$router.push('/agendamento')
                this.loading = false
                this.validaDataExpiracao()
              } else {
                this.$router.push('/visita')
                this.loading = false
                this.validaDataExpiracao()
              }
            }
          })
          .catch(error => {
            if (error.response.data.code === 'E_UNIQUE') {
              this.results = 'Usuario não encontrado. Por favor verirficar os dados digitados'
            }
            this.results = 'Usuario não encontrado. Por favor verirficar os dados digitados'
            this.loading = false
          })
      } else {
        this.$router.push('/')
        if (this.login.email === '') {
          this.menssage = 'Por favor incluir e-mail'
        } else if (this.login.password === '') {
          this.menssage = 'Por favor incluir a senha'
        }
        setInterval(() => {
          this.menssage = ''
          this.inicio = ''
          this.results = ''
        }, 6000)
      }
    }
  }
}
</script>

<style lang="scss">
.centered-container2 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: static;
  height: 95vh;
  .title2 {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 70%;
      width: auto;
    }
  }
  .actions2 {
    .md-button {
      margin: 0;
      margin-left: auto;
      margin-right: auto;
      width: 6em;
    }
  }
  .form2 {
    margin-bottom: 60px;
    color: #eeeeee;
  }
  .background {
    background: #5c6763;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 500px;
    max-width: 100%;
    position: absolute;
    height: 500px;
    //background-color: #5c6763;
    // background-color: #9bc5b6;
    // background-color: #1a503a;
  }
  .loading-overlay2 {
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: -webkit-box;
    align-items: center;
    justify-content: center;
  }
  .input_white{
    color:black;
  }

}
</style>
