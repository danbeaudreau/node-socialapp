var User     = require('./models/user');
var passport = require('passport');
var profileTemplate = require('./profile');
var ejs = require('ejs');
var fs = require('fs');
var connectFlash   = require('connect-flash');
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

    router.get('/checkauth', function(req, res){
      if(req.isAuthenticated()) {
        res.json(req.session.passport.user);
      }
    });

 /*   router.get('/api/allusers', function(req, res) {
        User.find(function(err, user) {
                 if (err)
                     res.send(err);

                 res.json(user);
        });
    }); */ //for debugging purposes

    router.post('/api/create', function(req, res) {
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err) {
                console.log('!!!!' + err);
                return;
            }
            passport.authenticate('local');
            var path = "views/" + req.body.username.toLowerCase() + ".ejs";
            if(!fs.existsSync(path)) {
               fs.writeFile(path, profileTemplate, function (err) {
                 if (err) {
                  console.log('!!' + err);
                  return;
                 }
              });

            }
            
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

    router.get('*', function(req, res) { //show the current user
      var path = req.params[0].toLowerCase() + '.ejs';
      res.render(path.slice(1), {user : req.session.passport.user});
    });


};