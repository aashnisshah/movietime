var settings = {
	api_key: '',
	base_url: 'https://api.themoviedb.org/3/movie/'
}

document.addEventListener('DOMContentLoaded', function() {
	// get the movies
	var movies = get_movies();

	// select a random movie from the list
	var selected = select_random_movie(movies);

	// display the movies information
	if(selected == null) {
		// display an error message
	} else {
		// display movie information
		console.log('selected movie: ', selected);
	}
});

function get_movies() {
	function GET(url) {
		var Httpreq = new XMLHttpRequest();
		Httpreq.open("Get", url, false);
		Httpreq.send(null);
		return Httpreq.responseText;
	}

	var url = generate_url('now_playing');
	var nowPlayingMovies = GET(url);
	var json_obj = JSON.parse(nowPlayingMovies);
	return json_obj;
}

function generate_url(type) {
	return settings.base_url + type + '?api_key=' + settings.api_key;
}

function select_random_movie(movies) {
	var num_movies = movies.results.length;
	if(num_movies == 0) {
		return null;
	}

	selected_movie_num = Math.floor(Math.random() * (num_movies + 1));

	return movies.results[selected_movie_num];

}