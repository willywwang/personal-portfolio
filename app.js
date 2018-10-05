var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('express-flash');
var http = require('http');

require('./models/models');
var mongoose = require('mongoose');
// local mongo environment
// mongoose.connect('mongodb://127.0.0.1/website-app');
// Production mongo environment
mongoose.connect(process.env.MONGODB_URI);

var index = require('./routes/index');
var contact = require('./routes/contact')
var blog = require('./routes/blog');
var auth = require('./routes/auth')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(session({ secret: process.env.sessionSecret }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.sessionSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));
app.use('/components', express.static(path.join(__dirname, 'bower_components')));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/contact', contact);
app.use('/blog', blog);
app.use('/auth', auth);

app.use('/blog*', index);
app.use('/login*', index);

var initPassport = require('./passport-init');
initPassport(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);

  if (err.status === 404) {
  	res.render('status-error', { 
      title: 'Will Wang - CPSC', 
      statusCode: 404, 
      errorMessage: 'Looks like you ventured into an uncreated area!' 
    });
  } else {
  	res.render('status-error', {
      title: 'Will Wang - CPSC', 
      statusCode: 500,
      errorMessage: 'Oops, looks like something went wrong.'
    });
  }
});

setInterval(function() {
    http.get("http://will-portfolio.herokuapp.com");
}, 300000);
	
module.exports = app;
