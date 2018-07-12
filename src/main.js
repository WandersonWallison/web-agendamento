// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueSessionstorage from 'vue-sessionstorage'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import VueMask from 'vue-the-mask'
import Axios from 'axios'
import FullCalendar from 'vue-full-calendar'

Vue.config.productionTip = false

Vue.use(VueMaterial,
       VueSessionstorage,
       Vuetify,
       VueMask,
       BootstrapVue,
       Axios,
       FullCalendar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
