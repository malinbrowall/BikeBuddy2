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

        var result = title + '\n' + date;

        arr.push(result);
        arr.toString();

        res.render('home', {user: req.user, title: arr});
      }
    });
};

exports.postEvent = function(req, res) {
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
  res.redirect('/p/' + responseKey);
})
.fail(function (err) {
});
};

exports.newTopic = function(req, res) {
db.get('Event', req.param("id"))
.then(function (results){
  db.newEventReader()
  .from('Event', req.param("id"))
  .type('post')
  .then(function (events){

    events.body.results.forEach(function (obj, index){
        events.body.results[index].date = moment.unix(obj.timestamp / 1000).format('MMMM Do YYYY, h:mm:ss a');
    });
    res.render('infoEvent', {
      title: results.body["sub-title"],
      content: results.body["sub-dis"],
      responses: events.body.results
    });
  });
});
};
