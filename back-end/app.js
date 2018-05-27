var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/loginAttempt');
var logoutRouter = require('./routes/logoutAttempt');
var registerRouter = require('./routes/registerAttempt');
var verifyRouter = require('./routes/verify');
var userInfoRouter = require('./routes/userInfoReq');
var recoverRouter = require('./routes/recoverAttempt');
var resetPassRouter = require('./routes/resetPassAttempt');
var app = express();

var mysql = require("mysql");

app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'Boilerplate'
	});
	res.locals.connection.connect();
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("body-parser").json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }))

app.use('/', indexRouter);
app.use('/loginAttempt', loginRouter);
app.use('/logoutAttempt', logoutRouter);
app.use('/registerAttempt', registerRouter);
app.use('/verify', verifyRouter);
app.use('/recoverAttempt', recoverRouter);
app.use('/resetPass', resetPassRouter);
app.use('/userInfoReq', userInfoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var http = require('http');
module.exports = app;
var server = http.createServer(app);
server.listen(4007);
