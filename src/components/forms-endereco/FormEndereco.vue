<template>
<div>
        <md-field>
          <md-input v-model="endereco.rua" autofocus placeholder="Rua"></md-input>
        </md-field>
        <md-field>
          <md-input type='number' v-model="endereco.numero" autofocus placeholder="Numero"></md-input>
        </md-field>
        <md-field>
          <md-input v-model="endereco.bairro" autofocus placeholder="Bairro"></md-input>
        </md-field>
        <br>
          <UF/>
        <md-field>
          <md-input v-model="endereco.cidade" autofocus placeholder="Cidade" ></md-input>
        </md-field>
        <md-field>
          <md-input type='Number' v-model="endereco.cep" autofocus placeholder="CEP"></md-input>
        </md-field>
</div>
</template>
<script>
import UF from '../forms-selects/SelectUF'

export default {
  name: 'endereco',
  components: {
    UF
  },
  data () {
    return {
      loading: false,
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        cep: ''
      },
      results: null
    }
  }
}
</script>
<style>
</style>
