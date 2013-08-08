/**
 * data schemes
 */


var mongoose = require('mongoose'),
Schema = mongoose.Schema;


var userSchema = exports.userSchema = new Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String
//	roles: Array
});


userSchema.methods.validPassword = function (password) {
	console.log("validating user in : userScheme");
	  if (password === this.password) {
	    return true; 
	  } else {
	    return false;
	  }
	};
