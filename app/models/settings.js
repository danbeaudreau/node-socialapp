var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSettingsSchema = new Schema({
	profileimgurl : String;
});
module.exports = mongoose.model('UserSettings', userSettingsSchema);