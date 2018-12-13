var rp = require('request-promise');
let $get = function (url='', data={}, headers={}) {
	if (arguments.length < 2 && typeof arguments[0] === 'object') {
		var {url, data, headers} = arguments[0]
	}
	let params = Object.assign({
		uri: '',
		qs: {},
		headers: {},
		json: true
	}, {
		uri: url,
		qs: data, headers:
		headers
	})
	return rp(params)
}
let $post = function (url, data, headers) {
	if (arguments.length < 2 && typeof arguments[0] === 'object') {
		var {url, data, headers} = arguments[0]
	}
	let params = Object.assign({
		uri: '',
		body: {},
		headers: {},
		json: true
	}, {
		method: 'post',
		uri: url,
		body: data,
		headers: headers
	})
	return rp(params)
}

module.exports = {$get, $post}