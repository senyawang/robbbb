'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const BASE_URL = require('./index.js').dev.assetsPublicPath
const STATIC = require('./index.js').dev.assetsSubDirectory

console.log(BASE_URL, 'baseurl')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: `"${BASE_URL}${STATIC}"`,
})
