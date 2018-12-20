<template>

     <md-content class="md-elevation-1 body-content">
        <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Alterar Contato</span>
        </md-toolbar>
        <md-field>
          <label>Nome Completo</label>
          <md-input v-model="lead.nome" placeholder="Nome Completo"></md-input>
        </md-field>
        <md-field>
          <label>Email</label>
          <md-input v-model="lead.email" placeholder="E-mail" ></md-input>
        </md-field>
        <md-field>
          <label>Telefone</label>
          <md-input v-model="lead.telefone" placeholder="Telefone" v-mask = "'(##) ####-####'"></md-input>
        </md-field>
          <md-field>
          <label>Celular</label>
          <md-input v-model="lead.celular" placeholder="Celular" v-mask = "'(##) #####-####'"></md-input>
        </md-field>
        <md-field>
          <label>Observação</label>
          <md-textarea v-model="lead.obs" placeholder="Observação"/>
        </md-field>
        <br>
        <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="update">Atualizar</md-button>
        </div>
     </md-content>
</template>

<script>
import axios from 'axios'
import {mask} from 'vue-the-mask'
export default {
  name: 'FormUpdadeLead',
  props: ['selected'],
  data () {
    return {
      lead: {
        nome: this.selected[0].nome,
        email: this.selected[0].email,
        telefone: this.selected[0].telefone,
        celular: this.selected[0].celular,
        obs: this.selected[0].obs
      },
      results: []
    }
  },
  directives: {mask},
  methods: {
    update () {
      let newLead = {
        nome: this.lead.nome,
        email: this.lead.email,
        telefone: this.lead.telefone,
        celular: this.lead.celular,
        obs: this.lead.obs
      }
      axios
        .put(process.env.API + 'leads/' + this.selected[0].id, newLead)
        .then(response => {
          this.results = response.data
          alert('Lead alterado com sucesso')
          window.location.reload()
        })
        .catch(error => {
          alert(error.response.data.code)
          console.log(error.response.data)
        })
    }
  }
}
</script>
<style lang='scss'>
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
