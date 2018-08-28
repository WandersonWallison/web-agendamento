<template>

   <div class="centered-container">
     <md-content class="md-elevation-1 body-content">
       <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Adicionar Conta</span>
        </md-toolbar>
        <md-field>
          <label>Nome</label>
          <md-input v-model="conta.nome" autofocus placeholder='Nome'></md-input>
        </md-field>
        <md-field>
          <label>AG</label>
          <md-input type="number" v-model="conta.ag" autofocus placeholder="ag"></md-input>
        </md-field>
        <md-field>
          <label>Numero Conta</label>
          <md-input type="number" v-model="conta.n_conta" autofocus placeholder="conta"></md-input>
        </md-field>
        <md-field>
          <label>Renda</label>
          <md-input type="number" v-model="conta.renda" autofocus placeholder="Renda"></md-input>
        </md-field>
        <md-field>
          <label>Aplicação</label>
          <md-input type="number" v-model="conta.aplicacao" autofocus placeholder="Aplicação"></md-input>
        </md-field>

        <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="add">Adicionar</md-button>

        </div>
     </md-content>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'conta',
  props: ['selected'],
  data () {
    return {
      conta: {
        nome: '',
        ag: '',
        n_conta: '',
        renda: '',
        aplicacao: ''
      },
      results: []
    }
  },
  methods: {
    add () {
      let newConta = {
        nome: this.conta.nome,
        ag: this.conta.ag,
        n_conta: this.conta.n_conta,
        renda: this.conta.renda,
        aplicacao: this.conta.aplicacao,
        leads_bank: this.selected[0].id
      }
      axios.post(process.env.API + 'bank', newConta)
        .then(response => {
          this.results = response.data
          alert('Conta adicionado ' + this.selected[0].nome + 'com sucesso')
          window.location.reload()
          console.log(response.data)
        })
        .catch(error => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    }
  }
}
</script>
<style lang="scss">
.centered-container {
  display: flex;
  align-items: left;
  justify-content: center;
  position: relative;
  height: 80vh;

  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
      margin-left: auto;
      margin-right: auto;
      width: 8em;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
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
    width: 100%;
    max-width: 100%;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
