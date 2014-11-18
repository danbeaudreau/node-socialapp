var Friends         = require('../models/friends');
var Request         = require('../models/request');
module.exports = function(router) {

    router.get('/getFriends', function(req, res) {
      var friendsQuery = Friends.find({username : req.param('user')});
      friendsQuery.exec(function(err, friends){
        if(err){
          return;
        }
        res.json(friends);
      });
    });

    router.get('/getFriendRequests', function(req, res) {
      if(req.isAuthenticated()){
        var requestQuery = Request.find({recipient: req.session.passport.user, type:"friend", status: "pending"});
        requestQuery.exec(function(err, request){
          if(err){
            return;
          }
          res.json(request);
        });
      }
    });

    router.get('/getFriendRequestStatus', function(req, res) {
      if(req.isAuthenticated()){
        var requestQuery = Request.find({recipient: req.param('recipient'), requester: req.session.passport.user, type:"friend"});
        requestQuery.exec(function(err, request){
          if(err){
            return;
          }
          res.json(request);
        });
      }
    });

    router.post('/makeFriendReqest', function(req, res) {
      if(req.isAuthenticated()){
        var requestDate = new Date();
        var requestData = {
          requester: req.session.passport.user,
          recipient: req.body.recipient,
          type: "friend",
          status: "pending",
          date: requestDate
        };
        var request = new Request(requestData);
        request.save(function(error, request){
          if(error){
            return;
          }
          res.send({
               status: 'success'
          });
        });
      }
    });

    router.post('/approveFriendRequest', function(req, res) {
      if(req.isAuthenticated()){
        Request.update({recipient: req.session.passport.user, requester: req.body.requester}, {$set: {status: "approved"}}, {upsert: false}, function(err, numAffected){
          if(numAffected === 0){
            return;
          }
          if(err){
            return;
          }
          addFriend(req.session.passport.user, req.body.requester);
          res.send({
               status: 'success'
          });
        });
      }
    });

    router.post('/ignoreFriendRequest', function(req, res) {
      if(req.isAuthenticated()){
        Request.update({recipient: req.session.passport.user, requester: req.body.requester}, {$set: {status: "ignored"}}, {upsert: false}, function(err, numAffected){
          if(numAffected === 0) {
            return;
          }
          if(err) {
            return;
          }
          res.send({
            status: 'success'
          });
        });
      }
    });

    function addFriend(recpient, requester){
      var friendshipDate = new Date();
        var friendData = {
          username: recpient,
          friend:   requester,
          date:     friendshipDate
        };
        var linkedFriendData = {
          username: requester,
          friend:   recpient,
          date:     friendshipDate
        };
        var friend = new Friends(friendData);
        var linkedFriend = new Friends(linkedFriendData);
        friend.save(function(error, friend){ //need to add error handling here
          if(error){
            return false;
          }
        });
        linkedFriend.save(function(error, friend){
          if(error){
            return false;
          }
        });
    };

};