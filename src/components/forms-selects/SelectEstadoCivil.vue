<template>
    <md-field>
          <md-select v-model="estadoCivil" name="estadoCivil" id="estadoCivil" placeholder="Estado Civil">
            <md-option value="0">Solteiro</md-option>
            <md-option value="1">Casado</md-option>
            <md-option value="2">Divorciado</md-option>
            <md-option value="3">Viúvo</md-option>
            <md-option value="4">Outros</md-option>

          </md-select>
        </md-field>
</template>

<script>
export default {
  name: "estadoCivil"
}
</script>
<style>
</style>
