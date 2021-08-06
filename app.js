var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const upload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var funcRouter = require('./routes/functionary');
var type_funcRouter = require('./routes/type_functionary');
var schedRouter = require('./routes/schedule');
var turnRouter = require('./routes/turn');
var servRouter = require('./routes/service');

let dev_db_url = 'mongodb://localhost/terasoft';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, function (err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({uri: 'mongodb://localhost:27017/session_store', collection: 'mySessions'});
store.on('error', (error) => {
  console.error(error);
})

var app = express();

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: false}));

require('./config/passport')(passport);

app.use(session({
  key: 'terasoft_sid',
  secret: 'quarty',
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24*3600000
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(upload());
app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/type/functinary', type_funcRouter);
app.use('/functionary', funcRouter);
app.use('/service', servRouter);
app.use('/schedule', schedRouter);
app.use('/turn', turnRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
