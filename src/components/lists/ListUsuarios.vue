<template>
  <div>
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
        <md-table-cell md-label="telefone" md-sort-by="telefone">{{ item.telefone  }}</md-table-cell>
        <md-table-cell md-label="Celular" md-sort-by="celular">{{ item.celular }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import VueMoment from 'vue-moment'
  export default {
    name: 'TableSingle',
    data: () => ({
      selected: {},
      people: [],
      active: false,
      newValuePassword: null,
      showAlteraSenha: false
    }),

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
        let user = {
          password: this.newValuePassword
        }
        axios.put(process.env.API + 'user/'+this.selected.id, user)
        .then(response => {
          alert('Senha do usuario alterada com succeso \n' +  senhaGerada )
          this.userSaved = true
          this.sending = false
          this.active = false
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
    },
    filters: {
      maskFone: function (v) {
        v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
        return v
      }
    },
  }
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
  }
</style>
