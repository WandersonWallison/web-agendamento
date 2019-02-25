<template>
  <div class="page-container expande-div">
    <md-content>
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-toobar" md-elevation="1">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon style="color:white;">menu</md-icon>
        </md-button>
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
            @md-confirm='sair'/>

            <md-button class="text-principal"  @click='senha = true'>Alterar Senha</md-button>
            <md-button class="text-principal"  @click='active = true'>Sair</md-button>
        </div>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Menu</md-toolbar>

        <md-list>
          <!--
          <md-list-item @click= 'mShowDash'>
            <md-icon>pie_chart</md-icon>
            <span class="md-list-item-text">Dashboard</span>
          </md-list-item>
          -->
          <md-list-item @click= 'mShowHunter'>
            <md-icon>format_list_bulleted</md-icon>
            <span class="md-list-item-text">Atividades Hunter</span>
          </md-list-item>

          <md-list-item @click= 'mShowAgente'>
            <md-icon>view_day</md-icon>
            <span class="md-list-item-text">Atividades Assessores</span>
          </md-list-item>

          <md-list-item  @click= 'mShowLeads'>
            <md-icon>format_list_numbered</md-icon>
            <span class="md-list-item-text">Leads</span>
          </md-list-item>

          <md-list-item  @click= 'mShowUsuario'>
            <md-icon>group</md-icon>
            <span class="md-list-item-text">Usuários</span>
          </md-list-item>

          <md-list-item  @click= 'mShowOffice'>
            <md-icon>business_center</md-icon>
            <span class="md-list-item-text">Escritórios</span>
          </md-list-item>

          <md-list-item  @click= 'mShowCompany'>
            <md-icon>business</md-icon>
            <span class="md-list-item-text">Empresa</span>
          </md-list-item>

          <md-list-item  @click='active = true'>
            <md-icon>meeting_room</md-icon>
            <span class="md-list-item-text">Sair</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>
      <md-app-content v-if="showOffice === true">
        <br/>
        <lista-office/>
      </md-app-content>
      <md-app-content v-if="showDash === true">
        <dashboard/>
      </md-app-content>
      <md-app-content v-if="showLeads === true">
        <br/>
        <lista-leads/>
      </md-app-content>
      <md-app-content v-if="showUsuario === true">
        <br/>
        <lista-usuarios/>
      </md-app-content>
      <md-app-content v-if="showAtAgentes === true">
        <br/>
        <lista-agendamentos-realizados/>
      </md-app-content>
      <md-app-content v-if="ShowAtHunter === true">
        <br/>
        <lista-atividades-hunter/>
      </md-app-content>
      <md-app-content v-if="ShowAtEmpresa === true">
        <br/>
        <list-empresa/>
      </md-app-content>
    </md-app>
    </md-content>
  </div>
</template>
<script>
import FormAddUser from './FormAddUser.vue'
import ListCliente from '../lists/ListCliente.vue'
import ListEmpresa from '../lists/ListCompany.vue'
import ButtonAdd from '../buttons/ButtonAdd.vue'
import ListClienteAguardando from '../lists/ListClienteAguardandoContato.vue'
import Dashboard from './FormDashbord.vue'
import AlterSenha from './FormAlterPassword.vue'
import ListaUsuarios from '../lists/ListUsuarios.vue'
import ListaAgendamentosRealizados from '../lists/ListAgendamentosRealizados.vue'
import ListaAtividadesHunter from './../lists/ListAtividadesHunters.vue'
import ListaOffice from './../lists/ListOfices.vue'
import ListaLeads from '../lists/ListLeadAdm.vue'

export default {
  name: 'Home',
  components: {
    FormAddUser,
    ListCliente,
    ListEmpresa,
    ButtonAdd,
    ListClienteAguardando,
    Dashboard,
    AlterSenha,
    ListaUsuarios,
    ListaAgendamentosRealizados,
    ListaAtividadesHunter,
    ListaOffice,
    ListaLeads
  },
  data: () => ({
    menuVisible: false,
    showDialog: false,
    active: false,
    value: null,
    senha: false,
    showDash: false,
    showUsuario: false,
    showAtAgentes: false,
    ShowAtHunter: false,
    showOffice: false,
    ShowAtEmpresa: false,
    showLeads: true
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    sair () {
      this.value = 'Sim'
      this.$router.push('/')
      window.localStorage.clear()
    },
    mShowUsuario () {
      this.inativaComponentes()
      this.showUsuario = true
      this.menuVisible = false
    },
    mShowLeads () {
      this.inativaComponentes()
      this.showLeads = true
      this.menuVisible = false
    },
    mShowOffice () {
      this.inativaComponentes()
      this.showOffice = true
      this.menuVisible = false
    },
    mShowCompany () {
      this.inativaComponentes()
      this.ShowAtEmpresa = true
      this.menuVisible = false
    },
    mShowHunter () {
      this.inativaComponentes()
      this.ShowAtHunter = true
      this.menuVisible = false
    },
    mShowAgente () {
      this.inativaComponentes()
      this.showAtAgentes = true
      this.menuVisible = false
    },
    mShowDash () {
      this.inativaComponentes()
      this.showDash = true
      this.menuVisible = false
    },
    inativaComponentes () {
      this.showOffice = false
      this.showDash = false
      this.showUsuario = false
      this.showAtAgentes = false
      this.ShowAtHunter = false
      this.ShowAtEmpresa = false
      this.showLeads = false
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
.divSenha{
  display: flex;
  height: 55%;
  width: 22%;
}
.expande-div{
  height: 85%;
}
</style>
