<template>
  <div class="example">
    <md-speed-dial class="md-bottom-right" md-direction="top">

      <md-speed-dial-target>
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">edit</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="showDialog = true">
          <md-icon>note</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showAgente = true">
          <md-icon>people</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showEmpresa = true">
          <md-icon>location_city</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showAgendamento = true">
          <md-icon>location_city</md-icon>
        </md-button>

      </md-speed-dial-content>
    </md-speed-dial>

    <md-dialog :md-active.sync="showAgente" class="div">
      <cad-user/>
    </md-dialog>
    <md-dialog :md-active.sync="showDialog" class="div">
      <cad-lead/>
    </md-dialog>
    <md-dialog :md-active.sync="showEmpresa" class="div">
      <cad-empresa/>
    </md-dialog>
    <md-dialog :md-active.sync="showAgendamento" class="div">
      <cad-agendamento/>
    </md-dialog>
  </div>
</template>


<script>
import CadLead from '../forms/FormCadastroLead.vue'
import CadUser from '../forms/FormAddUser.vue'
import CadEmpresa from '../forms/FormCadastroEmpresa.vue'
import CadAgendamento from '../forms/FormAgendamento'


export default {
  name: 'buttonAdd',
  components: {
    CadLead,
    CadUser,
    CadEmpresa,
    CadAgendamento
  },
  data: () => ({
    showDialog: false,
    showAgente: false,
    showEmpresa: false,
    showAgendamento: false
  })
};
</script>

<style lang='scss' scoped>
.example {
  min-height: 40%;
}
.md-dialog {
  width: 70%;
  height: 70%;
  max-width: 100%;
}
.div{
  overflow: auto;
}
</style>

