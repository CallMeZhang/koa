const db = require('./api/model/db.js')
const sql = require('./api/model/sql.js')
const router = require('koa-router')()
let getClientIp = require('./utils')
let {$get} = require('../src/request/index')
router.get('/', async (ctx, next) => {
	// console.log(ctx.cookies.get('koa:sess'))
	let ip = getClientIp(ctx.req)
	if (ctx.cookies.get('koa:sess')) {
		let n = ctx.session.views || 0;
		ctx.session.views = ++n;
		db.query(sql.updataUser({ip}))
	} else {
		ctx.session.views = 1
		let {data} = await $get('http://ip.taobao.com/service/getIpInfo.php', {ip: ip})
		let address = data.country + ' ' + data.city + ' ' + data.county
		db.query(sql.addUser({ip, address}))
	}
	await ctx.render('index', {
		title: ctx.session.views > 1 ? 'Welcome Back!' : 'Hello Stranger!',
		ip: ip,
		views: ctx.session.views
	})
})

router.get('/users', async (ctx, next) => {
	let {userName} = JSON.parse(ctx.session.user)
	if (!userName.replace(/(^\s*)|(\s*$)/g, "")) {
		await  ctx.response.redirect('/');
	}
	let ip = getClientIp(ctx.req)
	let {data} = await $get('http://ip.taobao.com/service/getIpInfo.php', {ip: ip})
	await ctx.render('users', {
		title: '访问用户列表',
		userName: userName,
		tableData: [
			{
				ip: ip,
				address: data.country + ' ' + data.city + ' ' + data.county,
				views: ctx.session.views
			}],
	})
})

router.get('/404', async (ctx, next) => {
	await ctx.render('404', {
		title: '404',
		message: 'The page you visited does not exist'
	})
})
module.exports = router
