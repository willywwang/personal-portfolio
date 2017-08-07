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

var endUserSchema = new mongoose.Schema({
	email: String,
	email_lower: String,
	isSubscribed: Boolean,
	unsubscribeToken: String
})


mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
mongoose.model('EndUser', endUserSchema);