Meteor.publish('movieSearch', function(query){
	var self = this;

	var MovieDB_api_key = '429786154f78086f6eeb4a97262020f5';
	// var RottenTomatoes_API_KEY = '5hfg9rrab5bz452mbjhq6566';
	
	try{
		var apiUrl = 'http://api.themoviedb.org/3/search/movie?api_key=' + MovieDB_api_key + '&query=' + query;
		// var apiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=' + RottenTomatoes_API_KEY + '&query=' + query;
		var response = HTTP.get(apiUrl).data;
		// console.log(response);

		// this is using the movieDB api:
		_.each(response.results, function(result){
			var doc = {
				id: result.id,
				title: result.title,
				overview: result.overview,
				poster: result.poster_path,
				releaseDate: result.release_date
			};
			self.added('movies', Random.id(), doc);
		});

		// this is using the rottenttomatoes api:
		// _.each(response.results, function(result){
		// 	var doc = {
		// 		id: result.id,
		// 		title: result.title,
		// 		synopsis: result.synopsis,
		// 		poster: result.backdrop_path,
		// 		year: result.year
		// 	};
		// 	self.added('movies', Random.id(), doc);
		// });

		self.ready();

	}catch(error){
		console.log(error);
	}
});

Meteor.publish('movieReleases', function(){
	var self = this;

	var MovieDB_api_key = '429786154f78086f6eeb4a97262020f5';

	try{
		var newreleaseUrl = 'http://api.themoviedb.org/3/movie/now_playing?api_key=' + MovieDB_api_key;
		var response = HTTP.get(newreleaseUrl).data;

		_.each(response.results, function(result){
			var doc = {
				id: result.id,
				title: result.title,
				overview: result.overview,
				poster: result.poster_path,
				releaseDate: result.release_date
			};
			self.added('movies', Random.id(), doc);
		});

		self.ready();
	}catch(error){
		console.log(error);
	}
});

