<template>
  <div>
    <!--
    <md-dialog :md-active.sync="showAlteraSenha" class="div">
       <AlterSenha/>
    </md-dialog> -->
    <md-dialog-prompt
      :md-active.sync="active"
      v-model="newValuePassword"
      md-title="Alterar Senha do Usuário"
      md-input-maxlength="8"
      md-input-placeholder="Digite a nova senha"
      md-confirm-text="Alterar"
      @md-confirm='Alterar'/>

    <md-table v-model="people" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">Lista de Usuários</h1>
      </md-table-toolbar>
      <span v-if="value">Value: {{ value }}</span>

      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
        <md-table-cell md-label="Senha">
            <div @click="active = true">
              <md-icon  class='botao-red'>lock</md-icon>
              <md-tooltip md-direction="top">Alterar Senha</md-tooltip>
            </div>
        </md-table-cell>
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.username }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="Celular" md-sort-by="celular">{{ item.celular }}</md-table-cell>
      </md-table-row>
    </md-table>
    <p>Selected:</p>
    {{ selected }}
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import VueMoment from 'vue-moment'
  import {TheMask} from 'vue-the-mask'
  import AlterSenha from'../forms/FormALterPassword.vue'
  export default {
    name: 'TableSingle',
    components: {
      AlterSenha
    },
    data: () => ({
      selected: {},
      people: [],
      active: false,
      newValuePassword: null,
      showAlteraSenha: false
    }),
    components: {TheMask},
    mounted () {
    axios.get(process.env.API + 'user?where={"ativo": true}')
      .then(response => {
      this.people = response.data
    })
    },
    methods: {

      getClass: ({ id }) => ({
        'md-primary': id
      }),
      onSelect (item) {
        this.selected = item
      },
      Alterar() {

        let newPassword = this.newValuePassword
        axios.put(process.env.API + 'user/'+this.selected.id, newPassword)
        .then(response => {

          alert('Agente cadastado com succeso \n' +
          'Dados de Acesso do Agente: ' +
            this.form.nomeAgente +
          '\n Usuario: ' +
            this.form.email +
          '\n Senha: ' + senhaGerada )
          this.userSaved = true
          this.sending = false
          this.clearForm()
          window.location.reload()

        })
        .catch(error => {
          if (error.response.data.code === 'E_UNIQUE') {
              alert('Agente já Cadastrado \nPor favor verificar os dados de cadastro')
          }
          console.log(error.response.data)
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
  }
</style>
