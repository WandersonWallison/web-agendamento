import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/forms/FormLogin.vue'
import Home from '../components/forms/Home.vue'
// import CadEmpresa from '@/components/forms/FormCadastroEmpresa.vue'
// import CadLead from '@/components/forms/FormCadastroLead.vue'
// import CadUsuario from '@/components/forms/FormAddUser.vue'
// import ListaAgentes from '../components/lists/ListaAgentes.vue'
import Agendamento from '../components/forms/FormHunter.vue'
import Visita from '../components/forms/FormAgente'
import FormCrudLead from '../components/forms/FormCrudLead.vue'
// import CadAgendamento from '../components/forms/FormAgendamento.vue'
import ListaLeadAguardando from '../components/lists/ListClienteAguardandoContato.vue'

Vue.use(Router)
// var token = localStorage.getItem('Usuario')
// const authUser = JSON.parse(localStorage.getItem('Usuario'))
// console.log('Token do localstorage: ' + token)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: { name: 'login' }
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
        permissions: true
      }
    },
    {
      path: '/lead/list',
      name: 'formCrudLead',
      component: FormCrudLead,
      meta: {
        requiresAuth: true,
        permissions: true
      }
    },
    {
      path: '/lead/listAguardo',
      name: 'ListClienteAguardando',
      component: ListaLeadAguardando,
      meta: {
        requiresAuth: true,
        permissions: true
      }
    },
    {
      path: '/Agendamento',
      name: 'agendamento',
      component: Agendamento,
      meta: {
        requiresAuth: true,
        permissions: false
      }
    },
    {
      path: '/Visita',
      name: 'visita',
      component: Visita,
      meta: {
        requiresAuth: true,
        permissions: false
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    if (authUser) {
      if (to.meta.permissions === true && authUser2.id_profile === 1) {
        next()
      } else if (authUser2.id_profile === 2 && to.meta.permissions === false) {
        next()
      } else if (authUser2.id_profile === 3 && to.meta.permissions === false) {
        next()
      } else {
        next('/')
        window.localStorage.clear()
      }
    } else {
      next('/')
      this.$router.push('/')
      window.localStorage.clear()
    }
  }
  next()
})
export default router

/* export default new Router({

  routes: [
    {
      path: '*',
      redirect: { name: 'login' }
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    }
    {
      path: '/Login',
      name: 'login',
      component: Login,
      beforeEach: function (to, from, next) {
        //alert('token do usuario: ' + to)
        if (!token) {
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
        console.log('Token do localstorage: ' + to)
        alert('token do usuario: ' + token)
        if (!token) {
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
        if (!token) {
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
        alert('token do usuario: ' + token)
        if (!token) {
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
}) */
