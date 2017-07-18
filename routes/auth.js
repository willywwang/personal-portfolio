var express = require('express');
var router = express.Router();

var passportRouter = function(passport) {

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

	return router;
}

module.exports = passportRouter;