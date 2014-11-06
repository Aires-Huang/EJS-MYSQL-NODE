var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('./db/db');
var flash = require('connect-flash');


var routes = require('./routes');
var index = require('./routes/index');
var users = require('./routes/user');
var login = require('./routes/login');
var employee = require('./routes/employee');
var reg = require('./routes/reg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(flash());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.session({
    secret: 'wolegeca',
    cookie: {
        maxAge: 60000 * 20
    }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);



app.get('/users', users.list);

app.get('/employee', function(req, res) {
    mysql.query('SELECT * from user_data', function(err, result) {
        if (!err) {
            res.render('employee_list', {
                data: result
            });
        }
    });
});
app.get('/reg', reg.checknotlogin);
app.get('/reg', reg.get);
app.post('/reg', reg.checknotlogin);
app.post('/reg', reg.post);

app.get('/login', login.checkNotLogin);
app.get('/login', login.get);
app.post('/login', login.checkNotLogin);
app.post('/login', login.post);
app.use(function(req, res, next) {
    console.log('xxxxxxxxxxx')
    var error = req.flash('error');
    var success = req.flash('success');
    res.locals.user = req.session.user;
    res.locals.error = error.length ? error : null;
    res.locals.success = success ? success : null;
    next();
});

app.get('/quit', function (req, res) { 
  req.session.user =  null; 
  req.flash('success', '登出成功'); 
  res.redirect('/'); 
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


module.exports = app;