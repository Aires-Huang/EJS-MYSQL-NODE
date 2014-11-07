/* GET home page. */
var Userdata = require('../db/userdata');

var filterData = function(data) {
	data.name = data.name ? data.name : data.username;
	data.age = data.age ? data.age : 0;
	return data;
};

exports.get = function get(req, res) {
	if (!req.session.user) {
		req.flash('error', '未登入');
		return res.redirect('/login');
	}
	var user = req.session.user;
	Userdata.get(user, function(err, data) {
		var userid = data.userid;
		if (!userid) {
			req.flash('error', ' 用户不存在');
			return res.redirect('/');
		}
		data = filterData(data);
		res.render('my', {
			title: '个人信息',
			data: data
		});
	});
};