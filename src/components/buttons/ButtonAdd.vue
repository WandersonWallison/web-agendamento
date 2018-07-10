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

      </md-speed-dial-content>
    </md-speed-dial>


  <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Cadastrar Agenda</md-dialog-title>
        <cad-lead/>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>


<script>
import CadLead from '../forms/FormCadastroLead.vue'

 export default {
    name: 'buttonAdd',
    components:{
      CadLead,
    },
    data: () => ({
      showDialog: false,
      cadformlead:false
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

