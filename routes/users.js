const router = require('koa-router')()

router.prefix('/api')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/user', function (ctx, next) {
	var name = ctx.request.body.name || ``
	var password = ctx.request.body.password || ``
	console.log(`用户${name}请求登录,密码是${password}`)
	// console.log(typeof ctx.session.user)
	// if(!ctx.session.user){
		ctx.session.user = JSON.stringify({userName: name, 'password': password})
	// }
	ctx.response.redirect('/users');
})

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json'
	}
})
module.exports = router
