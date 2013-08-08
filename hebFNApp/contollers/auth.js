/**
 * use according to this project: https://github.com/jaredhanson/passport-local/blob/master/examples/login/app.js
 */


var passport = require('passport')
//,LocalStrategy = require('passport-local').Strategy
, mongoose = require('mongoose');


var userSchema = require('../models/mongoDB/schemes.js').userSchema;
//console.log("DEBUG: userSchema:" , userSchema);

//the function activates the model and find the user
function findUser(username, fn){
	console.log("searching user <%s> in DB: ", username);
	var User = mongoose.model('User', userSchema);
	console.log("UserModel:", User);
	console.log("created model");
	//console.log("the user func is: " + User.findOne);
	User.findOne({}, function (err, user){console.log("finally!! err user:", err, user, 1+10);});
	console.log("created model2");
	User.findOne({ username: username }, function (err, user) {
		console.log("the user is: ", user);
		if (err) { return fn(err); }
		if (!user) {
			console.log("unknown user");
			return fn(null, false, { message: 'Incorrect username.' });
		}
		return fn(null, user);
	});
}


//this function will be called once the "login" call is being called by  req.login(); (in the app.get('login')
exports.serializeUser =function(user, done) {
	console.log("serializeUser" + user);
	done(null, user.username);
};

//this function will be callsed once the "logout" call is being called by  req.logout(); (in the app.get('logout')
exports.deserializeUser =function(username, done) {
	console.log("deserielize user :" + username);
	findUser(username, function (err, user) {
		done(err, user);
	});
};

exports.localStrategyFunc=function(username, password, done) {
    // asynchronous verification, for effect...
	  
    process.nextTick(function () {
    	console.log("next tick");
    	//console.log("searching for user: ", username);
    	findUser(username, function (err, user){
    		console.log("err !user user.passwor, password:", err, user, user.password, password );
    		if (err) { return done(err); }
    		if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    		if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
    		console.log("done next tick");
    		return done(null, user);
    	});
    });
  }




//middleware methode to ensure that the current user is authorised
//TODO: expend by roles
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	console.log("checking autentication " + req.user);
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login')
};










//TODO passport.use(auth.strat);
//auth.serializeUser;
//auth.deserializeUser;


/*exports.serializeUser = passport.serializeUser(function(user, done) {
	console.log("serializeUser");
	done(null, user);
});

exports.deserializeUser = passport.deserializeUser(function(obj, done) {
	console.log("deSerializeUser");
	done(null, obj);
});*/