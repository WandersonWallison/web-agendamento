<template>
    <md-field>
          <md-select v-model="escolaridade" name="escolaridade" id="escolaridade" placeholder="Escolaridade">
            <md-option value="Ensino Fundamental">Ensino Fundamental</md-option>
            <md-option value="Ensino Medio">Ensino médio</md-option>
            <md-option value=" Ensino Superior">Ensino Superior</md-option>
            <md-option value="Ensino pós superior">Ensino pós superior</md-option>
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
