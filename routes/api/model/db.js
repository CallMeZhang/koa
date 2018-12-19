/**
 * Created by for on 2018/11/20.
 */
const mysql = require('mysql')
const setting = require('./setting.js')

// 填写数据库连接信息，
const option = {
	host: setting.host,
	port: setting.port,
	user: setting.username,
	password: setting.password,
	database: setting.name
}

// 建立连接池
const pool = mysql.createPool(option)

/**
 * query函数重载
 * @return {none}
 */
exports.query = async function () {
	let [sql,params]=arguments
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, conn) {
			if (err) {
				console.log('CONNECT ERROR:', err.message)
				reject({err, rows: null, fields: null})
				throw err
			} else {
				conn.query(sql, params, function (err, rows, fields) {
					// 释放连接
					conn.release()
					// 事件驱动回调
					resolve({err, rows, fields})
				})
			}
		})
	})
}
