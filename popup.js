var settings = {
	api_key: '',
	base_url: 'https://api.themoviedb.org/3/movie/',
	image_base_url: 'https://image.tmdb.org/t/p/w500',
	video_base_url: 'http://api.themoviedb.org/3/movie/',
	youtube_base_url: 'https://www.youtube.com/watch?v=',
	youtube_embed_base_url: 'https://www.youtube.com/embed/'
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
		update_information(selected);
	}
});

function get_movies() {
	var url = settings.base_url + 'now_playing' + '?api_key=' + settings.api_key;

	var Httpreq = new XMLHttpRequest();
	Httpreq.open("Get", url, false);
	Httpreq.send(null);

	var nowPlayingMovies = Httpreq.responseText;
	var json_obj = JSON.parse(nowPlayingMovies);
	return json_obj;
}

function select_random_movie(movies) {
	var num_movies = movies.results.length;
	if(num_movies == 0) {
		return null;
	}

	selected_movie_num = Math.floor(Math.random() * (num_movies + 1));

	return movies.results[selected_movie_num];

}

function get_youtube_trailer(movie_id) {
	var url = settings.video_base_url + movie_id + '/videos?api_key=' + settings.api_key
	
	var Httpreq = new XMLHttpRequest();
	Httpreq.open("Get", url, false);
	Httpreq.send(null);

	var nowPlayingMovies = Httpreq.responseText;
	var json_obj = JSON.parse(nowPlayingMovies);
	return json_obj;
}

function update_information(movie) {
	var movieName = document.getElementById('movie-name');
	movieName.innerText = movie.title;

	var movieDescription = document.getElementById('movie-description');
	movieDescription.innerText = movie.overview;

	var movieRating = document.getElementById('movie-rating');
	movieRating.innerText = 'Vote Average: ' + movie.vote_average;

	var movieImage = document.getElementById('movie-image');
	movieImage.src = settings.image_base_url + movie.poster_path;

	var youtube_trailer = get_youtube_trailer(movie.id);
	console.log(youtube_trailer);

	var movieImage = document.getElementById('youtube-trailer');
	movieImage.src = settings.youtube_embed_base_url + youtube_trailer.results[0].key;

}