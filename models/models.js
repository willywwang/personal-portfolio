var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	post_id: Number,
	title: String,
	type: String,
	summary: String,
	post: String,
	created_by: String,
	created_on: { type: Date, default: Date.now }
});

mongoose.model('Post', postSchema);