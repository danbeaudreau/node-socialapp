var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose	   = require('mongoose');
var ejs 		   = require('ejs');

//authentication related dependencies
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.set('view engine', 'ejs');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended:true}) ); 
app.use(cookieParser());
app.use(session({secret: 'happy'}));
app.use(passport.initialize());
app.use(passport.session()); 

app.use(express.static(__dirname + '/public'));

//authentication related dependencies
var User = require('./app/models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var db = require('./config/db');
var port = process.env.PORT || 3000; 
mongoose.connect(db.url); 


var router = express.Router();
require('./app/routes/friends.routes')(router);
require('./app/routes/general.routes')(router);
require('./app/routes/messages.routes')(router);
require('./app/routes/privatemessages.routes')(router);
require('./app/routes/users.routes')(router);
app.use('/', router);


app.listen(port);                                
console.log('Node server started on port ' + port);     
exports = module.exports = app;                         
