var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended:true}) ); 
var methodOverride = require('method-override');
var mongoose	   = require('mongoose');

var db = require('./config/db');
var port = process.env.PORT || 8080; 
mongoose.connect(db.url); 
app.use(express.static(__dirname + '/public')); 

var router = express.Router();
require('./app/routes')(router);
app.use('/', router);


app.listen(port);                                
console.log('Magic happens on port ' + port);     
exports = module.exports = app;                         
