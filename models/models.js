var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	postId: Number,
	title: String,
	category: String,
	summary: String,
	post: String,
	created_by: String,
	keyWords: Array,
	created_on: { type: Date, default: Date.now }
});

var userSchema = new mongoose.Schema({
	username: String,
	username_lower: String,
	password: String,
	cookie: String
});


mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);