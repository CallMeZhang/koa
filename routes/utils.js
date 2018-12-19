function getClientIp(req) {
	let ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	if(ip.indexOf('::ffff:')!=-1){
		return ip.substring(7)
	}
	return ip
}
module.exports =getClientIp