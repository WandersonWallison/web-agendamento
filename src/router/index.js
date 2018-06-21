import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/forms/FormLogin.vue'
import Home from '@/components/forms/HelloWorld.vue'
import CadEmpresa from '@/components/forms/FormCadastroEmpresa.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
      name: 'HelloWorld',
      component: Home
    },
    {
      path: '/empresa',
      name: 'empresa',
      component: CadEmpresa
    }

  ]
})
