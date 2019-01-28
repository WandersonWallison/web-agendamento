'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API: '"http://localhost:1337/"'
  API:'"http://165.227.188.44:5555/"'

})
