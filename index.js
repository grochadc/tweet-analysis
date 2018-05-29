/*jshint esversion: 6 */

var request = require('request');
var path = require('path');
const token = process.env.BEARER_TOKEN;


var express = require('express');
var app = express();
const exphbs = require('express-handlebars');

const viewsPath = path.join(__dirname,'views/');
app.set('views', viewsPath);
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: viewsPath + '/layouts'
}));
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
  console.log('Page requested');
  const query = req.query.q ? req.query.q : yomero;
  const count = req.query.count ? req.query.count : 50;
/*
  const reqAPI = new Promise((resolve, reject) =>{
      request.get({
        headers: {
          'Authorization' : 'Bearer ' + token,
        },
        url : 'https://api.twitter.com/1.1/search/tweets.json?q=%23'+query+'&result_type=recent&count='+count
      }, (err, response, body) => {
        if (err) reject(err);
        var data = {response, body};
        resolve(data);
      });
    })

    .then((data) => {
    var tweets = JSON.parse(data.body).statuses;

    var iteratedUsers = {};

    for(var i in tweets) {
      var tweet = tweets[i];
      var user = tweet.user;

      if(user.followers_count <= 50){
        //Add a counter to the user in the iteratedUsers obj for evey tweet found
        if(iteratedUsers[user.screen_name]){
          iteratedUsers[user.screen_name] = iteratedUsers[user.screen_name] + 1;
        } else {
          iteratedUsers[user.screen_name] = 1;
        }
      }
    }
    */

    var Twitter = require('twitter');

    var client = new Twitter({
      consumer_key : "Mgxg8DhBAew5jAO7tHq6YUEvc",
      consumer_secret : "EJHDT94LfOkIRd8i0fXEMqHMWKwXaj0MHSrO1TDWr638KHXPWM",
      bearer_token : "AAAAAAAAAAAAAAAAAAAAAO9E5QAAAAAAtruBYppeb3d%2FzO2weWUgCfQ7Xdc%3D9wVEVNix8RRRq2JxoDdoYj6scjYzQSs6P1iXXatXsVxNPF6EtL"
    });

    client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
      for(var tweet in tweets){
        console.log(tweet.user.screen_name);
      }
    });

    var filteredUsers = filterObj(iteratedUsers);



    var answerObj = { query, count, filteredUsers };
    console.log(answerObj);
    console.log('API returned ',tweets.length, ' tweets');

    res.render('main', answerObj, (err, html) =>{
      console.log('Rendering...');
      res.send(html);
      console.log('Done!');
    });
  });
});

function filterObj(obj){
    Object.keys(obj).forEach((key) => {
      if(obj[key]==1) delete obj[key];
    });
    return obj;
  }

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
