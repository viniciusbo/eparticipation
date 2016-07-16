var MongoClient = require('mongodb').MongoClient;
var app = require('./app');

function onTweet(db, tweet, category) {
  tweet._category = category;
  db.collection('dataset01').insert(tweet);
  console.log(tweet, category);
}

function onAppStart() {
  console.log('App started on port 8789');
}

MongoClient.connect('mongodb://127.0.0.1:27017/eparticipation', function onDbConnect(err, db) {
  if (err)
    return console.error(err);

  app.listen(8789, onAppStart);
});