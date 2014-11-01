var User            = require('./models/user');
var Message         = require('./models/messages');
var Settings        = require('./models/Settings');
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
      res.render('index');
    });

    router.get('/checkauth', function(req, res){ //debug funciton for auth
      if(req.isAuthenticated()) {
        res.json(req.session.passport.user);
      }
    });

    router.get('/getMessages', function(req,res){
      var messagesQuery = Message.find({username : req.param('user')});
      var allMessages = new Array();
      messagesQuery.exec(function(err, messages){
        if(err){
          return;
        }
        messages.forEach(function(messages){
          allMessages.push(messages.message);
        });
        res.json(allMessages);
      });
    });

    router.get('/api/allusers', function(req, res) {
        Settings.find(function(err, settings) {
                 if (err)
                     res.send(err);

                 res.json(settings);
        });
    }); 
    router.post('/changeSettings', function(req, res) {
      if(req.isAuthenticated()) {
        Settings.update({username: req.session.passport.user}, {$set: { profileImageURL: req.body.profileImageURL }}, {upsert: false}, function(err){
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
          username: req.session.passport.user,
          message: req.body.message
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
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
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
            var settings = new Settings({username: req.body.username, profileImageURL: "/images/default-avatar.jpg"});
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
      Settings.findOne({username : req.session.passport.user}, function(err, settings){
        profileImageURL = settings.profileImageURL;
        res.render(path.slice(1), {user : req.session.passport.user, profileName : req.params[0].toLowerCase().substr(1), profileImageURL: profileImageURL});
      });
    });


};