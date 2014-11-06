var mysql = require('./db');
var uid = require('../utils/uuid'); //用于生成id
function User(user) {
	this.username = user.username;
	this.password = user.password;
}
module.exports = User;
User.prototype.save = function save(call) {
	console.log(this.username)
	var user = {
		username: decodeURIComponent(this.username),
		password: this.password
	};
	var uuid = uid.v4();
	var sql = "insert into users (userid,username,password) values(?,?,?)";
	var postData =  [uuid, user.name, user.password];
	console.log(postData);
	mysql.query(sql,postData, function(err, results, fields) {
		if (err) {
			throw err;
		} else {
			//返回用户id
			return call(err, uuid, fields);
		}
	});
};
User.get = function get(username, call) {
	// 读取 users 集合
	var sql = "select c.userid,c.username,c.password from users c where c.username='" + decodeURIComponent(username) + "'";
	console.log(sql);
	mysql.query(sql, function(err, results,fields) {
		if (err) {
			throw err;
		} else {
			console.log(results[0]+"+"+fields);
			call(err, results[0],fields);
		}
	});
};