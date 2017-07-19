var mongoose = require('mongoose');   
var Post = mongoose.model('Post');
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
.get(function(req, res) {
	if (!req.body.filters) {
		Post.find().sort({ post_id: -1 }).exec(function(err, data) {
			if (err) {
				console.log(err);
				return res.send({state: 'failure'});
			} else {
				return res.send({state: 'success', posts: data});
			}
		});
	} else {
		var startDateFilter = new Date();
		var endDateFilter = new Date();
		var categoryFilter = [];

		if (req.body.filters.date.length > 0) {
			//override dates
		}

		if (req.body.filters.category.length > 0) {
			categoryFilter = req.body.filters.category;
		}
		// todo: filter by date
		Post.find({ category: {$in: categoryFilter}}).sort({ post_id: -1 }).exec(function(err, data) {
			if (err) {
				console.log(err);
				return res.send({state: 'failure'});
			} else {
				return res.send({state: 'success', posts: data});
			}
		});
	}
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
})

router.route('/post/add')
.post(function(req, res) {
	Post.findOne({}).sort({ post_id: -1 }).exec(function(err, post) {
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

			return res.send({state: 'success'});
		});
	});
});

router.route('post/update/:postId')
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
	})
});

router.route('post/remove/:postId')
.get(function(req, res) {
	Post.remove({ postId: req.params.postId}, function(err) {
		if (err) {
			return res.send({state:'failure'});
		}
		return res.send({state:'success'});
	});
})

module.exports = router;