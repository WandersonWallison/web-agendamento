<template>

   <div class="centered-container">
     <md-content class="md-elevation-1 body-content">
        <md-toolbar md-elevation="0" class="md-dense">
          <span class="md-title">Adicionar Endereço</span>
        </md-toolbar>
        <md-field>
          <label>Cep</label>
          <md-input type="number" maxlength="10" v-model="endereco.cep" autofocus placeholder="CEP"></md-input>
        </md-field>
        <md-field>
          <label>Rua</label>
          <md-input v-model="endereco.rua" autofocus placeholder="Rua"></md-input>
        </md-field>
        <md-field>
          <label>Numero</label>
          <md-input type="number" maxlength="6" v-model="endereco.numero" autofocus placeholder="Numero"></md-input>
        </md-field>
         <md-field>
          <label>Estados</label>
          <md-select v-model="endereco.uf" name="estado" id="estados" placeholder="Estados">
            <md-option value="">Estados</md-option>
            <md-option value="ac">Acre</md-option>
            <md-option value="al">Alagoas</md-option>
            <md-option value="am">Amazonas</md-option>
            <md-option value="ap">Amapá</md-option>
            <md-option value="ba">Bahia</md-option>
            <md-option value="ce">Ceará</md-option>
            <md-option value="df">Distrito Federal</md-option>
            <md-option value="es">Espírito Santo</md-option>
            <md-option value="go">Goiás</md-option>
            <md-option value="ma">Maranhão</md-option>
            <md-option value="mt">Mato Grosso</md-option>
            <md-option value="ms">Mato Grosso do Sul</md-option>
            <md-option value="mg">Minas Gerais</md-option>
            <md-option value="pa">Pará</md-option>
            <md-option value="pb">Paraíba</md-option>
            <md-option value="pr">Paraná</md-option>
            <md-option value="pe">Pernambuco</md-option>
            <md-option value="pi">Piauí</md-option>
            <md-option value="rj">Rio de Janeiro</md-option>
            <md-option value="rn">Rio Grande do Norte</md-option>
            <md-option value="ro">Rondônia</md-option>
            <md-option value="rs">Rio Grande do Sul</md-option>
            <md-option value="rr">Roraima</md-option>
            <md-option value="sc">Santa Catarina</md-option>
            <md-option value="se">Sergipe</md-option>
            <md-option value="sp">São Paulo</md-option>
            <md-option value="to">Tocantins</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Cidade</label>
          <md-input v-model="endereco.cidade" autofocus placeholder="Cidade" ></md-input>
        </md-field>
        <md-field>
          <label>Bairro</label>
          <md-input v-model="endereco.bairro" autofocus placeholder="Bairro"></md-input>
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
  name: 'endereco',
  props: ['selected'],
  data () {
    return {
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        cep: ''
      },
      results: []
    }
  },
  methods: {
    add () {
      let newEndereco = {
        rua: this.endereco.rua,
        numero: this.endereco.numero,
        bairro: this.endereco.bairro,
        cidade: this.endereco.cidade,
        cep: this.endereco.cep,
        leads_address: this.selected[0].id
      }
      axios.post(process.env.API + 'address', newEndereco)
        .then((response) => {
          this.results = response.data
          alert('Endereço adicionado ' + this.selected[0].nome + ' com sucesso')
          window.location.reload()
          console.log(response.data)
        })
        .catch((error) => {
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
