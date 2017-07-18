var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	//Deserialize user will call with the unique id provided by serializeuser
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		})
	});

	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) { 
		User.findOne({ username_lower : username.toLowerCase()}, function(err, user) {
			if (err) {
				console.log(err);
				return done(null, false, { message: 'An unknown error has occured. Please try again later.'});
			}

			if (!user) {
				return done(null, false, { message: 'Invalid username and/or password' });
			}

			return done(null, user);
		})
	}
	));
};