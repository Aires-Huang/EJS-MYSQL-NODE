/* GET home page. */
var crypto = require('crypto');
var User = require('../db/user');
/* GET login index. */
exports.index = function(req, res) {
	res.send('respond with a resource');
};
exports.get = function(req, res) {
	if (req.session.user) {
		req.flash('error', '已登入');
		return res.redirect('/');
	}
	res.render('login', {
		title: '用户登入',
	});
};
exports.post = function(req, res) {
	if (req.session.user) {
		req.flash('error', '已登入');
		return res.redirect('/');
	}
	//生成口令的散列值 
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	User.get(req.body.username, function(err, user) {
		if (!user) {
			req.flash('error', ' 用户不存在');
			return res.redirect('/login');
		}
		if (user.password != password) {
			req.flash('error', ' 用户口令错误');
			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success', ' 登入成功');
		return res.redirect('/');
	});
};
exports.checkNotLogin = function(req, res, next) {
	
	next();
};