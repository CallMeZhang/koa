/**
 * Created by for on 2018/11/20.
 */
let router = require('koa-router')();

const myrouter = require('./router.js')
router.get('/indexshow', myrouter.indexShow)
module.exports =router
