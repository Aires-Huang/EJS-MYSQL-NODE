var mysql = require('../db/db');
exports.list = function(req, res) {
	mysql.query('select * from user_data', function(err, result) {
		if (!err) {
			res.render('employee_list', {
				data: result
			});
		}
	});
};