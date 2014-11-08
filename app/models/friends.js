var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var friendSchema = new Schema({
	username : String,
	friend: String,
	date: Date
});

module.exports = mongoose.model('Friends', friendSchema);