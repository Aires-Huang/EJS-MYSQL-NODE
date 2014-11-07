var mysql = require('./db');
function Userdata(user) {
	this.username = user.username;
	this.userid = user.userid;
	this.name = user.name;
	this.age = user.age;
}
module.exports = Userdata;
Userdata.prototype.updata = function updata(call) {
	// var user = {
	// 	username: decodeURIComponent(this.username),
	// 	password: this.password
	// };
	// var uuid = uid.v4();

	// // table[users]
	// var sql_USERS = "insert into users (userid,username,password) values(?,?,?)";
	// var USERS_POSTDATA =  [uuid, user.username, user.password];
	// mysql.query(sql_USERS,USERS_POSTDATA, function(err, results, fields) {
	// 	if (err) {
	// 		throw err;
	// 	} else {
	// 		return call(err, uuid, fields);
	// 	}
	// });
	// // // table[userdata]
	// var USERDATA_POSTDATA = [uuid, user.username];
	// var sql_USERDATA = "insert into userdata (userid,username) values(?,?)";
	// mysql.query(sql_USERDATA,USERDATA_POSTDATA, function(err, results, fields) {
	// 	console.log(results)
	// 	if (err) {
	// 		throw err;
	// 	} 
	// });

};

Userdata.get = function get(user, call) {
	var userid = user.userid;
	// 读取 users 集合
	var sql = "select c.userid,c.username,c.name,c.age from userdata c where c.userid='" + userid + "'";
	mysql.query(sql, function(err, results,fields) {
		if (err) {
			console.log(err);
			throw err;
		} else {
			call(err, results[0],fields);
		}
	});
};