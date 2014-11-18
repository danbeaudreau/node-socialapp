var PrivateMessage  = require('../models/privatemessages');
var Draft           = require('../models/drafts');

module.exports = function(router) {

  router.get('/getDrafts', function(req, res) {
    if(req.isAuthenticated()) {
      var draftQuery = Draft.find({author: req.session.passport.user, isDeleted: false});
      draftQuery.exec(function(err, drafts) {
        if(err){
          return;
        }
        res.json(drafts);
      });
    }
  });

  router.post('/deleteDraft', function(req, res) {
    if(req.isAuthenticated()) {
      var draftQuery = Draft.find({author: req.session.passport.user, _id: req.body.id});
      draftQuery.exec(function(err, draft){
        if(err){
          return;
        }
        if(!draft){
          return;
        }
        Draft.update({_id: req.body.id}, {$set: {isDeleted: true}}, {upsert:false}, function(err, numAffected) {
          if(numAffected === 0){
            return;
          }
          if(err){
            return;
          }
          res.send({
               status: 'success'
          });
        });          

      });
    }
  });

  router.get('/getSentMessages', function(req, res) {
    if(req.isAuthenticated()) {
      var messageQuery = PrivateMessage.find({author: req.session.passport.user, isDeletedByAuthor: false});
      messageQuery.exec(function(err, messages) {
        if(err){
          return;
        }
        res.json(messages);
      });
    }
  });

  router.get('/getPrivateMessages', function(req, res){
    if(req.isAuthenticated()){
      var privateMessageQuery = PrivateMessage.find({recipient: req.session.passport.user, isDeletedByRecipient: false});
      privateMessageQuery.exec(function(err, privateMessages){
        if(err){
          return;
        }
        res.json(privateMessages);
      });
    }
  });

  router.post('/deleteSentPrivateMessage', function(req, res){
    if(req.isAuthenticated()){
      var messageQuery = PrivateMessage.find({author: req.session.passport.user, _id: req.body.id});
      messageQuery.exec(function(err, privateMessage){
       if(err){
        return;
       }
       if(!privateMessage){
        return;
       }
       PrivateMessage.update({_id: req.body.id}, {$set: {isDeletedByAuthor: true}}, {upsert:false}, function(err, numAffected) {
        if(numAffected === 0){
          return;
        }
        if(err){
          return;
        }
        res.send({
             status: 'success'
        });
      });
     });
    }
  });

  router.post('/deleteRecievedPrivateMessage', function(req, res){
    if(req.isAuthenticated()){
      var messageQuery = PrivateMessage.find({recipient: req.session.passport.user, _id: req.body.id});
      messageQuery.exec(function(err, privateMessage){
       if(err){
        return;
       }
       if(!privateMessage){
        return;
       }
       PrivateMessage.update({_id: req.body.id}, {$set: {isDeletedByRecipient: true}}, {upsert:false}, function(err, numAffected) {
        if(numAffected === 0){
          return;
        }
        if(err){
          return;
        }
        res.send({
             status: 'success'
        });
      });
     });
    }
  });

  router.post('/saveDraft', function(req, res) {
    if(req.isAuthenticated()){
      var draftData = {
        recipient: req.body.recipient,
        author: req.session.passport.user,
        subject: req.body.subject,
        message: req.body.message,
        date: new Date(),
        isDeleted: false,
        isRepliedTo: false
      };
      var draft = new Draft(draftData);
      draft.save(function(error, draft){
        if(error) {
          return;
        }
        res.send({
          status: 'success'
        });
      });
    }
  });


  router.post('/sendPrivateMessage', function(req, res) {
    if(req.isAuthenticated()){
      var privateMessageData = {
        recipient: req.body.recipient,
        author: req.session.passport.user,
        subject: req.body.subject,
        message: req.body.message,
        date: new Date(),
        isDeletedByAuthor: false,
        isDeletedByRecipient: false,
        isRepliedTo: false,
      };
      var privateMessage = new PrivateMessage(privateMessageData);
      privateMessage.save(function(error, privateMessage){
        if(error) {
          return;
        }
        res.send({
          status: 'success'
        });
      });
    }
  });

};