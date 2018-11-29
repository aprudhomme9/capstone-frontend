import React, {Component} from 'react';
import SearchContainer from '../SearchContainer';

const serverUrl = 'http://localhost:5000/'
class MovieContainer extends Component {
	constructor(){
		super();

		this.state = {
			movies: []
		}
	}
	fetchMovies = async (search) => {
		try {
			const movies = await fetch(serverUrl + 'api/movies/' + search, {
				credentials: 'include'
			})

			const parsedMovies = await movies.json();
			return parsedMovies
		} catch (err) {
			// res.send(err)
		}
		

	}
	getResults = async (search) => {
		const query = search;
		this.fetchMovies(query).then((movies) => {
			if(movies){
				this.setState({
					movies: movies.data
			})
			}
		})
	}
	render(){ 
		const moviePosters = this.state.movies.map((movie, i) => {
			if(movie.imageUrl == 'N/A'){
				return (
					<div>
						<br/>
						<h4>{movie.title}</h4>
						<br/>
						<img height="400" width="300" key={i} src='https://bighugelabs.com/img/poster-light.jpg'/>
					</div>
				)
			} else {
				return (
					<div>
						<br/>
						<h4>{movie.title}</h4>
						<br/>
						<img height="400" width="300" key={i} src={movie.imageUrl}/>
					</div>
				)
			}
			
		})
		return(
			<div>
				<SearchContainer placeholder='movies' getResults={this.getResults}/>
				{moviePosters}
			</div>
			)
	}
}

export default MovieContainer;