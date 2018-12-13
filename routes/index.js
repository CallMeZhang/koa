const router = require('koa-router')()
let getClientIp = require('./utils')
let {$get} =require('../src/request/index')
router.get('/', async (ctx, next) => {
	console.log(ctx.cookies.get('koa:sess'))
	if (ctx.cookies.get('koa:sess')) {
		let n = ctx.session.views || 0;
		ctx.session.views = ++n;
	} else {
		ctx.session.user = JSON.stringify({userName: 'Daming:' + Math.random(), 'age': 18})
		ctx.session.views=1
	}
	await ctx.render('index', {
		title: 'Hello Koa 2! login',
		ip: getClientIp(ctx.req),
		views: ctx.session.views
	})
})

router.get('/users', async (ctx, next) => {
	let {data} = await $get('http://ip.taobao.com/service/getIpInfo.php',{ip:'119.61.17.146'})
	await ctx.render('users', {
		title: '访问用户列表',
		tableData: [
			{
				ip: getClientIp(ctx.req),
				address: data.country+' '+ data.city+' '+ data.county,
				views:ctx.session.views
			}],
	})
})

module.exports = router
