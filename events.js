
var config = require('./config.json'), //config file contains all tokens and other private info
db = require('orchestrate')(config.db); //config.db holds Orchestrate token


exports.getEvent = function(req, res) {
  var arr = [];
  db.list('Event', 'Bikebuddy')
    .then(function (events){
      for(i=0; i < 100; i++){

        var title = events.body.results[i]["value"].titles;
        var desc = events.body.results[i]["value"].desc;
        var date = events.body.results[i]["value"].date;

        var result = title + '\n' + desc + '\n' + date;

        arr.push(result);
        arr.toString();

        res.render('home', {user: req.user, title: arr});
      }
    });

};


exports.addEvent = function() {
  db.post('Event',{
    "title": "Test"
  });
};
