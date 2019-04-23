<template>
  <div>
     <div>
      <md-table v-model="leads" md-sort="name" md-sort-order="asc" md-card md-fixed-header class="extender-div">
        <md-table-toolbar>
          <h1 class="md-title">Atividades dos Hunters</h1>
          <div class="md-layout md-gutter md-small-size-100">
            <div class="md-layout-item md-small-size-100">
              <br/>
              <md-field>
                <select class="form-select" @change="buscarLeads($event)">
                  <option :value="-1">Selecione Hunter</option>
                  <option v-for="hunter in listahunters" :key="hunter.id" :value="hunter.id">
                    {{ hunter.username }}
                  </option>
                </select>
                <!--
                <label for="hunter">Hunters</label>
                <md-select name="hunter" id="hunter" v-model="selecionado" v-on="buscarLeads(this.selecionado)">
                  <md-option v-for="hunter in listahunters" :key="hunter.id" :value="hunter.id">
                    {{ hunter.username }}
                  </md-option>
                </md-select>
                -->
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-small-size-100">
            <div class="md-layout-item md-small-size-100">
            </div>
          </div>
      </md-table-toolbar>
      <md-table-row  class="alinhamento-table" slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Cliente" md-sort-by="nome">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Celular" md-sort-by="celular">{{ item.celular }}</md-table-cell>
        <md-table-cell md-label="Telefone" md-sort-by="telefone">{{ item.telefone }}</md-table-cell>
        <md-table-cell md-label="E-mail" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Data Expiração" md-sort-by="data_expiracao">{{ item.data_expiracao | maskData }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status">
            <div v-if="item.status === 'Não Atendeu'"><md-icon>thumb_down
              <md-tooltip md-direction="top">Não Atendeu</md-tooltip>
              </md-icon>{{ ' - ' + item.status }}</div>
            <div v-if="item.status === 'Dados Incorretos'"><md-icon>no_sim
              <md-tooltip md-direction="top">Dados incorretos</md-tooltip>
              </md-icon>{{ ' - ' +item.status }}</div>
            <div v-if="item.status === 'Não Pode Falar'"><md-icon>mic_off
              <md-tooltip md-direction="top">Agendado contato para - {{ item.data_ligacao | maskDataTime }} hs</md-tooltip>
              </md-icon>{{ ' - ' + item.status }}</div>
            <div v-if="item.status === 'Não Aceita Visita'"><md-icon>voice_over_off
              <md-tooltip md-direction="top">Não aceita visita</md-tooltip>
              </md-icon>{{ ' - ' + item.status }}</div>
            <div v-if="item.status === ''"><md-icon>description</md-icon>{{ ' - Aguardando ação do Hunter' }}</div>
        </md-table-cell>
      </md-table-row>
    </md-table>
     </div>

  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'ListaAtividadesHunters',
  data: () => ({
    selecionado: '',
    leads: [],
    hunters: [],
    listahunters: []
  }),
  mounted () {
    /*
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2
    */
    axios.get(process.env.API + 'user?where={"ativo":true,"id_profile":3} & limit=10000').then(response => {
      this.listahunters = response.data
    })
  },
  // corrigir antes de subi o "office_schedule":8" colocar a logica do escritorio que esta na sessão
  /*
  updated () {
    axios.get(process.env.API + 'leads?where={"ativo":true,"id_user_editor":' + this.selecionado + '}').then(response => {
      this.leads = response.data
    })
  },
  */
  methods: {
    getClass: ({ id }) => ({
      'md-primary': id
    }),
    onSelect (item) {
      this.selected = item
    },
    buscarLeads: function (id) {
      if (id.target.value === -1) {
        this.leads = ''
      } else {
        axios.get(process.env.API + 'leads?where={"ativo":true,"id_user_editor":' + id.target.value + '}').then(response => {
          this.leads = response.data
        }).catch(error => {
          // alert('Erro no cadastro do Endereço')
          console.log(error.response.data)
        })
      }
    }
  },
  filters: {
    maskDataTime: function (v) {
      v = moment(v).format('DD/MM/YYYY HH')
      return v
    },
    maskData: function (v) {
      v = moment(v).format('DD/MM/YYYY')
      return v
    },
    maskHora: function (v) {
      switch (v) {
        case 1:
          v = '08:00'
          break
        case 2:
          v = '09:00'
          break
        case 3:
          v = '10:00'
          break
        case 4:
          v = '11:00'
          break
        case 5:
          v = '12:00'
          break
        case 6:
          v = '13:00'
          break
        case 7:
          v = '14:00'
          break
        case 8:
          v = '15:00'
          break
        case 9:
          v = '16:00'
          break
        case 10:
          v = '17:00'
          break
        case 11:
          v = '18:00'
          break
        case 12:
          v = '19:00'
          break
        case 13:
          v = '20:00'
          break
        case 14:
          v = '21:00'
          break
        case 15:
          v = '22:00'
          break
      }
      return v
    }
  }
}
</script>
<style lang='scss' scoped>
.md-table + .md-table {
  margin-top: 5px;
}
.md-progress-bar {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
}
.alinhamento {
  align-items: center;
}
.alinhamento-table {
  text-align: -webkit-auto;
}
.extender-div {
  height: 500px;
}

</style>
