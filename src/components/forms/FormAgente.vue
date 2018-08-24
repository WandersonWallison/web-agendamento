<template>
<div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-toobar">
        <span class="md-title">Prosperidade</span>
        <!-- <img class="md-title" src='../../assets/marca_branca_fundo_transparente.png'> -->
        <div>
          <md-dialog-confirm
            :md-active.sync='active'
            md-title='Prosperidade'
            md-content='Deseja Realmente sair do sistema'
            md-confirm-text='Sim'
            md-cancel-text='Não'
            @md-confirm='sair' />
          <md-button @click='active = true'>Sair</md-button>
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
  background-color: #15da93;
}
.md-fab {
  display: block;
  float: right;
  margin-top: 200px;
}
</style>
