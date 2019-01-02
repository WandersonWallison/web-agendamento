<template>
  <div>
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
      md-title='Deseja Ativar ou Desativar Usuário?'
      md-confirm-text='Sim'
      md-cancel-text='Não'
      @md-cancel='onCancel'
      @md-confirm='Bloquear'
    />

    <md-table v-model='people' md-card @md-selected='onSelect'>
      <md-table-toolbar>
        <h1 class='md-title'>Lista de Usuários</h1>
        <md-button @click='active = true'>
          <md-icon class='botao-red'>lock</md-icon>
          <md-tooltip md-direction='top'>Alterar Senha</md-tooltip>
        </md-button>
        <md-button @click='bloqueio = true'>
          <md-icon class='botao-red'>no_encryption</md-icon>
          <md-tooltip md-direction='top'>Ativar ou Desativar</md-tooltip>
        </md-button>
      </md-table-toolbar>

      <span v-if='value'>Value: {{ value }}</span>

      <md-table-row
        class="alinhamento-table"
        slot='md-table-row'
        slot-scope='{ item }'
        :class='getClass(item)'
        md-selectable='single'
      >
        <md-table-cell md-label='ID' md-sort-by='id' md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell  md-label='Status' v-if="item.ativo === false " md-sort-by='status'>Desativado</md-table-cell>
        <md-table-cell  md-label='Status' v-if="item.ativo === true " md-sort-by='status'>Ativo</md-table-cell>
        <md-table-cell md-label='Name' md-sort-by='name'>{{ item.username }}</md-table-cell>
        <md-table-cell
          md-label='Perfil'
          md-sort-by='id_perfil'
          md-numeric
        >{{ item.id_profile['name']}}</md-table-cell>
        <md-table-cell md-label='Email' md-sort-by='email'>{{ item.email }}</md-table-cell>
        <md-table-cell md-label='telefone' md-sort-by='telefone'>{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label='Celular' md-sort-by='celular'>{{ item.celular }}</md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ListaUsuario',
  data: () => ({
    selected: {},
    people: [],
    perfil: [],
    active: false,
    newValuePassword: null,
    showAlteraSenha: false,
    bloqueio: false
  }),
  mounted () {
    axios.get(process.env.API + 'user').then(response => {
      this.people = response.data
    })
    console.log('Usuarios: ' + this.people)
  },
  methods: {
    getClass: ({ id }) => ({
      'md-primary': id
    }),
    onSelect (item) {
      this.selected = item
    },
    Alterar () {
      let user = {
        password: this.newValuePassword
      }
      axios.put(process.env.API + 'user/' + this.selected.id, user)
        .then(response => {
          this.userSaved = true
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
      console.log('Selected: ' + this.selected.id)
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
  text-align: left;
}
</style>
