<template>
    <md-field>
          <md-select v-model="estados" name="estado" id="estados" placeholder="Estados">
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
</template>

<script>

export default{
  name: 'UF'
}
</script>
<style>
</style>
