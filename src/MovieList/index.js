import React, {Component} from 'react';

const serverUrl = 'http://localhost:5000/'

class MovieList extends Component{
	constructor(){
		super()
	}
	toggleView = async (e) => {
		const selectedMovie = await fetch(serverUrl + 'api/movies/movie/' + e.currentTarget.id);
		const parsedMovie = await selectedMovie.json();

		this.props.toggleView(parsedMovie.data);
	}
	render(){
			const moviePosters = this.props.movies.map((movie, i) => {
			console.log(movie.imdbID);
			if(movie.imageUrl == 'N/A'){
				return (
					<div>
						<br/>
						<h4>{movie.title}</h4>
						<br/>
						<img id={movie.imdbID} onClick={this.toggleView} height="400" width="300" key={i} src='https://bighugelabs.com/img/poster-light.jpg'/>
					</div>
				)
			} else {
				return (
					<div>
						<br/>
						<h4>{movie.title}</h4>
						<br/>
						<img id={movie.imdbID} onClick={this.toggleView} height="400" width="300" key={i} src={movie.imageUrl}/>
					</div>
				)
			}
			
		})
		return(
			<div>
				{moviePosters}
			</div>
			)
	}
}

export default MovieList