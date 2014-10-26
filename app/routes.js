
module.exports = function(router) {
    var User = require('./models/user');
    var validate = require('./validate');

    router.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    router.get('/api/allusers', function(req, res) {
        User.find(function(err, user) {
                 if (err)
                     res.send(err);

                 res.json(user);
        });
    });

    router.post('/api/create', function(req, res) {
            var user = new User();
            user.name = req.body.name;
            user.password = req.body.password;
            var validated = validate(user);
            if(validated) {
                user.save(function(err){
                    if (err)
                        res.send(err);
                    res.json({ message: 'User created successfully.' + user.name});
                });
            }
    });


};