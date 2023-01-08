var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./lib/connectMongoose');
require('./routes/api/ads')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.locals.title = 'Welcome to Nodepop'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// API - Nodepop Routes
app.use('/api/ads', require('./routes/api/ads'));

// incoming request 
app.use('/', function(rec, res, next) {
  console.log('Receiving a request.');
  next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // validation errors
  if (err.array) {
    err.status = 422; 
    const errorInfo = err.array({ onlyFirstError: true})[0]
    console.log(errorInfo)
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" - ${errorInfo.msg}`
  }

  res.status(err.status || 500);

  // Json format in API request´s responses 
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return; 
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
