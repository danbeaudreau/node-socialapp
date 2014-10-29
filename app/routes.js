var User     = require('./models/user');
var passport = require('passport');
var profileTemplate = require('./profile');
var ejs = require('ejs');
var fs = require('fs');
module.exports = function(router) {

    router.get('/', function(req, res) {
        res.render('index', {user : req.user });
    });

    router.get('/user/*', function(req, res) {
       res.render('./views/user/' + req.params[0] + '.ejs');
    });

    router.get('/profile', function(req, res) {
        res.render('profile', {user : req.user });
    });

    router.get('/register', function(req, res) {
        res.sendfile('./views/register.html');
    });

    router.get('/login', function(req, res) {
        res.render('login', {user: req.user});
    });

    router.get('/api/allusers', function(req, res) {
        User.find(function(err, user) {
                 if (err)
                     res.send(err);

                 res.json(user);
        });
    });

    router.post('/api/create', function(req, res) {
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err) {
                console.log(err);
                return;
            }
            
            var path = "views/user/" + req.body.username.toLowerCase() + ".ejs";
            if(!fs.existsSync(path)) {
               fs.writeFile(path, profileTemplate, function (err) {
                 if (err) {
                  console.log(err);
                  return;
                 }
              });

            }
            
        });
    });


     router.post('/login', passport.authenticate('local'), function(req, res) {
          if(req.user) {    
            res.send({
             status: 'success'
            });
          }
    });

};