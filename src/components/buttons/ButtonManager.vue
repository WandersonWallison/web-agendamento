<template>
  <div class="example">
    <md-speed-dial class="md-bottom-right" md-direction="top" md-event="click">
      <md-speed-dial-target>
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">close</md-icon>
      </md-speed-dial-target>
      <md-speed-dial-content>
        <!--
        <md-button class="md-icon-button" @click="showDialog = true">
          <md-tooltip md-direction="left">Contato</md-tooltip>
          <md-icon>contact_phone</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showEscritorio = true">
          <md-tooltip md-direction="left">Escritório</md-tooltip>
          <md-icon>location_city</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showEmpresa = true">
          <md-tooltip md-direction="left">Empresa</md-tooltip>
          <md-icon>business</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showAgente = true">
          <md-tooltip md-direction="left">Usuário</md-tooltip>
          <md-icon>person_add</md-icon>
        </md-button>
        -->
        <md-button class="md-icon-button" @click="showListaParaAgendamento = true">
          <md-tooltip md-direction="left">Cadastro de Lead</md-tooltip>
          <md-icon>list_alt</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showListaClienteAguardando = true">
          <md-tooltip md-direction="left">Atribuir Leads</md-tooltip>
          <md-icon>playlist_add_check</md-icon>
        </md-button>
        <!--
        <md-button class="md-icon-button" @click="showListUsuario = true">
          <md-tooltip md-direction="left">Lista Usuarios</md-tooltip>
          <md-icon>people</md-icon>
        </md-button>
        -->
      </md-speed-dial-content>
    </md-speed-dial>
    <md-dialog :md-active.sync="showDialog" class="div-contato">
      <cad-lead/>
    </md-dialog>
    <md-dialog :md-active.sync="showAgente" class="div">
      <cad-user/>
    </md-dialog>
    <md-dialog :md-active.sync="showEscritorio" class="div">
      <cad-escritorio/>
    </md-dialog>
    <md-dialog :md-active.sync="showEmpresa" class="div-empresa">
      <cad-empresa/>
    </md-dialog>
    <md-dialog :md-active.sync="showListaParaAgendamento" class="div">
      <list-cliente ref="ListCliente"></list-cliente>
    </md-dialog>
    <md-dialog :md-active.sync="showListaClienteAguardando" class="div">
      <ListClienteAguardando/>
    </md-dialog>
  </div>
</template>
<script>
import CadLead from '../forms/FormCadastroLead.vue'
import CadUser from '../forms/FormCadastraUsuarioManger'
import CadEscritorio from '../forms/FormCadastroEscritorio.vue'
import CadEmpresa from '../forms/FormCadastroEmpresa.vue'
import ListCliente from '../lists/ListCrudLead.vue'
import ListClienteAguardando from '../lists/ListClienteAguardandoContato.vue'
export default {
  name: 'buttonAdd',
  components: {
    CadLead,
    CadUser,
    CadEscritorio,
    CadEmpresa,
    ListCliente,
    ListClienteAguardando
  },
  data: () => ({
    showDialog: false,
    showAgente: false,
    showEscritorio: false,
    showEmpresa: false,
    showListaParaAgendamento: false,
    showListaClienteAguardando: false,
    showListUsuario: false
  })
}
</script>
<style lang='scss' scoped>
.example {
  min-height: 70%;
  width: 100%;
  height: 100%;
}
.md-dialog {
  overflow: auto;
  width: 100%;
  height: 100%;
  max-width: 100%;
}
.div{
  overflow: auto;
  height: 75%;
  width: 85%;
}
.div-empresa{
  overflow: auto;
  height: 70%;
  width: 85%;
}
.div-contato{
  overflow: auto;
  height: 75%;
  width: 90%;
}
</style>
