
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

routes.admin = require('./routes/admin');
routes.update = require('./routes/update');
routes.contact = require('./routes/contact');
routes.login = require('./routes/login');
routes.logout = require('./routes/logout');

app.set('ip', process.env.IP || '127.0.0.1');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public/images/icon.ico')));
app.use(express.logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/admin', routes.admin);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/users', user.list);

app.post('/update', routes.update);
app.post('/contact', routes.contact);
app.post('/login', routes.login);

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
