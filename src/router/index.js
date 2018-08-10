import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/forms/FormLogin.vue'
import Home from '@/components/forms/Home.vue'
import CadEmpresa from '@/components/forms/FormCadastroEmpresa.vue'
import CadLead from '@/components/forms/FormCadastroLead.vue'
import CadUsuario from '@/components/forms/FormAddUser.vue'
import ListaAgentes from '../components/lists/ListaAgentes.vue'
import Agendamento from '../components/lists/ListAgendamento.vue'
import FormCrudLead from '@/components/forms/FormCrudLead.vue'
import CadAgendamento from '../components/forms/FormAgendamento.vue'
import Calendario from '../components/forms/FormCalendario.vue'

Vue.use(Router)
const token = JSON.stringify(localStorage.getItem('Usuario'))
console.log('Token do localstorage: ' + token)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEach: function (to, from, next) {
        alert('token do usuario: ' + token.id)
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/Home',
      name: 'home',
      component: Home,
      beforeEach: function (to, from, next) {
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/empresa',
      name: 'empresa',
      component: CadEmpresa,
      beforeEach: function (to, from, next) {
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/lead',
      name: 'lead',
      component: CadLead,
      beforeEach: function (to, from, next) {
        alert('token do usuario: ' + token.id)
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/agente',
      name: 'agente',
      component: CadUsuario,
      beforeEach: function (to, from, next) {
        alert('token do usuario: ' + token.id)
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/listaAgente',
      name: 'listaAgente',
      component: ListaAgentes,
      beforeEach: function (to, from, next) {
        alert('token do usuario: ' + token.id)
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/Agendamento',
      name: 'agendamento',
      component: Agendamento,
      beforeEach: function (to, from, next) {
        alert('token do usuario: ' + token.id)
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/lead/list',
      name: 'formCrudLead',
      component: FormCrudLead,
      beforeEach: function (to, from, next) {
        alert('token do usuario: ' + token.id)
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/Agenda',
      name: 'cadastroAgendamento',
      component: CadAgendamento,
      beforeEach: function (to, from, next) {
        alert('token do usuario: ' + token.id)
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/FormCalendario',
      name: 'FormCalendario',
      component: Calendario,
      beforeEach: function (to, from, next) {
        alert('token do usuario: ' + token.id)
        if (!token.id) {
          next('/')
        } else {
          next()
        }
      }
    }
  ]
})
