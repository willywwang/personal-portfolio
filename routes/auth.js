var mongoose = require('mongoose');
var User = mongoose.model('User');
var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	return res.send({state: 'failure', errorMessage: 'You are unauthorized to view this page.' });
}

router.use('/post', isAuthenticated);

var passportRouter = function(passport) {

	router.use('/isAuthenticated', isAuthenticated);

	// if login/signup was successful
	router.get('/success', function(req, res) {
		console.log('successfully logged in');
		res.send({ state: 'success', user: req.user, message: "" });
	});

	// if login/signup was unsuccessful
	router.get('/failure', function(req, res) {
		console.log('failed to login');
		res.send({ state: 'failure', user: null, message: req.flash('error') });
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure',
		failureFlash: true
	}));

	router.post('/isAuthenticated', function(req, res) {
		User.findOne({ 
			username_lower: req.body.username.toLowerCase(),
			cookie: req.body.cookie }, function(err, user) {
			if (err) {
				console.log(err);
				return res.send({ status: false});
			} else if (!user) {
				return res.send({ status: false});
			} else {
				return res.send({ status: true});
			}
		})
	})

	return router;
}

module.exports = passportRouter;