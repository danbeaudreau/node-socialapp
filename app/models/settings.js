var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSettingsSchema = new Schema({
	username : String,
	profileImageURL : String,
	bio: String,
	joinDate: Date
});
module.exports = mongoose.model('UserSettings', userSettingsSchema);