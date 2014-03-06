/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var dbinit = require('./routes/dbinit');
var db = require('./models');

//Express initialization
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
var test = function(role) {
 return function test(req, res, next) {
 console.log("Chainedfunction :D" + role);
 if (true) {
  res.send("Blah");
 } else {
  next();
 }
 }
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/dbinit', dbinit.index);
app.post('/users', test("xxx"), user.create);
app.get('/user/:userId', user.get);
app.del('/user/:userId', user.del);
app.put('/user/:userId', user.update);

//Init db stuff, connect to mysql instance and start server
db
        .sequelize
        .authenticate()
        .complete(function(err) {
                if (err) {
                 throw err;
                } else {
                 http.createServer(app).listen(app.get('port'), function() {
                  console.log('Express server listening on port ' + app.get("port"));
                 })
        }
        })
db.cSync(true);
