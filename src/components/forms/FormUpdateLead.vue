<template>

     <md-content class="md-elevation-1 body-content">
        <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Alterar Contato</span>
        </md-toolbar>
        <md-field>
          <label>Nome Completo</label>
          <md-input v-model="lead.nome" placeholder="Nome Completo"></md-input>
        </md-field>
        <label>Data Nascimento</label>
          <md-datepicker v-model="lead.data_nascimento" md-immediately/>
        <md-field>
          <label>Email</label>
          <md-input v-model="lead.email" placeholder="E-mail" ></md-input>
        </md-field>
        <md-field>
          <label>CPF</label>
          <md-input v-model="lead.cpf" placeholder="CPF" ></md-input>
        </md-field>
        <md-field>
          <label>RG</label>
          <md-input v-model="lead.cnh_rg" placeholder="RG" ></md-input>
        </md-field>
           <label>Data Emissão</label>
          <md-datepicker v-model="lead.data_emissao" md-immediately/>
        <md-field>
          <label>Telefone</label>
          <md-input v-model="lead.telefone" placeholder="Telefone"></md-input>
        </md-field>
        <md-field>
          <label>Gênero</label>
          <div class="md-layout-item">
          <md-select v-model="lead.genero" name='genero' id='genero' placeholder='Gênero'>
            <md-option value='F'>Feminino</md-option>
            <md-option value='M'>Masculino</md-option>
          </md-select>
          </div>
        </md-field>
        <md-field>
          <label>Estado Civil</label>
          <div class="md-layout-item">
          <md-select v-model="lead.estado_civil" name='estadoCivil' id='estadoCivil' placeholder='Estado Civil'>
            <md-option value="Solteiro">Solteiro</md-option>
            <md-option value="Casado">Casado</md-option>
            <md-option value="Divorciado">Divorciado</md-option>
            <md-option value="Divorciado">Divorciado</md-option>
            <md-option value="Outros">Outros</md-option>
          </md-select>
          </div>
        </md-field>
        <md-field>
          <label>Nome Cônjuge </label>
          <md-input v-model="lead.nome_conjuge" placeholder='Nome Cônjuge'></md-input>
        </md-field>
        <md-field>
          <label>Nome da mãe </label>
          <md-input v-model="lead.nome_mae" placeholder='Nome da mãe'></md-input>
        </md-field>
        <md-field>
          <label>Nome do pai </label>
          <md-input v-model="lead.nome_pai" placeholder='Nome do pai'></md-input>
        </md-field>
        <md-field>
          <label>Escolaridade</label>
          <div class="md-layout-item">
          <md-select v-model="lead.escolaridade" name="escolaridade" id="escolaridade" placeholder="Escolaridade">
            <md-option value="Ensino Fundamental">Ensino Fundamental</md-option>
            <md-option value="Ensino Medio">Ensino médio</md-option>
            <md-option value=" Ensino Superior">Ensino Superior</md-option>
            <md-option value="Ensino pós superior">Ensino pós superior</md-option>
          </md-select>
          </div>
        </md-field>
        <br>
        <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="update">Atualizar</md-button>
        </div>
     </md-content>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'FormUpdadeLead',
  props: ['selected'],
  data () {
    return {
      lead: {
        nome: this.selected[0].nome,
        data_nascimento: this.selected[0].data_nascimento,
        data_emissao: this.selected[0].data_emissao,
        email: this.selected[0].email,
        cpf: this.selected[0].cpf,
        cnh_rg: this.selected[0].cnh_rg,
        telefone: this.selected[0].telefone,
        genero: this.selected[0].genero,
        estado_civil: this.selected[0].estado_civil,
        nome_conjuge: this.selected[0].nome_conjuge,
        nome_mae: this.selected[0].nome_mae,
        nome_pai: this.selected[0].nome_pai,
        escolaridade: this.selected[0].escolaridade
      },
      results: []
    }
  },
  methods: {
    update () {
      let newLead = {
        nome: this.lead.nome,
        data_nascimento: moment(this.lead.data_nascimento).format('YYYY-MM-DD'),
        email: this.lead.email,
        cpf: this.lead.cpf,
        cnh_rg: this.lead.cnh_rg,
        data_emissao: moment(this.lead.data_emissao).format('YYYY-MM-DD'),
        telefone: this.lead.telefone,
        genero: this.lead.genero,
        estado_civil: this.lead.estado_civil,
        nome_conjuge: this.lead.nome_conjuge,
        nome_mae: this.lead.nome_mae,
        nome_pai: this.lead.nome_pai,
        escolaridade: this.lead.escolaridade,
        tipo: 'Cliente'
      }
      axios
        .put(process.env.API + 'leads/' + this.selected[0].id, newLead)
        .then(response => {
          this.results = response.data
          alert('User alterado com sucesso')
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
