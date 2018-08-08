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
const token = JSON.parse(localStorage.getItem('Usuario'))
console.log('Token do localstorage: ' + token)
if (!token) {
  console.log('não veio o token')
}
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
      name: 'home',
      component: Home
    },
    {
      path: '/empresa',
      name: 'empresa',
      component: CadEmpresa
    },
    {
      path: '/lead',
      name: 'lead',
      component: CadLead
    },
    {
      path: '/agente',
      name: 'agente',
      component: CadUsuario
    },
    {
      path: '/listaAgente',
      name: 'listaAgente',
      component: ListaAgentes
    },
    {
      path: '/Agendamento',
      name: 'agendamento',
      component: Agendamento
    },
    {
      path: '/lead/list',
      name: 'formCrudLead',
      component: FormCrudLead
    },
    {
      path: '/Agenda',
      name: 'cadastroAgendamento',
      component: CadAgendamento
    },
    {
      path: '/FormCalendario',
      name: 'FormCalendario',
      component: Calendario
    }
  ]

})
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('Usuario'))
    console.log('Usuario Autenticado: ' + authUser)
    if (authUser && authUser.id) {
      next()
    } else {
      next({name: '/home'})
    }
  }
  next()
})

export default router
