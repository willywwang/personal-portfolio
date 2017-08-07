var mongoose = require('mongoose');   
var Post = mongoose.model('Post');
var EndUser = mongoose.model('EndUser');
var crypto = require('crypto');
var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	return res.send({state: 'failure', errorMessage: 'You are unauthorized to view this page.' });
}

router.use('/post', isAuthenticated);

router.route('/all')
.post(function(req, res) {
	Post.find().sort({ postId: -1 }).exec(function(err, data) {
		if (err) {
			console.log(err);
			return res.send({state: 'failure'});
		} else {
			return res.send({state: 'success', posts: data});
		}
	});
});

router.route('/all/category')
.get(function(req, res) {
	Post.aggregate(
		[
		{ '$group': { '_id': '$category' }},
		{ '$sort': { 'category': 1 }}
		])
	.exec(function(err,categories) {
		if (err) {
			console.log(err);
			return res.send({state: 'failure'});
		} else {
			return res.send({state: 'success', categories: categories});
		}
	});
});

router.route('/all/keywords')
.get(function(req, res) {
	Post.find().select({ keyWords : 1 }).exec(function(err, keywords) {
		if (err) {
			console.log(err);
			return res.send({state: 'failure'});
		} else {
			return res.send({state: 'success', keywords: keywords});
		}
	});
});


router.route('/find/post/:postId')
.get(function(req, res) {
	Post.findOne({postId: req.params.postId}, function(err, post) {
		if (err) {
			return res.send({state: 'failure'});
		} else if (!post) {
			return res.send({state: 'failure'});
		} else {
			return res.send({state: 'success', post: post});
		}
	})
});

router.route('/post/add')
.post(function(req, res) {
	Post.findOne({}).sort({ postId: -1 }).exec(function(err, post) {
		if (err) {
			return res.send({state: 'failure'})
		}

		var newPost = new Post();

		if (req.body.title) {
			newPost.title = req.body.title.trim();
		}

		if (req.body.category) {
			newPost.category = req.body.category.trim();
		}

		if (req.body.summary) {
			newPost.summary = req.body.summary.trim();
		}

		if (req.body.post) {
			newPost.post = req.body.post.trim();
		}

		if (req.body.created_by) {
			newPost.created_by = req.body.created_by.trim();
		}

		newPost.keyWords = req.body.keyWords;

		if (!post) {
			newPost.postId = 0;
		} else {
			newPost.postId = post.postId + 1;
		}

		newPost.save(function(err) {
			if (err) {
				console.log(err);
				return res.send({state: 'failure'});
			}

			// TODO: Send email to subscribers
			return res.send({state: 'success'});
		});
	});
});

router.route('/post/update/:postId')
.post(function(req, res) {
	Post.findOne({ postId: req.params.postId }, function(err, post) {
		if (err) {
			return res.send({state: 'failure'});
		}

		if (!post) {
			return res.send({state: 'failure'});
		} else {
			post.title = req.body.title;
			post.category = req.body.category;
			post.summary = req.body.summary;
			post.post = req.body.post;
			post.created_by = req.body.created_by;
			post.keyWords = req.body.keyWords;

			post.save(function(err) {
				if (err) {
					return res.send({state: 'failure'});
				}

				return res.send({state: 'success'});
			})
		}
	});
});

router.route('/post/remove/:postId')
.get(function(req, res) {
	Post.remove({ postId: req.params.postId}, function(err) {
		if (err) {
			return res.send({state:'failure'});
		}
		return res.send({state:'success'});
	});
});

router.route('/subscribe')
.post(function(req, res) {
	EndUser.findOne({ email_lower: req.body.email_lower, isSubscribed: true}, function(err, user) {
		if (err) {
			return res.send({state: 'failure', message: 'An unknown error occured. Please try again later.'});
		}

		if (user) {
			return res.send({state: 'failure', message: 'This email is already subscribed.'});
		} else {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');

				var endUser = new EndUser();
				endUser.email = req.body.email;
				endUser.email_lower = req.body.email_lower;
				endUser.isSubscribed = true;
				endUser.unsubscribeToken = token;

				endUser.save(function(err) {
					if (err) {
						return res.send({state: 'failure', message: 'An unknown error occured. Please try again later.'});
					} else {
						var transporter = nodemailer.createTransport({
							service: 'Gmail',
							auth: {
								user: 'wang.yw.william@gmail.com',
								pass: process.env.emailPassword
							}
						});	

						var mailOptions = {
							from: 'donotreply@willwang.com',
							to: endUser.email,
							subject: 'Subscription to Will\'s Blog Complete',
							text: 'You\'ve subscribed to my blog! If you wish to unsubscribe at any time please click this link: ' +
							'https://' + req.headers.host + '/blog/unsubscribe/' + token
						};

						transporter.sendMail(mailOptions, function(err, info){
							if (err) {
								// silently fail
							} 
							
							return res.send({
								state: 'success'
							});
						});
					}
				});
			});
		}
	})
});

router.route('unsubscribe/:token')
.get(function(req, res) {
	var userEmail = "";
	EndUser.findOne({ unsubscribeToken: req.params.token}, function(err, user) {
		if (err) {
			return res.send({state: 'failure', message: 'An unknown error occured. Please try again later.'});
		}

		if (!user) {
			return res.send({state: 'failure', message: 'User not found.'});
		} else {
			userEmail = user.email;

			EndUser.remove({ unsubscribeToken: req.params.token}, function(err) {
				if (err) {
					return res.send({state: 'failure', message: 'An unknown error occured. Please try again later.'});
				} else {
					var transporter = nodemailer.createTransport({
						service: 'Gmail',
						auth: {
							user: 'wang.yw.william@gmail.com',
							pass: process.env.emailPassword
						}
					});	

					var mailOptions = {
						from: 'donotreply@willwang.com',
						to: endUser.email,
						subject: 'Successfully unsubscribed from Will\'s Blog',
						text: 'You\'ve successfully unsubscribed from my blog. We hope to see you again.'
					};

					transporter.sendMail(mailOptions, function(err, info){
						if (err) {
							// silently fail
						} 

						return res.send({state: 'success', message: 'Successfully unsubscribed from my blog.'});
					});
				}
			})
		}
	});
})

module.exports = router;