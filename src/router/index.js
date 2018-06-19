import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/forms/FormLogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
