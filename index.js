var express = require('express');
var morgan = require('morgan');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');   
var secret = require('./config/secret.js'); 
var MongoStore = require('connect-mongo')(session); 
var passport = require('passport'); 
//midleware 
app.use('/static' , express.static('public')); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('ejs', engine);
app.set('view-engine', 'ejs');
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUnitialize: true, 
    secret: secret.secretKey, 
    store: new MongoStore({url: secret.database, autoReconnect: true}) 
}));  
app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session()); 

//database
mongoose.connect( secret.database, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log('connection success!!');
    }
});

 var mainRoutes = require('./routes/main'); 
 var userRoutes = require('./routes/user');     
 app.use(mainRoutes);
 app.use(userRoutes); 

//server
app.listen(secret.port, function (err) {
    if (err) throw err;
    console.log('server is listening in port ' + secret.port);
});