import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/forms/FormLogin.vue'
import Home from '@/components/HelloWorld.vue'

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
    }

  ]
})
