var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	username_lower: String,
	password: String,
	cookie: String
});

mongoose.model('User', userSchema);