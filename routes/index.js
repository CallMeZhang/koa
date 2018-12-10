const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/users', async (ctx, next) => {
	await ctx.render('users', {
		title: 'Hello Koa user'
	})
})


module.exports = router
