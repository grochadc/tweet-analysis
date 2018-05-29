/*jshint esversion:6*/

var Twitter = require('twitter');
var fs = require('fs');

var client = new Twitter({
  consumer_key : "Mgxg8DhBAew5jAO7tHq6YUEvc",
  consumer_secret : "EJHDT94LfOkIRd8i0fXEMqHMWKwXaj0MHSrO1TDWr638KHXPWM",
  bearer_token : "AAAAAAAAAAAAAAAAAAAAAO9E5QAAAAAAtruBYppeb3d%2FzO2weWUgCfQ7Xdc%3D9wVEVNix8RRRq2JxoDdoYj6scjYzQSs6P1iXXatXsVxNPF6EtL"
});

client.get('search/tweets', {q: "yo mero", count: 20 }, (err, data, response) => {
  if(err) throw err;
  fs.writeFile('tweets.json', JSON.stringify(data), (err) => {
    if(err) throw err;
    console.log('file saved');
  });
});
