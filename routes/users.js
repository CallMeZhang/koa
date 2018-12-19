// let routerList =require('./api')

const router = require('koa-router')()
const db = require('./api/model/db.js')
const sql = require('./api/model/sql.js')
// console.log(routerList)
router.prefix('/api')

router.get('/', async function (ctx, next) {
	var {err, rows, fields} = await db.query(sql.index)
	ctx.body = rows
})

router.post('/user', function (ctx, next) {
	var name = ctx.request.body.name || ``
	var password = ctx.request.body.password || ``
	console.log(`用户${name}请求登录,密码是${password}`)
	// console.log(typeof ctx.session.user)
	// if(!ctx.session.user){
	ctx.session.user = JSON.stringify({userName: name, 'password': password})
	// }
	console.log(ctx)
	ctx.response.redirect('/users');
})

router.get('/addUser', async (ctx, next) => {
	let pramse = ctx.request.body
	// var {err, rows, fields} = await db.query(sql.addUser())
	ctx.body = 'pramse'
})

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json'
	}
})
module.exports = router
