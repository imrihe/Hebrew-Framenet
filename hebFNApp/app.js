
/**
 * Module dependencies.
 */

var express = require('express')
//, routes = require('./routes')
//, user = require('./routes/user')
	, path = require('path')
	//, mongoose = require('mongoose')
	,flash = require('connect-flash')
	,passport =require('passport')
	,LocalStrategy =require('passport-local').Strategy
	,auth = require('./contollers/auth')
	,usersMong = require('./models/mongoDB/pull.js');

//load all controllers:
//var users = require('./contollers/users')
var control = require('./contollers/index');





//TODO passport.use(auth.strat);
//auth.serializeUser;
passport.serializeUser(auth.serializeUser);
/*passport.serializeUser(function(user, done) {
	console.log("serializeUser" + user);
	done(null, user.username);
});*/

//auth.deserializeUser;
passport.deserializeUser(auth.deserializeUser);
/*passport.deserializeUser(function(username, done) {
	console.log("deserielize user :" + username);
	findUser(username, function (err, user) {
    done(err, user);
  });
});*/


//TODO
passport.use(new LocalStrategy(auth.localStrategyFunc));

//start app:
var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('your secret here'));
app.use(express.bodyParser());
app.use(express.methodOverride());

//app.use(express.bodyDecoder());

app.use(express.session({secret: "hebFN"}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(require('stylus').middleware({ 
	src: __dirname + '/views',
	dest: __dirname + '/public'
}));
app.use(express.favicon());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//development only
app.configure('development', function() {
	app.use(express.logger());
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});
app.configure('production', function() {
	app.use(express.logger());
	app.use(express.errorHandler()); 
});



app.get('/', control.index);
app.get('/login', function(req, res){
	  //res.send('login', { user: req.user, message: req.flash('error') });
		//res.render('login', { user: req.user, message: req.flash('error') });
		console.log("req.user: ", req.user);
		console.log("req.session.user: ", req.session.user);
		res.render('login', { user: req.user, message: req.flash('error') });
	});
app.get('/account', auth.ensureAuthenticated, function(req, res){
	  res.send('account: user: '+req.user);
	});
app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});



//the result of loadUser will be trasferred to 
//app.get('/userTest', users.loadUser, control.showUser);
//app.get('/userTest2', usersMong.users);
//app.get('/try1', user.listRecords);
//app.get('/login', control.login);


app.post('/login', 
		  passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
		  function(req, res) {
			console.log("user is NOW LOGGED IN");
			res.send("managed to authenticate!!!");
});

app.get('/auth', 
		passport.authenticate('local'), 
		function(req,res){
				console.log("responding after auth: ", req.session.user);
				res.send("authentication is OK");
});

app.get('/check', 
		function(req,res){
				console.log("DEBUG: checking...");
				var userScehme = require('./models/mongoDB/schemes.js').userSchema;
				var User = require('mongoose').model('User', userScehme);
				User.findOne(function(err, user){console.log("this is the one!!", err, user);});
				res.send("check is OK");
});
if (!module.parent) {
	app.listen(process.env.PORT || 3000);
	console.log("hebFNApp: Express server listening on port %d %s in %s mode", process.env.PORT || 3000, 'localhost',  app.settings.env);
}else console.log("hebFNApp is running as sub-server");

