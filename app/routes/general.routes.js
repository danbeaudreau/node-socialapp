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

    router.get('/inbox', function(req, res){
      res.render('inbox', {user : req.session.passport.user});
    });

};