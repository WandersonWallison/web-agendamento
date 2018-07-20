<template>
  <div>
    <md-table v-model="people" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">Lista de Contatos</h1>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
        <div class="md-toolbar-section-end">
          <div v-if="count == 1">
            <md-button class="md-icon-button" @click="showUpdateLead = true">
            <md-icon>update</md-icon>
            </md-button>

          </div>
          <md-button @click="desativar = true" class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" :md-disabled="item.nome.includes('Stave')" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Nome" md-sort-by="nome">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="Cpf" md-sort-by="cpf">{{ item.cpf }}</md-table-cell>
      </md-table-row>
    </md-table>
  <div>
    <md-table v-model="selected" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Detalhe</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
         <md-card>
      <md-card-header>
        <div class="md-title">{{ item.nome }}</div>
        <div class="md-subhead">{{ item.email }}</div>
      </md-card-header>
    </md-card>
      </md-table-row>
    </md-table>
  </div>
    <md-dialog :md-active.sync="showUpdateLead">
      <div class="div">
      <up-lead :selected="selected"></up-lead>
      </div>
    </md-dialog>

    <md-dialog-confirm
      :md-active.sync="desativar"
      md-title="Deseja realmete desativar estas contatos?"
      md-content="Ele (s) não serão mais exibidos na lista"
      md-confirm-text="Sim"
      md-cancel-text="Não"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />


  </div>

</template>

<script>
import UpLead from '../forms/FormUpdateLead.vue';
import axios from 'axios'
  export default {
    name: 'listCrudLead',
    props: ['selected'],
    components: {
      UpLead
    },
      data: () => ({
      selected: [],
      people: [],
      showUpdateLead: false,
      desativar:false,
      atual:[]
    }),
    mounted () {
    axios.get('http://localhost:1337/leads?where={"ativo": true}')
      .then(response => {
        this.people = response.data
        })
  },
    methods: {
      onCancel () {
        this.value = 'Disagreed'
      },
      onConfirm(){
        let newLead = {
        ativo: false
      }
      for (var i = 0; i <= this.selected.length; i++) {
         axios.put('http://localhost:1337/leads/' + this.selected[i].id,newLead)
        .then(response => {
        console.log(i + "alterado");
        window.location.reload();
        })
      }

      },
      onSelect (items) {
        this.selected = items
      },
      getAlternateLabel (count) {
        let plural = ''

        if (count > 1) {
          plural = 's'
        }

        return `${count} user${plural} selected`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
  }
  .md-dialog {
  width: 70%;
  height: 70%;
  max-width: 100%;
}

  .div{
  overflow: auto;
  margin-left: 2%;

}
</style>
