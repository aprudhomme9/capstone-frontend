import React, {Component} from 'react';
import SearchContainer from '../SearchContainer';
import MovieList from '../MovieList';
import DisplayMovie from '../DisplayMovie';
const serverUrl = 'http://localhost:5000/'
class MovieContainer extends Component {
	constructor(){
		super();

		this.state = {
			movieToDisplay: '',
			showMovie: false
		}
	}
	toggleView = (movie) => {
		this.setState({
			showMovie: !this.state.showMovie,
			movieToDisplay: movie
		})
	}

	render(){ 
		return(
			<div>
				{this.state.showMovie ? <DisplayMovie movie={this.state.movieToDisplay} toggleView={this.toggleView} /> :

					<MovieList toggleView={this.toggleView} movies={this.props.movies}/>

				}			

			</div>


			)
		
	}
}

export default MovieContainer;