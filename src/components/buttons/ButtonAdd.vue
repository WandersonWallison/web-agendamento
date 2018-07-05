<template>
  <div class="example">

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>
      <md-dialog-actions>

        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>

    </md-dialog>

    <md-speed-dial class="md-bottom-right" md-direction="top">
      <cad-empresa/>

      <md-speed-dial-target>
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">edit</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="showDialog = true">
          <md-icon>note</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showDialog = true" >
          <md-icon>event</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showDialog = true" >
          <md-icon>account_circle</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
  </div>
</template>

<script>
import FormAddEmpresa from '../forms/FormCadastroEmpresa.vue'
import CadAgente from '../forms/FormAddUser'
import FormCadastroLead from '../forms/FormCadastroLead.vue'

 export default {
    name: 'buttonAdd',
    component:{
      FormAddEmpresa,
      CadAgente,
      FormCadastroLead
    },
    data: () => ({
      showDialog: false
    })
  }
</script>

<style lang="scss" scoped>
  .example {
    min-height: 180px;
  }
  .md-dialog {
    max-width: 768px;
  }
</style>

