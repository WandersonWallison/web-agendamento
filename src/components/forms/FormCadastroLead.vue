<template>

   <div class="centered-container">
     <md-content class="md-elevation-1 body-content">
        <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Cadastro de Contato</span>
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
          <label>RG</label>
          <md-input v-model="lead.cnh_rg" placeholder="CNH/RG" ></md-input>
        </md-field>
         <md-field>
           <label>Data Emissão</label>
          <md-datepicker v-model="lead.data_emissao" md-immediately/>
        </md-field>
        <endereco/>
        <br>
        <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="add">Cadastrar</md-button>

      </div>
     </md-content>
    </div>
</template>


<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'FormCadastroLead',
  data () {
    return {
      lead: {
        nome: '', email: '', cnh_rg: '', data_emissao: '', data_criacao: Date.now()
      },
      results: []
    }
  },
  methods: {
    add (){
      let newLead = {
        nome: this.lead.nome,
        email: this.lead.email,
        cnh_rg: this.lead.cnh_rg,
        data_emissao: moment(this.lead.data_emissao).format('YYYY-MM-DD'),
        data_criacao: moment(this.lead.data_criacao).format(),
        tipo: 'Lead',
        data_nascimento: null
      }

        console.log(newLead)
        axios.post(process.env.API+'leads',newLead)
        .then((response) =>{
          this.results = response.data
           alert( "User cadastado com success" )
           window.location.reload()
          console.log(response.data)
        })
        .catch((error) => {
          alert(error.response.data.code)
          console.log(error.response.data)
        });

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
