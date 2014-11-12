var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var privateMessageSchema = new Schema({
	recipient : String,
	author: String,
	message: String,
	date: Date,
	isDeletedByRecipient: Boolean,
	isDeletedByAuthor: Boolean,
	isRepliedTo: Boolean,
	isDraft: Boolean
});

module.exports = mongoose.model('PrivateMessage', privateMessageSchema);