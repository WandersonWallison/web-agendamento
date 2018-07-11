<template>

   <div class="centered-container">
     <md-content class="md-elevation-1 body-content">
        <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Cadastro de Escritório</span>
        </md-toolbar>
        <md-field>
          <md-input v-model="company.nome" placeholder="Escritório" autofocus></md-input>
        </md-field>
        <md-field>
          <md-input v-model="company.responsavel" placeholder="Responsável" autofocus ></md-input>
        </md-field>
         <md-field>
          <md-input type="url" v-model="company.site" placeholder="Site" autofocus></md-input>
        </md-field>
        <md-field>
          <md-input  type="tel" v-model="company.fone" maxlength="12" placeholder="Telefone" autofocus></md-input>
        </md-field>
        <md-field>
          <md-input type="email" v-model="company.email" placeholder="E-mail" autofocus></md-input>
        </md-field>
        <endereco/>
        <br>
        <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="auth">Cadastrar</md-button>

      </div>
     </md-content>
    </div>
</template>

<script>
import endereco from '../forms-endereco/FormEndereco'
export default {
  name: 'company',
  components: {
    endereco
  },
  data () {
    return {
      loading: false,
      company: {
        nome: '',
        responsavel: '',
        site: '',
        telefone: '',
        email: ''
      },
      results: null
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
  height: 170vh;

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
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 1200px;
    position: absolute;
  }
}
</style>
