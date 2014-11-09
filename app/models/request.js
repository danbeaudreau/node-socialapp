var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var requestSchema = new Schema({
	requester : String,
	recipient: String,
	type: String,
	status: String
});

module.exports = mongoose.model('Requests', requestSchema);