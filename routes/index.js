const router = require('koa-router')()
let getClientIp= require('./utils')
router.get('/', async (ctx, next) => {
	// console.log(ctx)
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    ip:getClientIp(ctx.req)
  })
})

router.get('/users', async (ctx, next) => {
	await ctx.render('users', {
		title: '访问用户列表',
		tableData:[
		  {
			ip: '2016-05-02',
			address: '上海市普陀区金沙江路 1518 弄'
		}],
	})
})

module.exports = router
