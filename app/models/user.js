//users model
var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name : {type : String, default: ''}, password: {type: String, default:''}
});