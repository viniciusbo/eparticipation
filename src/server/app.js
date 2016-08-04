var express = require('express');
var Twitter = require('node-tweet-stream');
var celery = require('node-celery');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var celery = celery.createClient({
  CELERY_BROKER_URL: 'amqp://guest@localhost//',
  CELERY_RESULT_BACKEND: 'amqp'
});

initApp();
connectToCeleryJobQueue();

function initApp() {
  app.set('view options', { layout: false })
  app.use('/static', express.static(path.join(__dirname, '../client/public')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './views/index.html'));
  });
}

function connectToCeleryJobQueue() {
  celery.on('connect', connectToTwitterStream);
}

function connectToTwitterStream() {
  var twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  twitter.trackMultiple(['sao paulo', 'sp', 'rio de janeiro', 'rj']);
  twitter.language('pt');
  twitter.on('tweet', onNewTweet);
}

function onNewTweet(tweet) {
  if (!tweet || !tweet.text || tweet.text.indexOf('RT @') > -1 || tweet.text.indexOf('@') === 0)
    return;

  // console.log('Running classification...');
  runTextClassificationJob(tweet);
}

function runTextClassificationJob(tweet, cb) {
  var result = celery.call('textclf.classificate', [tweet.text]);
  result.on('ready', onClassificate(tweet));
}

function onClassificate(tweet) {
  return function onJobReady(message) {
    // console.log(tweet.text, message.result);
    io.emit('tweet', tweet, message.result);
    app.emit('tweet', tweet, message.result);
  }
}

module.exports = server;