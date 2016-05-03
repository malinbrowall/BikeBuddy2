var express = require('express'),
    exphbs  = require('express3-handlebars'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    FacebookStrategy = require('passport-facebook').Strategy;


var config = require('./config.json'), //config file contains all tokens and other private info
    funct = require('./functions.js');

var app = express();

// Facebook authentication
var fbAuth = require('./authentication/fbAuth.js');


 app.use(express.static(__dirname + '/styles'));
 app.use(express.static(__dirname + '/maps'));


//===============PASSPORT=================

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

// Use the LocalStrategy within Passport to login users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// Use the LocalStrategy within Passport to Register/"signup" users.
passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localReg(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));


// Use Facebook to login
passport.use(new FacebookStrategy({
    clientID: fbAuth.clientID,
    clientSecret: fbAuth.clientID,
    callbackURL: fbAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/signin');
}


function event(req, res, next) {
      if (event) {
        console.log("Create an event " + user.event);
        req.session.success = 'The event where successfully created ' + user.username + '!';
        done(null, user);
      }
      if (!event) {
        console.log("Could not creata an event");
        req.session.error = 'Could not creata an event. Please try again.';
        done(null, event); 
    }
  }


//===============EXPRESS=================

// Configure Express
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'supernova' }));
app.use(passport.initialize());
app.use(passport.session());


// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

app.use(app.router);

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main',
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//===============ROUTES=================
//displays our homepage
app.get('/', function(req, res){
  res.render('home', {user: req.user});
});

app.get('/maps', function(req, res){
   res.render('maps', {user: req.user});
});

//displays our signup page
app.get('/signin', function(req, res){
  res.render('signin');
});

app.get('/info', function(req, res){
  res.render('info', {user: req.user});
});

app.get('/contact', function(req, res){
  res.render('contact', {user: req.user});
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);


app.get('/event', function(req, res){
  res.render('event', {user: req.user});
});


app.post('/p/:id', function(req, res) {
  var id = req.param("id")
  , post = {
    text: req.param("answer")
  }

  db.newEventBuilder()
    .from('event', id)
    .type('post')
    .data(post)
    .then(function (results){
      res.redirect("/p/" + id);
    });
});

app.post('/event-post', function (req, res){
  var title = req.param("title")
  , subject = req.param("subject")
  , date = moment().format('MMMM Do YYYY, h:mm:ss a')

  db.post('event', {
    "sub-title" : title,
    "sub-dis" : subject,
    "date" : date
  })
  .then(function (result) {
    var responseKey = result.headers.location.split("/")[3];
    res.redirect('/p/' + responseKey);
  })
  .fail(function (err) {

  });
});

//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});




//===============PORT=================
var port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on " + port + "!");
