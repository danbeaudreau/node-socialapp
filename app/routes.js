var User            = require('./models/user');
var Message         = require('./models/messages');
var Settings        = require('./models/Settings');
var Friends         = require('./models/friends');
var passport        = require('passport');
var profileTemplate = require('./profile');
var ejs             = require('ejs');
var fs              = require('fs');
module.exports = function(router) {

    router.get('/', function(req, res) {
        res.render('index', {user : req.session.passport.user});
    });

    router.get('/register', function(req, res) {
        res.render('register', {user: req.session.passport.user});
    });

    router.get('/login', function(req, res) {
        res.render('login', {user: req.session.passport.user});
    });

    router.get('/logout', function(req, res) {
      req.logout();
      res.render('index', {user : req.session.passport.user});
    });

    router.get('/settings', function(req,res) {
      res.render('settings', {user : req.session.passport.user});
    });

    router.get('/getMessages', function(req,res){
      var messagesQuery = Message.find({username : req.param('user')});
      messagesQuery.exec(function(err, messages){
        if(err){
          return;
        }
        res.json(messages);
      });
    });

    router.get('/getFriends', function(req, res) {
      var friendsQuery = Friends.find({username : req.param('user')});
      friendsQuery.exec(function(err, friends){
        if(err){
          return;
        }
        res.json(friends);
      });
    });

    router.get('/getImage', function(req, res) {
      var imageQuery = Settings.find({username : req.param('user')});
      imageQuery.exec(function(err, user){
        if(err){
          return;
        }
        res.send(user[0].profileImageURL);
      });
    });

    // router.get('/api/allusers', function(req, res) { //debugging function
    //     Settings.find(function(err, settings) {
    //              if (err)
    //                  res.send(err);

    //              res.json(settings);
    //     });
    // }); 

    router.post('/addFriend', function(req, res) {
      if(req.isAuthenticated()){
        var friendData = {
          username: req.session.passport.user,
          friend:   req.param.friend,
          date:     new Date()
        };
        var friend = new Friends(friendData);
        friend.save(function(error, friend){
          if(error){
            return;
          }
        });
        res.send({
             status: 'success'
        });
      }
    });

    router.post('/changeSettings', function(req, res) {
      if(req.isAuthenticated()) {
        Settings.update({username: req.session.passport.user}, {$set: { profileImageURL: req.body.profileImageURL || "/images/default-avatar.jpg", bio: req.body.bio || "" }}, {upsert: false}, function(err){
          if(err) {
            return;
          }
          res.send({
            status: 'success'
          });
        });
      }
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

    router.post('/api/create', function(req, res) {
        User.register(new User({username: req.body.username.toLowerCase()}), req.body.password, function(err, user){
            if(err) {
                console.log(err);
                return;
            }
            var path = "views/" + req.body.username.toLowerCase() + ".ejs";
            if(!fs.existsSync(path)) {
               fs.writeFile(path, profileTemplate, function (err) {
                 if (err) {
                  console.log(err);
                  return;
                 }
              });

            }
            var settings = new Settings({username: req.body.username, profileImageURL: "/images/default-avatar.jpg", joinDate: new Date(), bio : ""});
            settings.save(function(error, settings) {
              if(error){
                return;
              }
            });
            
        });
        res.send({
             status: 'success'
            });
    });


     router.post('/login', passport.authenticate('local'), function(req, res) {
          if(req.session.passport.user) {    
            res.send({
             status: 'success'
            });
          }
    });

     router.get('/favicon.ico', function(req, res) {
       res.sendfile('images/favicon.png');
     });

    router.get('*', function(req, res) { //show the current user
      var path = req.params[0].toLowerCase() + '.ejs';
      var profileImageURL;
      var joinDate;
      var bio;
      Settings.findOne({username : req.params[0].toLowerCase().slice(1)}, function(err, settings){
        if(err) {
          return;
        }
        if(!settings){
          res.send({
             status: 'error'
          });
          return;
        }
        profileImageURL = settings.profileImageURL;
        joinDate = settings.joinDate;
        var year = joinDate.getFullYear();
        var month = joinDate.getMonth();
        var day = joinDate.getDate();
        bio = settings.bio;
        res.render(path.slice(1), {user : req.session.passport.user, profileName : req.params[0].toLowerCase().substr(1), profileImageURL: profileImageURL, joinDate: month + '/' + day + '/' + year, bio: bio});
      });
    });


};