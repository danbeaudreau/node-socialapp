var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose	   = require('mongoose');
var connectFlash   = require('connect-flash');
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
app.use(connectFlash());

app.use(express.static(__dirname + '/public'));

//authentication related dependencies
var User = require('./app/models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var db = require('./config/db');
var port = process.env.PORT || 8080; 
mongoose.connect(db.url); 


var router = express.Router();
require('./app/routes')(router);
app.use('/', router);


app.listen(port);                                
console.log('Node server started on port ' + port);     
exports = module.exports = app;                         
