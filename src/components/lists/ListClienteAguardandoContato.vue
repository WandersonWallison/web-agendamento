<template>
  <div>
    <md-table v-model="people" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">Lista de Contatos para Hunter</h1>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <!-- Inicio   -->
        <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="hunter">Hunter</label>
                <md-select name="hunter" id="hunter" v-model="selectedHunter">
                  <md-option v-for="hunter in hunters" :key="hunter.id" :value="hunter.id">
                    {{ hunter.username }}
                  </md-option>
                </md-select>
                <br>
              </md-field>
          </div>
        <!--  FIM   -->
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
        <div class="md-toolbar-section-end">
          <md-button @click="vinculaHunter = true" class="md-icon-button">
            <md-tooltip md-direction="top">Vincular Hunter</md-tooltip>
            <md-icon>update</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row class='corrigir-texto' slot="md-table-row" slot-scope="{ item }" :md-disabled="item.nome.includes('Stave')" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Nome" md-sort-by="nome">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="Celular" md-sort-by="celular">{{ item.celular }}</md-table-cell>
        <md-table-cell md-label="Observação" md-sort-by="observacao">{{ item.observacao }}</md-table-cell>
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
      <md-dialog-confirm
      :md-active.sync="vinculaHunter"
      md-title="Deseja realmete vinvular ao Hunter?"
      md-content="Ele (s) não serão mais exibidos na lista"
      md-confirm-text="Sim"
      md-cancel-text="Não"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
import UpLead from '../forms/FormUpdateLead.vue'
import Endereco from '../forms-endereco/FormEndereco.vue'
import Conta from '../forms/FormConta.vue'
import axios from 'axios'
export default {
  name: 'listClienteAguardando',
  props: ['selected'],
  components: {
    UpLead,
    Endereco,
    Conta
  },
  data: () => ({
    selected: [],
    people: [],
    usuarios: [],
    vinculaHunter: false,
    atual: [],
    hunters: [],
    selectedHunter: null
  }),
  mounted () {
    axios.get(process.env.API + 'leads?where={"id_user_editor": 0}')
    .then(response => {
    this.people = response.data
    }),
    axios.get(process.env.API + 'user?where={"id_profile": 3}')
    .then(response => {
    this.hunters = response.data
    })
  },
  methods: {
    onCancel () {
      this.value = 'Disagreed'
    },
    onConfirm(){
      let newLead = {
        id_user_editor: this.selectedHunter,
        momento_atual: 1
      }
      for (var i = 0; i <= this.selected.length; i++) {
        axios.put(process.env.API+'leads/' + this.selected[i].id, newLead)
          .then(response => {
            console.log(i + 'alterado')
            window.location.reload()})
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
      return `${count} Usuário${plural} selecionado${plural}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
    ali
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
  .corrigir-texto {
    text-align: left;
  }
</style>
