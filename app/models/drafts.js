var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var draftSchema = new Schema({
	recipient : String,
	subject: String,
	author: String,
	message: String,
	date: Date,
	isDeleted: Boolean
});

module.exports = mongoose.model('Draft', draftSchema);