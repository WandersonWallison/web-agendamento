<template>
  <div class="example">
    <md-speed-dial class="md-bottom-right" md-direction="top">
      <md-speed-dial-target>
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">edit</md-icon>
      </md-speed-dial-target>
      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="showDialog = true">
          <md-tooltip md-direction="top">Contato</md-tooltip>
          <md-icon>note</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showAgente = true">
          <md-tooltip md-direction="top">Agente</md-tooltip>
          <md-icon>people</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showEmpresa = true">
          <md-tooltip md-direction="top">Escritório</md-tooltip>
          <md-icon>location_city</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
    <md-dialog :md-active.sync="showDialog" class="div">
      <cad-lead/>
    </md-dialog>
    <md-dialog :md-active.sync="showAgente" class="div">
      <cad-user/>
    </md-dialog>
    <md-dialog :md-active.sync="showEmpresa" class="div">
      <cad-empresa/>
    </md-dialog>
  </div>
</template>
<script>
import CadLead from '../forms/FormCadastroLead.vue'
import CadUser from '../forms/FormAddUser.vue'
import CadEmpresa from '../forms/FormCadastroEmpresa.vue'

export default {
  name: 'buttonAdd',
  components: {
    CadLead,
    CadUser,
    CadEmpresa
  },
  data: () => ({
    showDialog: false,
    showAgente: false,
    showEmpresa: false,
    showAgendamento: false
  })
}
</script>
<style lang='scss' scoped>
.example {
  min-height: 60%;
}
.md-dialog {
  width: 100%;
  height: 100%;
  max-width: 100%;
}
.div{
  overflow: auto;
  height: 70%;
  width: 70%;

}
</style>
