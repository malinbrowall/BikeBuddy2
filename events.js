var config = require('./config.json'), //config file contains all tokens and other private info
db = require('orchestrate')(config.db),
moment = require('moment'); //config.db holds Orchestrate token

//Get key from event.
exports.getKey = function(req, res){
  var arrKey = [];
  db.newSearchBuilder()
  .collection('Event')
  .limit(100)
  .query('*')
  .then(function (events){
      for(i=0; i < 100; i++){
        var key = events.body.results[i].path.key;
        arrKey.push(key);
        arrKey.toString();
        console.log(arrKey);
      }

    });
};
//Get title, date, creator from event.
exports.getEvent = function(req, res) {
  var arr = [];
  var arrKey = [];
  db.newSearchBuilder()
  .collection('Event')
  .limit(100)
  .query('*')
  .then(function (events){
      for(i=0; i < 100; i++){

        var title = events.body.results[i]["value"].titles;
        var date = events.body.results[i]["value"].datum;
        var creator = events.body.results[i]["value"].creator;
        var attend = events.body.results[i]["value"].attendants;
        var key = events.body.results[i].path.key;

        var result = title + '\n' + date + '\n' + 'Created by: ' + creator + '\n' + 'Attending: ' + attend;

        arr.push(result);
        arrKey.push(key);

        arr.toString();
        arrKey.toString();

        res.render('home', {user: req.user, title: arr, key: arrKey});

      }

    });
};
//Get everything from events database.
exports.getTopic = function(req, res) {
  console.log("hjedfdffd");
  db.newSearchBuilder()
  .collection('Event')
  .query(req.param("id"))
  .then(function(events){

      events.body.results.forEach(function (obj, index){
      events.body.results[index].titles;

      res.render('infoEvent', {
       user: req.user,
       users: events.body.results,
       title: events.body.results[index]["value"].titles,
       desc: events.body.results[index]["value"].desc,
       date: events.body.results[index]["value"].date,
       min: events.body.results[index]["value"].min,
       max: events.body.results[index]["value"].max,
       start: events.body.results[index]["value"].start,
       end: events.body.results[index]["value"].end,
       creator: events.body.results[index]["value"].creator
     });
    });
})
  .fail(function (err) {
    console.log(err); // prints error
  });
};
