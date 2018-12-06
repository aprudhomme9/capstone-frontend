import React, {Component} from 'react';
import {Grid, Column, Button, Card, Image} from 'semantic-ui-react';

import serverUrl from '../apiUrl';
// const serverUrl = 'http://localhost:5000/'

class MovieList extends Component{
	constructor(){
		super()
	}
	toggleView = async (e) => {
		console.log(e.currentTarget, '<---ID CLICKIINNG');
		const selectedMovie = await fetch(serverUrl + 'api/movies/movie/' + e.currentTarget.id);
		const parsedMovie = await selectedMovie.json();

		this.props.toggleView(parsedMovie.data);
	}
	render(){
			const moviePosters = this.props.movies.map((movie, i) => {
			console.log(movie.imdbID);
			if(movie.imageUrl == 'N/A'){
				return (
						<Card id={movie.imdbID} onClick={this.toggleView}>
	   						<Image src='https://bighugelabs.com/img/poster-light.jpg' />
	   						<Card.Content>
	      						<Card.Header>{movie.title}</Card.Header>
	    					</Card.Content>
	 					</Card>

				)
			} else {
				return (
						<Card onClick={this.toggleView} id={movie.imdbID}>
	   						<Image src={movie.imageUrl} />
	   						<Card.Content>
	      						<Card.Header>{movie.title}</Card.Header>
	    					</Card.Content>
	 					</Card>
				)
			}
			
		})
		return(
			<Grid>
				<Grid.Row textAlign='center'>
						<Grid.Column width={16}>
							<Card.Group itemsPerRow={5}>
							{moviePosters}
							</Card.Group>
						</Grid.Column>
					</Grid.Row>
			</Grid>
			)
	}
}

export default MovieList