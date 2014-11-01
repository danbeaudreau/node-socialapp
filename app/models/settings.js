var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSettingsSchema = new Schema({
	username : String,
	profileImageURL : String
});
module.exports = mongoose.model('UserSettings', userSettingsSchema);