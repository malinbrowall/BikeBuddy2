
var config = require('./config.json'), //config file contains all tokens and other private info
db = require('orchestrate')(config.db); //config.db holds Orchestrate token


exports.getEvent = function(req, res) {

  db.newSearchBuilder()
    .collection('Event')
    .limit(10)
    .query('*')
    .then(function (topics){
      res.render('home', { title: 'Express', topics: topics.body.results, totalCount: topics.body.total_count});
    });
};


exports.addEvent = function() {
  db.post('Event',{
    "title": "Test"
  });
};
