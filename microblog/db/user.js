var mysql = require('./db');
var sql_user = {
	// table[users]
	insert_USERS: function(obj,call) {
		var sql_USERS = "insert into users (username,password) values(?,?)";
		var USERS_POSTDATA = [obj.name, obj.pwd]; // [uuid, user.username, user.password];
		mysql.query(sql_USERS, USERS_POSTDATA, function(err, results, fields) {
			if (err) {
				throw err;
			} else {
				var uuid = results.insertId;
				sql_user.insert_USERDATA({id:uuid, name:obj.name});
				return call(err, uuid, fields);
			}
		});
	},
	// // table[userdata]
	insert_USERDATA: function(obj) {
		var date = new Date();
		var USERDATA_POSTDATA = [obj.id, obj.name,date];
		var sql_USERDATA = "insert into userdata (userid,username,create_time) values(?,?,?)";
		mysql.query(sql_USERDATA, USERDATA_POSTDATA, function(err, results, fields) {
			if (err) {
				throw err;
			}
		});
	}
};


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
	sql_user.insert_USERS({ name:user.username, pwd:user.password},call);

};

User.get = function get(username, call) {
	// 读取 users 集合
	var sql = "select c.userid,c.username,c.password from users c where c.username='" + decodeURIComponent(username) + "'";
	mysql.query(sql, function(err, results, fields) {
		if (err) {
			throw err;
		} else {
			call(err, results[0], fields);
		}
	});
};