var config = require('./config.json'), //config file contains all tokens and other private info
db = require('orchestrate')(config.db),
moment = require('moment'); //config.db holds Orchestrate token

exports.getEvent = function(req, res) {
  var arr = [];
  db.newSearchBuilder()
  .collection('Event')
  .limit(100)
  .query('*')
  .then(function (events){
      for(i=0; i < 100; i++){

        var title = events.body.results[i]["value"].titles;
        var date = events.body.results[i]["value"].datum;
        var creator = events.body.results[i]["value"].creator;
        var result = title + '\n' + date + '\n' + 'Created by ' + creator;

        arr.push(result);
        arr.toString();

        res.render('home', {user: req.user, title: arr});

      }

    });
};

var getKey = function(req, res){
  var key
  db.list('Event')
  .then(function(key){
    res.render('infoEvent', {
    key: key.body.results[0].path.key
  });
});
}

exports.getTopic = function(req, res) {
  db.list('Event')
  .then(function (events) {
    res.render('infoEvent', {
     key : events.body.results[0].path.key,
     user: req.user,
     users: events.body.results,
     title: events.body.results[0]["value"].titles,
     desc: events.body.results[0]["value"].desc,
     date: events.body.results[0]["value"].date,
     min: events.body.results[0]["value"].min,
     max: events.body.results[0]["value"].max,
     start: events.body.results[0]["value"].start,
     end: events.body.results[0]["value"].end,
     creator: events.body.results[0]["value"].creator
 });
    console.log(users);
   // prints matched users
  })
  .fail(function (err) {
    console.log(err); // prints error
  });
};
