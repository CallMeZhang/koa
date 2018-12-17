/**
 * Created by for on 2018/11/20.
 */
const db = require('../../model/db.js')
const sql = require('../../model/sql.js')

// 引入redis
/**
 *  index show
 */
exports.indexShow = (req, res, next) => {
  db.query(sql.index, function (err, rows, fields) {
    if (err) {
      throw err
    }
    let result = JSON.parse(JSON.stringify(rows))
    res.json(result)
    // 检查是否存在获取值（redis）
  })
}
