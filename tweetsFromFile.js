/*jshint esversion:6*/
const fs = require('fs'),
      arrLib = require('./array-lib');

fs.readFile('tweets.json', 'utf8', (err, data) => {
  if(err) throw err;
  var users = JSON.parse(data).statuses.map((stat) => { return stat.user; });
  var usernames = users.map((user) => { return user.screen_name; });
  var filtered = users.filter((user) => { return user.followers_count <= 50; });
  var filteredUsernames = filtered.map((user) => { return user.screen_name; });
    console.log(JSON.stringify(users[0]));

});
