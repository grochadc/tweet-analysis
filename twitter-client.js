/*jshint esversion: 6 */
var Twitter = require('twitter');
var arrayLib = require('./array-lib');

var client = new Twitter({
  consumer_key : "Mgxg8DhBAew5jAO7tHq6YUEvc",
  consumer_secret : "EJHDT94LfOkIRd8i0fXEMqHMWKwXaj0MHSrO1TDWr638KHXPWM",
  bearer_token : "AAAAAAAAAAAAAAAAAAAAAO9E5QAAAAAAtruBYppeb3d%2FzO2weWUgCfQ7Xdc%3D9wVEVNix8RRRq2JxoDdoYj6scjYzQSs6P1iXXatXsVxNPF6EtL"
});

client.get('search/tweets', {q: 'yomero', count: 100}, function(error, data, response) {
  if(error) throw error;

  var users = data.statuses.map((stat) => { return stat.user; });
  var lowFollowersCount = users.filter((user) => { return user.followers_count <= 50; });
  var usernames = lowFollowersCount.map((user) => { return user.screen_name; });
  var repeatedUsers = arrayLib.repeated(usernames);

  console.log(repeatedUsers);
  console.log('Search returned ',data.statuses.length, ' tweets');
});
