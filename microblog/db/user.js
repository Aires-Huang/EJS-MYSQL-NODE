var mysql = require('./db');
var uid = require('../utils/uuid'); //用于生成id
function User(user) {
	this.username = user.username;
	this.password = user.password;
}
module.exports = User;
User.prototype.save = function save(call) {
	var user = {
		username: decodeURIComponent(this.username),
		password: this.password
	};
	var uuid = uid.v4();

	// table[users]
	var sql_USERS = "insert into users (userid,username,password) values(?,?,?)";
	var USERS_POSTDATA =  [uuid, user.username, user.password];
	mysql.query(sql_USERS,USERS_POSTDATA, function(err, results, fields) {
		if (err) {
			throw err;
		} else {
			return call(err, uuid, fields);
		}
	});
	// // table[userdata]
	var USERDATA_POSTDATA = [uuid, user.username];
	var sql_USERDATA = "insert into userdata (userid,username) values(?,?)";
	mysql.query(sql_USERDATA,USERDATA_POSTDATA, function(err, results, fields) {
		console.log(results)
		if (err) {
			throw err;
		} 
	});

};
User.get = function get(username, call) {
	// 读取 users 集合
	var sql = "select c.userid,c.username,c.password from users c where c.username='" + decodeURIComponent(username) + "'";
	mysql.query(sql, function(err, results,fields) {
		if (err) {
			throw err;
		} else {
			call(err, results[0],fields);
		}
	});
};