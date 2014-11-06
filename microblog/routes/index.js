
/* GET home page. */
exports.index = function(req, res) {;
	var user = req.session.user||'';
	console.log('user:');
	console.log(user);
	if(user.username) {
		user.username = decodeURIComponent(user.username);
	}
	res.render('index', {
		title: 'Express',
		user:user
	});
};