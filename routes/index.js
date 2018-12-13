const router = require('koa-router')()
let getClientIp = require('./utils')
router.get('/', async (ctx, next) => {
	if (ctx.cookies.get('koa:sess')) {
		let n = ctx.session.views || 0;
		ctx.session.views = ++n;
	} else {
		ctx.session.user = JSON.stringify({userName: 'Daming:' + Math.random(), 'age': 18})
		ctx.session.views=1
	}
	console.log(ctx.cookies.get('koa:sess'))
	await ctx.render('index', {
		title: 'Hello Koa 2! login',
		ip: getClientIp(ctx.req),
		views: ctx.session.views
	})
})

router.get('/users', async (ctx, next) => {
	await ctx.render('users', {
		title: '访问用户列表',
		tableData: [
			{
				ip: '2016-05-02',
				address: '上海市普陀区金沙江路 1518 弄'
			}],
	})
})

module.exports = router
