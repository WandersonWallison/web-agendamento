<template>
<div id="app">
  <div v-if="selected.length != 0">
  <md-toolbar class="toolbar" md-elevation="1">
      <h3 class="md-title" style="flex: 2">Lista de Leads</h3>
     <div class="div-separador">
       <md-field>
      <label for="hunter">Hunter</label>
        <md-select name="hunter" id="hunter" v-model="selectedHunter">
          <md-option v-for="hunter in hunters" :key="hunter.id" :value="hunter.id">
              {{ hunter.username }}
          </md-option>
        </md-select>
    </md-field>
    </div>
    <div class="div-separador">
        <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates">
        <label>Data para Conclusão</label>
        </md-datepicker>
    </div>
      <md-button @click="vinculaHunter = true" class="md-icon-button">
            <md-tooltip md-direction="top">Vincular Hunter</md-tooltip>
            <md-icon>update</md-icon>
          </md-button>
    </md-toolbar>
  </div>
  <div>
  </div>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>
          <label class="form-checkbox">
          <input type="checkbox" v-model="selectAll" @click="select">
    <i class="form-icon"></i>
  </label>
     </th>
      <th>id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Telefone</th>
      <th>Celular</th>
      <th>Observação</th>
      </tr>
      </thead>
    <tbody>
      <tr v-for="i in people" v-bind:key="i.id">
        <td>
          <label class="form-checkbox">
            <input type="checkbox" :value="i.id" v-model="selected">
            <i class="form-icon"></i>
          </label>
        </td>
        <td>{{i.id}}</td>
        <td>{{i.nome}}</td>
        <td>{{i.email}}</td>
        <td>{{i.telefone}}</td>
        <td>{{i.celeular}}</td>
        <td>{{i.obs}}</td>
      </tr>
        </tbody>
        </table>
  <div>
<md-dialog-confirm
      :md-active.sync="vinculaHunter"
      md-title="Deseja realmete vinvular ao Hunter?"
      md-content="Ele (s) não serão mais exibidos na lista"
      md-confirm-text="Sim"
      md-cancel-text="Não"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
</div>
</div>
</template>

<script>
import moment from 'moment'
import UpLead from '../forms/FormUpdateLead.vue'
import axios from 'axios'
export default {
  name: 'listClienteAguardando',
  components: {
    UpLead
  },
  data: () => ({
    selected: [],
    selectAll: false,
    people: [],
    usuarios: [],
    vinculaHunter: false,
    atual: [],
    hunters: [],
    selectedHunter: null,
    selectedDate: null,
    disabledDates: date => {
      const day = date.getDay()
      return day === 6 || day === 0
    }
  }),

  mounted () {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2

    axios.get(process.env.API + 'leads?where={"id_user_editor": 0,"id_office":' + this.userAtual.id_office + '} & limit=10000')
      .then(response => {
        this.people = response.data
      })
    axios.get(process.env.API + 'user?where={"id_profile": 3,"ativo":true,"id_office":' + this.userAtual.id_office + '}')
      .then(response => {
        this.hunters = response.data
      })
  },
  methods: {
    select () {
      this.selected = []
      if (!this.selectAll) {
        for (let i in this.people) {
          this.selected.push(this.people[i].id)
        }
      }
    },
    onCancel () {
      this.value = 'Disagreed'
    },
    onConfirm () {
      if (this.selected.length === 0) {
        alert('ocorreu algum erro de comunicação com a intenet,selecione novamente ')
      } else {
        let newLead = {
          id_user_editor: this.selectedHunter,
          momento_atual: 1,
          data_expiracao: moment(this.selectedDate).format('YYYY-MM-DD')
        }
        for (var i = 0; i <= this.selected.length; i++) {
          axios.put(process.env.API + 'leads/' + this.selected[i], newLead)
            .then(response => {
              console.log(i + 'alterado')
              window.location.reload()
            })
        }
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
      return `${count} Cliente${plural} selecionado${plural}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
    ali
  }

  .div{
    overflow: auto;
   margin-left: 2%;
  }
  .corrigir-texto {
    text-align: left;
  }
  .div-separador{
    margin-right: 2%;
  }
  .toolbar{
    background-color: rgba(255,82,82,0.2);
  }
</style>
