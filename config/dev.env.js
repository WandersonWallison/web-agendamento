'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//const API = '"http://localhost:1337/"'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //API:'"http://104.248.7.221:5555/"'
  // API: '"http://localhost:1337/"'
  API:'"http://165.227.188.44:5555/"'

})
