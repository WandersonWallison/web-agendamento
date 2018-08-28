<template>
<div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-toobar" md-elevation="1">
        <!--
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button> -->
        <h3 class="text-principal text-tamanho-titulo" style="flex:1">Prosperidade</h3>
        <!--<img class="md-title" src='../../assets/marca_branca_fundo_transparente.png'>-->
        <div>
          <md-dialog-confirm
            :md-active.sync='active'
            md-title='Prosperidade'
            md-content='Deseja Realmente sair do sistema'
            md-confirm-text='Sim'
            md-cancel-text='Não'
            @md-confirm='sair' />
          <md-button class="text-principal" @click='active = true'>Sair</md-button>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <agendamento></agendamento>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
import FormAddUser from './FormAddUser'
import Agendamento from '../lists/ListAgendamento.vue'
import FormAddEmpresa from './FormCadastroEmpresa.vue'

export default {
  name: 'Agente',
  components: {
    FormAddUser,
    Agendamento,
    FormAddEmpresa,
  },
  data: () => ({
    //menuVisible: false,
    showDialog: false,
    active: false,
    value: null
  }),
  methods: {
    sair(){
      this.value = 'Sim'
      this.$router.push('/')
      window.localStorage.clear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}
// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.md-toobar {
  background-color: #5c6763;
}
.md-fab {
  display: block;
  float: right;
  margin-top: 200px;
}
.text-tamanho-titulo{
  font-size: 25px;
}
.text-principal {
  color: aliceblue;
  margin: 0;
  margin-left: 8px;
  overflow: hidden;
  font-weight: 400;
  letter-spacing: .02em;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
  font-weight: 500;
  letter-spacing: .005em;
  line-height: 26px;
}
</style>
