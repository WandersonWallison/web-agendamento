<template>
<div class="page-container">
  <router-view/>
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-toobar">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>

        </md-button>
        <span class="md-title">Prosperidade</span>
        <!-- <img class="md-title" src='../../assets/marca_branca_fundo_transparente.png'> -->
        <md-button >Sair</md-button>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
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
          </md-list>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
        <list-crud-lead/>
      </md-app-content>
    </md-app>
<button-add></button-add>
  </div>
</template>
<script>
import FormAddUser from './FormAddUser'
import ListCrudLead from '../lists/ListCrudLead'
import FormAddEmpresa from './FormCadastroEmpresa.vue'
import ButtonAdd from '../buttons/ButtonAdd'

export default {
  name: 'FormCrudLead',
  components: {
    FormAddUser,
    ListCrudLead,
    FormAddEmpresa,
    ButtonAdd
  },
  data: () => ({
    menuVisible: false,
    showDialog: false
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
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
