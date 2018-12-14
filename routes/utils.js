function getClientIp(req) {
	let ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	return ip.substring(7)
};
module.exports =getClientIp