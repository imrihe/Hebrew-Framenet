/*!
* Demo registration application
* Copyright(c) 2011 Jean-Tiare LE BIGOT <admin@jtlebi.fr>
* MIT Licensed
*/

// loads model file and engine
var mongoose    = require('mongoose'),
    memberModel = require('../models/MemberModel');

// Open DB connection
mongoose.connect('mongodb://elhadad2/members');

// Home page => registration form
exports.index = function(req, res){
    res.render('index.jade', { title: 'My Registration App', messages: [], errors: [] });
};

// Member list page
exports.list = function(req, res){
    memberModel.find({},function(err, docs){
        res.render('list.jade', { title: 'My Registration App - Member list', members: docs });
    });
};

// Member list quick-and-dirty(tm) CSV export
exports.csv = function(req, res){
    memberModel.find({},function(err, docs){
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