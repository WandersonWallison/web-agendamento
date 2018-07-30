'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//const API = '"http://localhost:1337/"'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://localhost:1337/"'
})
