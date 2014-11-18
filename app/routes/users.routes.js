var User            = require('../models/user');
var Settings        = require('../models/Settings');
var passport        = require('passport');
var profileTemplate = require('../profile');
var fs              = require('fs');
module.exports = function(router) {

  router.get('/getImage', function(req, res) {
    var imageQuery = Settings.find({username : req.param('user')});
    imageQuery.exec(function(err, user){
      if(err){
        return;
      }
      res.send(user[0].profileImageURL);
    });
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