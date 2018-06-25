<template>
    <md-field>
          <md-select v-model="genero" name="genero" id="genero" placeholder="Genero">
            <md-option value="1">Feminino</md-option>
            <md-option value="0">Masculino</md-option>
          </md-select>
        </md-field>
</template>

<script>
   export default {
  name: 'Genero'

};
</script>
<style>
</style>
