/*!
* Demo registration application
* Copyright(c) 2011 Jean-Tiare LE BIGOT <admin@jtlebi.fr>
* MIT Licensed
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;



//frame scheme
var frameSchema = new Schema({
    id        : ObjectId,
    frame	 :{ type: String, required: true}
});

var trySchema = new Schema({
    id        : ObjectId,
    "first"	 :String,
    "sec"	: String
});
//module.exports = mongoose.model('frame', frameSchema);
module.exports = mongoose.model('try1', trySchema);
