<template>
    <div class="centered-container">
    <md-card-content>
    <div class="form">
      <md-card-header>
        <div class="md-title">Cadastro de Leads</div>
      </md-card-header>
     <md-field>
        <label>Nome</label>
          <md-input v-model="type"></md-input>
     </md-field>
     <md-field>
        <label>Email</label>
          <md-input v-model="type"></md-input>
     </md-field>
     <md-field>
      <label>CNH</label>
      <md-input v-model="number" type="number"></md-input>
    </md-field>
    <md-field>
      <md-icon>event</md-icon>
      <label>Data Emissão</label>
      <md-input v-model="date"></md-input>
    </md-field>
  </div>
  </md-card-content>
    </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      results: null
    }
  },
  mounted () {
    Axios
      .get('http://localhost:1337/profile')
      .then(response => (this.results = response))
  }
}
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  }
</style>
