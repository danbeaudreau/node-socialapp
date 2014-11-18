var Message         = require('../models/messages');
var PrivateMessage  = require('../models/privatemessages');
var Draft           = require('../models/drafts');

module.exports = function(router) {

    router.get('/getMessages', function(req,res){
      var messagesQuery = Message.find({username : req.param('user')});
      messagesQuery.exec(function(err, messages){
        if(err){
          return;
        }
        res.json(messages);
      });
    });

    router.post('/postMessage', function(req, res) {
      if(req.isAuthenticated()) {
        var messageData = {
          author: req.session.passport.user,
          message: req.body.message,
          username: req.body.username
        };
        var message = new Message(messageData);
        message.save(function(error, message){
          if(error){
            return;
          }
        });
          res.send({
             status: 'success'
          });
        }
    });

};