/*!
* Demo registration application
* Copyright(c) 2011 Jean-Tiare LE BIGOT <admin@jtlebi.fr>
* MIT Licensed
*/

// loads model file and engine
var mongoose    = require('mongoose'),
    //memberModel = require('../models/MemberModel');
	frameModel =  require('../models/FrameModel');
	tryModel = require('../models/FrameModel');
	// Open DB connection
//mongoose.connect('mongodb://elhadad2/members');
mongoose.connect('mongodb://elhadad2/HebFrameNetDB');
mongoose.connection.on("open", function(){
    console.log("mongodb is connected!!");
    mongoose.connection.db.collection("try1", function (err, collection) {
    	console.log("what the fuck!");
        collection.find().toArray(function(err, results) {
        	console.log("what the fuck-22!");
            console.log(results);
        });
    });
  });
var ww = mongoose.connection.db.collection('frame');
//console.log(ww);
// Home page => registration form
exports.index = function(req, res){
    res.render('index.jade', { title: 'My Registration App', messages: [], errors: [] });
};



// Member list page
exports.list = function(req, res){
    memberModel.find({},function(err, docs){
    	//console.log("logging " + docs);
    	console.log("returning list!!"+docs.length);
        res.render('list.jade', { membersList: docs ,title: 'My Registration App - Member list'});
    });
};

//try1
exports.try1 = function(req, res){
	tryModel.find({},function(err, docs){
    	//console.log("logging " + docs);
    	console.log("returning list!!"+docs.length);
        res.render('list.jade', { membersList: docs ,title: 'My Registration App - Member list'});
    });
};

mongoose.connection.db.collection("test", function (err, collection) {
    collection.find().toArray(function(err, results) {
        console.log(results);
    });
});

exports.framesList = function(req, res){
	frameModel.find({},function(err, docs){
    	//console.log("logging " + docs);
    	console.log("returning frames list!!"+docs.length);
        res.render('framesList.jade', { framesList: docs ,title: 'frames list'});
    });
};

// Member list quick-and-dirty(tm) CSV export
exports.csv = function(req, res){
    memberModel.find({},function(err, docs){
    	console.log("returning csv list!!");
        members = new Array();
        str = "";
        docs.forEach(function (member) {
            str += member.title;
            str += "; " + member.firstname;
            str += "; " + member.lastname;
            str += "; " + member.mail;
            str += "; " + member.date;
            str += "\n";
        });
        res.header('Content-type', 'text/csv');
        res.send(str);
    });
};

// Member register logic
exports.index_post = function(req, res){
    member = new memberModel();
    member.title = req.body.title;
    member.firstname = req.body.firstname;
    member.lastname = req.body.lastname;
    member.mail = req.body.mail;
    
    member.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
            messages.push("Thank you for you new membership !");
        }
        else {
            console.log('Error !');
            errors.push("At least a mandatory field has not passed validation...");
            console.log(err);
        }
        res.render('index.jade', { title: 'My Registration App', messages: messages, errors: errors });
    });
};