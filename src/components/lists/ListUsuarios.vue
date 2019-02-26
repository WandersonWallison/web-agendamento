<template>
  <div class="expande-div">
    <md-dialog-prompt
      :md-active.sync='active'
      v-model='newValuePassword'
      md-title='Alterar Senha do Usuário'
      md-input-maxlength='8'
      md-input-placeholder='Digite a nova senha'
      md-confirm-text='Alterar'
      @md-confirm='Alterar'
    />
  <md-dialog-confirm
      :md-active.sync='bloqueio'
      md-title='Deseja ativar usuário?'
      md-confirm-text='Sim'
      md-cancel-text='Não'
      @md-confirm='Bloquear'
    />
    <md-dialog-confirm
      :md-active.sync='desbloqueio'
      md-title='Deseja desativar usuário?'
      md-confirm-text='Sim'
      md-cancel-text='Não'
      @md-confirm='Bloquear'
    />
    <md-dialog :md-active.sync="showUsuario" class="div">
      <cad-user/>
    </md-dialog>
    <md-dialog :md-active.sync="showUsuarioManager" class="div">
      <cad-user-manager/>
    </md-dialog>
    <md-table v-model='people' md-sort="name" md-sort-order="asc" md-card  @md-selected="onSelect" md-fixed-header class="extender-div">
      <md-table-toolbar>
        <h1 class='md-title'>Lista de Usuários</h1>
        <md-button class="md-raised md-primary" @click="cadastrarUsuario()">
          <md-icon class='botao-red'>person_add</md-icon>
          <md-tooltip md-direction='top'>Cadastro de Usuário</md-tooltip>
        </md-button>
        <md-button @click="trocarSenha()">
          <md-icon class='botao-red'>lock</md-icon>
          <md-tooltip md-direction='top'>Alterar Senha</md-tooltip>
        </md-button>
        <md-button @click="bloquearUsuario()" v-if="selected.ativo === false">
          <md-icon class='botao-red'>no_encryption</md-icon>
          <md-tooltip md-direction='top'>Ativar</md-tooltip>
        </md-button>
        <md-button @click="desbloquearUsuario()" v-else>
          <md-icon class='botao-red'>no_encryption</md-icon>
          <md-tooltip md-direction='top'>Desativar</md-tooltip>
        </md-button>
      </md-table-toolbar>
      <md-table-row
        class="alinhamento-table"
        slot='md-table-row'
        slot-scope='{ item }'
        :class='getClass(item)'
        md-selectable='single'
      >
        <md-table-cell md-label='ID' md-sort-by='id' md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label='Status' v-if="item.ativo === false " md-sort-by='status'>Desativado</md-table-cell>
        <md-table-cell md-label='Status' v-if="item.ativo === true " md-sort-by='status'>Ativo</md-table-cell>
        <md-table-cell md-label='Perfil' md-sort-by='id_profile' md-numeric>{{ item.id_profile['name']}}</md-table-cell>
        <md-table-cell md-label='Escritorio' md-sort-by='id_office'>{{ item.id_office['nome']}}</md-table-cell>
        <md-table-cell md-label='Nome' md-sort-by='username'>{{ item.username }}</md-table-cell>
        <md-table-cell md-label='Email' md-sort-by='email'>{{ item.email }}</md-table-cell>
        <md-table-cell md-label='telefone' md-sort-by='telefone'>{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label='Celular' md-sort-by='celular'>{{ item.celular }}</md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>
<script>
import axios from 'axios'
import CadUser from '../forms/FormAddUser.vue'
import CadUserManager from '../forms/FormCadastraUsuarioManger.vue'
export default {
  name: 'ListaUsuario',
  components: {
    CadUser,
    CadUserManager
  },
  data: () => ({
    selected: {},
    people: [],
    perfil: [],
    active: false,
    newValuePassword: null,
    showAlteraSenha: false,
    bloqueio: false,
    desbloqueio: false,
    escritorioId: '',
    showUsuario: false,
    showUsuarioManager: false,
    perfilCadastro: null
  }),
  mounted () {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.perfilCadastro = authUser2

    // alert('Id Profile: ' + authUser2.id_profile)
    this.selected.ativo = false
    if (authUser2.id_profile === 1) {
      // alert(authUser2.id_profile + ' - ' + authUser2.id_office)
      // alert('ADM')
      axios.get(process.env.API + 'user').then(response => {
        this.people = response.data
      })
    } else {
      // alert(authUser2.id_profile + ' - ' + authUser2.id_office)
      // alert('Manager')
      axios.get(process.env.API + 'user?where={"id_office":' + authUser2.id_office + '}').then(response => {
        this.people = response.data
      })
    }
  },
  methods: {
    getClass: ({ id }) => ({
      'md-primary': id
    }),
    onSelect (item) {
      this.selected = item
    },
    trocarSenha () {
      if (this.selected === true || this.selected !== null) {
        this.active = true
      } else {
        alert('Por favor selecionar um usuário para troca de senha!')
      }
    },
    cadastrarUsuario () {
      // alert('chegou')
      // alert('Id Profile: ' + this.perfilCadastro.id_profile)
      if (this.perfilCadastro.id_profile === 1) {
        // alert('ADM')
        this.showUsuario = true
      } else {
        // alert('Manager')
        this.showUsuarioManager = true
      }
    },
    bloquearUsuario () {
      if (this.selected === true || this.selected !== null) {
        this.bloqueio = true
      } else {
        alert('Por favor selecionar um usuário para bloqueio!')
      }
    },
    desbloquearUsuario () {
      if (this.selected === true || this.selected !== null) {
        this.desbloqueio = true
      } else {
        alert('Por favor selecionar um usuário para Desbloquear!')
      }
    },
    Alterar () {
      let user = {
        password: this.newValuePassword
      }
      axios.put(process.env.API + 'user/' + this.selected.id, user)
        .then(response => {
          this.userSaved = true
          alert('Senha alterada com sucesso!')
          this.sending = false
          this.active = false
        })
        .catch(error => {
          if (error.response.data.code === 'E_UNIQUE') {
            alert('Erro na alteração de senha')
          }
        })
    },
    Bloquear () {
      let user
      let msn
      if (!this.selected.id) {
        alert('Favor Selecionar um Usuário')
      } else {
        if (this.selected.ativo === true) {
          user = {
            ativo: false
          }
          msn = 'Usuário Desativado'
        } else {
          user = {
            ativo: true
          }
          msn = 'Usuário Ativado'
        }
        axios.put(process.env.API + 'user/' + this.selected.id, user)
          .then(response => {
            this.userSaved = true
            this.sending = false
            this.bloqueio = false
            alert(msn)
            window.location.reload()
          })
          .catch(error => {
            console.log('Erro de Bloqueio de Usuário' + error)
          })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.alinhamento-table {
  text-align: -webkit-auto;
}
.extender-div {
  height: 500px;
}
.div{
  overflow: auto;
  height: 75%;
  width: 85%;
}
</style>
