var config = require('./config.json'), //config file contains all tokens and other private info
db = require('orchestrate')(config.db); //config.db holds Orchestrate token

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
exports.addEvent = function() {
  db.post('Event',{
    "title": "Test"
  });
};
