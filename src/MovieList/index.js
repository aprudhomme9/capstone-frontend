import React, {Component} from 'react';
import {Grid, Column, Button} from 'semantic-ui-react';

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
						
						<Grid container columns={1} textAlign='center' style={{height: '100%'}} vertical='middle'>
        					<Grid.Column style={{maxWidth: 450}}>
								<br/>
								<h4>{movie.title}</h4>
								<br/>
								<img id={movie.imdbID} onClick={this.toggleView} height="400" width="300" key={i} src='https://bighugelabs.com/img/poster-light.jpg'/>
							</Grid.Column>
						</Grid>
					</div>
				)
			} else {
				return (
					<div>
						<Grid container columns={1} textAlign='center' vertical='middle' style={{height: '100%'}}>
        					<Grid.Column style={{maxWidth: 450}}>
								<br/>
								<h4>{movie.title}</h4>
								<br/>
								<img id={movie.imdbID} onClick={this.toggleView} height="400" width="300" key={i} src={movie.imageUrl}/>
							</Grid.Column>
						</Grid>
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