const Redis = require("ioredis");
const { Store } = require("koa-session2");

class RedisStore extends Store {
	constructor() {
		super();
		this.redis = new Redis({
			port: 6379,          // Redis port
			host: '47.93.31.23',   // Redis host
			family: 4,           // 4 (IPv4) or 6 (IPv6)
			password: '123456',
			db: 0
		});
	}

	async get(sid, ctx) {
		let data = await this.redis.get(`SESSION:${sid}`);
		return JSON.parse(data);
	}

	async set(session, { sid =  this.getID(24), maxAge = 1000*60*24*60 } = {}, ctx) {
		try {
			// Use redis set EX to automatically drop expired sessions
			await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
			console.log(sid)
		} catch (e) {}
		return sid;
	}

	async destroy(sid, ctx) {
		return await this.redis.del(`SESSION:${sid}`);
	}
}

module.exports = RedisStore;