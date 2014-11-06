var User = require('../db/user');
/* GET users listing. */
exports.list = function(req, res){
  res.send('respond with a resource');
};
exports.post = function(req, res) {
	//生成口令的散列值 
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	User.get(req.body.username, function(err, user) {
		console.log(user)
		if (!user) {
			console.log(1)
			req.flash('error', ' 用户不存在');
			return res.redirect('/login');
		}
		if (user.password != password) {
			console.log(user.password+"+"+password);
			req.flash('error', ' 用户口令错误');
			return res.redirect('/login');
		}
		console.log(2)
		req.session.user = user;
		req.flash('success', ' 登入成功');
		return res.redirect('/');
	});
};