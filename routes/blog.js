var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	return res.render('status-error', { title: 'Will Wang - CPSC', statusCode: 401, errorMessage: 'You are unauthorized to view this page.' });
}

router.route('/all')
.get(function(req, res) {
	// if req.body.filters
	// get all from mongo
});

// TODO: implement CRUD. We need to make this secure first before implementing.

module.exports = router;