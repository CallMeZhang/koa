// let routerList =require('./api')

const router = require('koa-router')()
const db = require('./api/model/db.js')
const sql = require('./api/model/sql.js')
// console.log(routerList)
router.prefix('/api')

router.get('/', async function (ctx, next) {
	db.query(sql.index,  (err, rows, fields)=>{
		if (err) {
			throw err
		}
		let result = JSON.parse(JSON.stringify(rows))
		console.log(result)
		// console.dir(ctx.body)
		console.dir(ctx.response)
		ctx.response.body=result
		// ctx.body(result)
		// 检查是否存在获取值（redis）
	})
  ctx.body = await 'this is a users response!'
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

router.get('/string', async (ctx, next) => {
	console.log(ctx)
	console.log(ctx.body)
	ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json'
	}
})
module.exports = router
