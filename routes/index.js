const router = require('koa-router')()
let getClientIp = require('./utils')
let {$get} =require('../src/request/index')
router.get('/', async (ctx, next) => {
	console.log(ctx.cookies.get('koa:sess'))
	if (ctx.cookies.get('koa:sess')) {
		let n = ctx.session.views || 0;
		ctx.session.views = ++n;
	} else {
		ctx.session.views=1
	}
	await ctx.render('index', {
		title: 'Hello world !',
		ip: getClientIp(ctx.req),
		views: ctx.session.views
	})
})

router.get('/users', async (ctx, next) => {
	let {userName}=JSON.parse(ctx.session.user)
	if(!userName.replace(/(^\s*)|(\s*$)/g, "")){
		await	ctx.response.redirect('/');
	}
	let {data} = await $get('http://ip.taobao.com/service/getIpInfo.php',{ip:'119.61.17.146'})
	await ctx.render('users', {
		title: '访问用户列表',
		userName:userName,
		tableData: [
			{
				ip: getClientIp(ctx.req),
				address: data.country+' '+ data.city+' '+ data.county,
				views:ctx.session.views
			}],
	})
})

router.get('/404', async (ctx, next) => {
	await ctx.render('404', {
		title: '404',
		message:'The page you visited does not exist'
	})
})
module.exports = router
