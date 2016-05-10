var config = require('./config.json'), //config file contains all tokens and other private info
db = require('orchestrate')(config.db),
moment = require('moment'); //config.db holds Orchestrate token

exports.getEvent = function(req, res) {
  var arr = [];
  //var offset = req.param("page") ? (req.param("page") - 1) * 10 : 0;
  db.newSearchBuilder()
  .collection('Event')
  .limit(100)
  .query('*')
  .then(function (events){
      for(i=0; i < 100; i++){

        var title = events.body.results[i]["value"].titles;
        var date = events.body.results[i]["value"].datum;
        var creator = events.body.results[i]["value"].creator;
        //var attendants = events.body.results[i]["values"].attendants;
        var result = title + '\n' + date + '\n' + 'Created by ' + creator;

        arr.push(result);
        arr.toString();

        res.render('home', {user: req.user, title: arr});

      }

    });
};

exports.postTopic = function(req, res) {
var title = req.param("title")
, subject = req.param("subject")
, date = moment().format('MMMM Do YYYY, h:mm:ss a')
, datum =req.param("datum")
, min = req.param("min")
, max = req.param("max")
, start = req.param("start")
, end = req.param("end")

db.post('Event', {
  "titles" : title,
  "desc" : subject,
  "date" : date,
  "min" : min,
  "max" : max,
  "datum" : datum,
  "start" : start,
  "end" : end

})
.then(function (result) {
  var responseKey = result.headers.location.split("/")[3];
  res.redirect('/');
})
.fail(function (err) {
});
};

exports.getTopic = function(req, res) {
  db.search('Event', '114f1a182002babf')
  .then(function (events) {
    res.render('infoEvent', {
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
