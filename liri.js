var keys = require('./keys.js');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
 
var getMyTweets = function() {
	
	var client = new Twitter(keys.twitterKeys);
 
	var params = {screen_name: 'Yifty08'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    // console.log(tweets);
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log(' ');
	    	console.log(tweets[i].text);
	    }
	  }
	});

}
 
// var spotify = new Spotify({
//   id: <2ef7f3fb97da4b5cb1c3617152b99be0>,
//   secret: <19cb221634bb41abb773d832b32a48ce>
// });
 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });

var getMeMovie = function(movieName) {
	
	request('http://www.omdbapi.com/?t=' + movieName +
	 '&apikey=40e9cece', function (error, response, body) {
		if (!error && response.statusCode == 200) {
	  		
			var jsonData = JSON.parse(body);

	  		console.log('Title: ' + jsonData.Title);
	  		console.log('Year: ' + jsonData.Year);
	  		console.log('Rated: ' + jsonData.Rated);
	  		console.log('Country: ' + jsonData.Country);
	  		console.log('Language: ' + jsonData.Language);
	  		console.log('Actors: ' + jsonData.Actors);
	  		console.log('IMDB Rating: ' + jsonData.imdbRating);
	  		console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
	  		console.log('Plot: ' + jsonData.Plot);
		}
	})
}

fs.readFile('random.txt', 'utf8', function (err,data) {
	if (err) throw err;
	console.log(data);
});

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			getMyTweets();
			break;
		case 'movie-this':
			getMeMovie(functionData);
		default:
			console.log("Liri does not know what that is.");
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);