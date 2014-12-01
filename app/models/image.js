var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var imageSchema = new Schema({
	username : String,
	date: Date,
	urlExtension: String
});

module.exports = mongoose.model('Image', imageSchema);