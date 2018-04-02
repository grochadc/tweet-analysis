/* Make a request to get a Bearer token from Twitter API */
var request = require('request');

var consumer_key= process.env.CONSUMER_KEY;
var consumer_secret= process.env.CONSUMER_SECRET;

var encoded = new Buffer(consumer_key+':'+consumer_secret).toString('base64');

request.post({
  headers: {'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic '+ encoded},
  url:     'https://api.twitter.com/oauth2/token',
  body:    "grant_type=client_credentials"
}, function(error, response, body){
  console.log(JSON.parse(body).access_token);
});
