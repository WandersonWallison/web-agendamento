'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const API = '"http://165.227.188.44:1337/"'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://165.227.188.44:1337/"'
})
