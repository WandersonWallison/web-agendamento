<template>
<div class="page-container">
    <md-app>
      <md-app-toolbar class="md-toobar" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
         <img src='../../assets/logoProsperidade2.jpeg' class="container-img">

      <md-button>Sair</md-button>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Menu</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>dashboard</md-icon>
            <md-button>Dashboard</md-button>
          </md-list-item>
          <md-list-item>
            <md-icon>gavel</md-icon>
            <md-button>Admin</md-button>
          </md-list-item>

          <md-list-item>
            <md-icon>contacts</md-icon>
            <md-button>Clientes</md-button>
          </md-list-item>

          <md-list-item>
            <md-icon>list</md-icon>
            <md-button>Listas</md-button>
          </md-list-item>

          <md-list-item>
            <md-icon>create</md-icon>
            <md-button>Alterar</md-button>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
       <list-cliente/>
      </md-app-content>
    </md-app>
    <button-add></button-add>

  </div>
</template>

<script>

import FormAddUser from './FormAddUser'
import FormLogin from './FormLogin.vue'
import ListCliente from '../lists/ListCliente'
import FormAddEmpresa from './FormCadastroEmpresa.vue'
import ButtonAdd from '../buttons/ButtonAdd'

export default {
  name: 'HelloWorld',
  components: {
    FormAddUser,
    ListCliente,
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
.container-img {
    max-width:200px;
    max-height:150px;
    margin-right:40%;
    margin-left:40%;

}

</style>
