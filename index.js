/*jshint esversion: 6 */

var request = require('request');
const token = process.env.BEARER_TOKEN;
const query = process.argv[2];
const count = process.argv[3] ? process.argv[3] : 10;

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

  console.log(filterObj(iteratedUsers));
  console.log('API returned ',tweets.length, ' tweets');


  function filterObj(obj){
      Object.keys(obj).forEach((key) => {
        if(obj[key]==1) delete obj[key];
      });
      return obj;
    }
});
