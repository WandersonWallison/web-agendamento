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
      <cad-lead/>
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
    min-height: 40%;
  }
  .md-dialog {
    width:80%;
    max-width: 100%;
  }
</style>

