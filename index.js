var express = require('express'),
    exphbs  = require('express3-handlebars'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    moment = require('moment'),
    FacebookStrategy = require('passport-facebook').Strategy;


var config = require('./config.json'), //config file contains all tokens and other private info
    funct = require('./functions.js');
    fbAuth = require('./fbAuth.json');
    events = require('./events.js');
    db = require('orchestrate')(config.db);

var app = express();

 app.use(express.static(__dirname + '/styles'));
 app.use(express.static(__dirname + '/maps'));
 app.use(express.static(__dirname + '/images'));


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


// Use Facebook to login
passport.use(new FacebookStrategy({
    clientID: fbAuth.clientID,
    clientSecret: fbAuth.clientSecret,
    callbackURL: fbAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
     process.nextTick(function(id, name) {

        var name = profile.displayName;
        var id = profile.id;

        funct.fbLogin(id, name)
        console.log("Logged in as " + name);

    });
    return done(null, profile);
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

//========================================

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

app.get('/post', function(req, res){
  res.render('post', {user: req.user});
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

app.get('/', events.getEvent);

app.get('/p/:id', function(req, res) {
  db.get('Event', req.param("id"))
  .then(function (results){
    db.newEventReader()
    .from('Event', req.param("id"))
    .type('post')
    .then(function (events){

      events.body.results.forEach(function (obj, index){
          events.body.results[index].date = moment.unix(obj.timestamp / 1000).format('MMMM Do YYYY, h:mm:ss a');
      });

      res.render('home', {
        title: results.body["titles"],
        content: results.body["desc"],
        responses: events.body.results
      });
    });
  });
});


app.post('/p/:id', function(req, res) {
  var id = req.param("id")
  , post = {
    text: req.param("answer")
  }

  db.newEventBuilder()
    .from('Event', id)
    .type('post')
    .data(post)
    .then(function (results){
      res.redirect("/p/" + id);
    });
});

/** POST / create a new topic **/
app.post('/topic', function (req, res){
  var title = req.param("title")
  , subject = req.param("subject")
  , date = moment().format('MMMM Do YYYY, h:mm:ss a')

  db.post('Event', {
    "titles" : title,
    "desc" : subject,
    "date" : date
  })
  .then(function (result) {
    var responseKey = result.headers.location.split("/")[3];
    res.redirect('/p/' + responseKey);
  })
  .fail(function (err) {

  });
});



app.get('/p/:id', function(req, res) {
  db.get('Event', req.param("id"))
  .then(function (results){
    db.newEventReader()
    .from('Event', req.param("id"))
    .type('post')
    .then(function (events){

      events.body.results.forEach(function (obj, index){
          events.body.results[index].date = moment.unix(obj.timestamp / 1000).format('MMMM Do YYYY, h:mm:ss a');
      });

      res.render('newevent', {
        title: results.body["titles"],
        content: results.body["desc"],
        responses: events.body.results
      });
    });
  });
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
       successRedirect : '/',
       failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });


//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  var name = req.user.displayName;
  console.log("Logged out " + name + " with ID: " + req.user.id);
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

//====================================


//===============PORT=================
var port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on " + port + "!");
