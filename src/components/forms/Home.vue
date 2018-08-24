<template>
<div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-toobar">
        <!--
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button> -->
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
      <!--<md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Menu</md-toolbar>
        <md-list>
          <md-list-item md-expand>
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Dashboard</span>
            <md-list slot="md-expand">
            <md-button to="/home">Home</md-button>
          </md-list>
          </md-list-item>
          <md-list-item md-expand>
            <md-icon>gavel</md-icon>
            <span class="md-list-item-text">Admin</span>
          </md-list-item>
          <md-list-item md-expand>
            <md-icon>contacts</md-icon>
            <span class="md-list-item-text">Contatos</span>
          <md-list slot="md-expand">
            <md-button to="/lead/list">Listar</md-button>
            <md-button class="md-inset">Adicionar</md-button>
            <md-button to="/lead/listAguardo">Aguardando</md-button>
          </md-list>
          </md-list-item>
          <md-list-item md-expand>
            <md-icon>schedule</md-icon>
            <span class="md-list-item-text">Agendamentos</span>
          <md-list slot="md-expand">
            <md-button to="/lead/listAguardo">Aceitos</md-button>
            <md-button to="/lead/list">Recusados</md-button>
          </md-list>
          </md-list-item>
        </md-list>
      </md-app-drawer> -->
      <!--
      <md-app-content>
        <list-cliente ref="ListCliente"></list-cliente>
      </md-app-content>
      -->
    </md-app>
<button-add></button-add>
  </div>
</template>
<script>
import FormAddUser from './FormAddUser'
import ListCliente from '../lists/ListCliente'
import FormAddEmpresa from './FormCadastroEmpresa.vue'
import ButtonAdd from '../buttons/ButtonAdd'
import ListClienteAguardando from '../lists/ListClienteAguardandoContato'

export default {
  name: 'Home',
  components: {
    FormAddUser,
    ListCliente,
    FormAddEmpresa,
    ButtonAdd,
    ListClienteAguardando
  },
  data: () => ({
    menuVisible: false,
    showDialog: false,
    active: false,
    value: null
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
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
