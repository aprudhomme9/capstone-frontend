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
	handleClick = (e) => {
		e.preventDefault();
		console.log(e.currentTarget.id);
	}
	render(){ 
		const moviePosters = this.props.movies.map((movie, i) => {
			console.log(movie.imdbID);
			if(movie.imageUrl == 'N/A'){
				return (
					<div>
						<br/>
						<h4 onClick={this.handleClick}>{movie.title}</h4>
						<br/>
						<img id={movie.imdbID} onClick={this.handleClick} height="400" width="300" key={i} src='https://bighugelabs.com/img/poster-light.jpg'/>
					</div>
				)
			} else {
				return (
					<div>
						<br/>
						<h4>{movie.title}</h4>
						<br/>
						<img id={movie.imdbID} onClick={this.handleClick} height="400" width="300" key={i} src={movie.imageUrl}/>
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

export default MovieContainer;