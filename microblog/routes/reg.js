/* GET home page. */
var crypto = require('crypto');
var User = require('../db/user');

exports.post = function(req, res) {
	if (req.session.user) {
		req.flash('error', '已登入');
		return res.redirect('/');
	}
	if (req.body['password-repeat'] != req.body['password']) {
		var ss = req.flash('error', '密码不一致');
		return res.redirect('/reg');
	}
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	var newUser = new User({
		username: encodeURIComponent(req.body.username),
		password: password
	});
	User.get(newUser.username, function(err, user) {
		if (user)
			err = 'username already exists.';
		if (err) {
			req.flash('error', err);
			return res.redirect('/reg');
		}
		newUser.save(function(err,uuid) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			console.log('uuid:');
			console.log(uuid);
			newUser.userid = uuid;
			req.session.user = newUser;
			req.flash('success', ' 注册成功');
			res.redirect('/');
		});
	});
};
exports.get = function(req, res) {
	if (req.session.user) {
		req.flash('error', '已登入');
		return res.redirect('/');
	}
	res.render('reg', {
		title: '帐号注册'
	});
};
