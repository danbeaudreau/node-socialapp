var User            = require('./models/user');
var Message         = require('./models/messages');
var PrivateMessage  = require('./models/privatemessages');
var Draft           = require('./models/drafts');
var Request         = require('./models/request');
var passport        = require('passport');
var profileTemplate = require('./profile');
var ejs             = require('ejs');
var fs              = require('fs');
module.exports = function(router) {



    

    // router.get('/api/allusers', function(req, res) { //debugging function
    //     Request.find(function(err, settings) {
    //              if (err)
    //                  res.send(err);

    //              res.json(settings);
    //     });
    // }); 


};