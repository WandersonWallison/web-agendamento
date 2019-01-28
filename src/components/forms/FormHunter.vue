<template>
<div class="page-container">
    <md-app md-mode="reveal">
       <md-app-toolbar class="md-toobar" md-elevation="1">
        <h3 class="text-principal text-tamanho-titulo" style="flex:1">Prosperidade</h3>
        <div>
          <md-card>
            <md-dialog :md-active.sync="senha" class="divSenha">
              <alter-senha/>
            </md-dialog>
          </md-card>
          <md-dialog-confirm
            :md-active.sync='active'
            md-title='Prosperidade'
            md-content='Deseja Realmente sair do sistema'
            md-confirm-text='Sim'
            md-cancel-text='Não'
            @md-confirm='sair' />

          <md-button class="text-principal" @click='senha = true'>Alterar Senha</md-button>
          <md-button class="text-principal" @click='active = true'>Sair</md-button>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <ListCliente></ListCliente>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>

import ListCliente from '../lists/ListCliente.vue'
import AlterSenha from './FormAlterPassword.vue'

export default {
  name: 'Hunter',
  components: {
    ListCliente,
    AlterSenha
  },
  data: () => ({
    // menuVisible: false,
    showDialog: false,
    active: false,
    value: null,
    senha: false
  }),
  methods: {
    sair () {
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
}.divSenha{
  display: flex;
  height: 55%;
  width: 22%;
}
</style>
