const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require("koa-session2");

const index = require('./routes/index')
const users = require('./routes/users')

const Store = require("./src/store/store");
// error handler
onerror(app)

//session
app.use(session({
	store:new Store()
}))
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

//登陆拦截
// app.use(async (ctx, next) => {
//   console.log(ctx)
// 	if(!ctx.cookies.get('koa:sess') && ctx.path !== '/users/login'){
// 		console.log(ctx.cookies.get('koa:sess'),ctx.path)
// 		await ctx.render('index',{
// 			title:'请登录'
// 		})
// 		return;
// 	}
// 	next()
// })
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

app.use(async (ctx, next)=>{
	if(ctx.response.status == 404){
		ctx.response.redirect('/404');
	}
	await next();
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
