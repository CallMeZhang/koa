/**
 * Created by for on 2018/11/21.
 */
let router = require('koa-router')();
// 目录1：/user   创建Router
// let Router = express.Router();

let databases = require('./controller/interface')

// Add databases Routes
router.use(databases)

module.exports = router
