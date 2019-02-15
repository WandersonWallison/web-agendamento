// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueSessionstorage from 'vue-sessionstorage'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import './assets/vue2-simple-calendar.css'
import VueTheMask from 'vue-the-mask'
import Vs from 'd3-vs'
import VueGoogleCharts from 'vue-google-charts'
import VueApexCharts from 'vue-apexcharts'
import VCharts from 'v-charts'

Vue.config.productionTip = false

Vue.use(
  VueMaterial,
  VueSessionstorage,
  Vuetify,
  BootstrapVue,
  Axios,
  VueTheMask,
  Vs,
  VueGoogleCharts,
  VueApexCharts,
  VCharts
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
