import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/forms/FormLogin.vue'
import Home from '@/components/forms/Home.vue'
/* import CadEmpresa from '@/components/forms/FormCadastroEmpresa.vue'
import CadLead from '@/components/forms/FormCadastroLead.vue'
import CadUsuario from '@/components/forms/FormAddUser.vue'
import ListaAgentes from '../components/lists/ListaAgentes.vue'
import Agendamento from '../components/lists/ListAgendamento.vue'
import FormCrudLead from '@/components/forms/FormCrudLead.vue'
import CadAgendamento from '../components/forms/FormAgendamento.vue'
import Calendario from '../components/forms/FormCalendario.vue'
*/
Vue.use(Router)
var token = JSON.parse(localStorage.getItem('Usuario'))

console.log('Token do localstorage: ' + token)

const router = new Router({
  router: [
    {path: '/', name: 'login', component: Login},
    {path: '/home', name: 'home', component: Home, meta: { requiresAuth: true }}
  ]
})

router.beforeEach((to, from, next) => {
  console.log('O que esta no TO: ' + JSON.stringify(to))
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('Usuario'))
    if (authUser) {
      next()
    } else {
      next('/')
    }
  }
  next()
})
export default router
