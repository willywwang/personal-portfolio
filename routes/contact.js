var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

router.route('/email')
.post(function(req, res) {
	if (!req.body) {
		return res.send({
			state: 'failure'
		});
	} else if (!req.body.name || !req.body.email || !req.body.message) {
		return res.send({
			state: 'failure'
		});
	} else {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'william.yen.wang@gmail.com',
				pass: process.env.emailPassword
			}
		});

		var mailOptions = {
			from: 'william.yen.wang@gmail.com',
			to: 'wang.yw.william@gmail.com',
			subject: 'Contact Message from Website',
			text: "Name: " + req.body.name + "\n" +
				"Email: "  + req.body.email + "\n" +
				"Message: " + req.body.message
		};

		transporter.sendMail(mailOptions, function(err, info){
			if (err) {
				return res.send({ 
					state: 'failure',
					error: err
				});
			} else {
				return res.send({
					state: 'success'
				});
			}
		});
	}
});

module.exports = router;
