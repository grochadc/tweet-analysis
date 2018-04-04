/*jshint esversion: 6 */

var request = require('request');
const token = process.env.BEARER_TOKEN;
const query = process.argv[2];
const count = process.argv[3] ? process.argv[3] : 10;
const showTweets = false;

console.log("Querying: ",query);

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
  });

reqAPI.then((data) => {
  var tweets = JSON.parse(data.body).statuses;
  for(var i in tweets) {
    var tweet = tweets[i];
    var user = tweet.user;
    if(user.followers_count =< 50){
      console.log(user.screen_name, user.followers_count+' followers');
    }
    if(showTweets){
      console.log('Tweet number ',i, ':');
      console.log('Username: ', user.screen_name);
      console.log('Verified: ', user.verified);
      console.log('Followers: ', user.followers_count);
      console.log('Created: ', user.created_at);
    }
  }
  console.log('API returned ',tweets.length, ' tweets');
});
