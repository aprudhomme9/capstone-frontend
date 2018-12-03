import React, {Component} from 'react';
import {Button, Card, Image, Grid} from 'semantic-ui-react';
import './styles.css';

const serverUrl = 'http://localhost:5000/'
class DisplayMovie extends Component{
	constructor(){
		super()

	}
	addToFavorites = async (e) => {
		e.preventDefault();
		const movieToAdd = await fetch(serverUrl + 'api/movies/movie/add/' + this.props.movie._id);
		const parsedMovie = await movieToAdd.json();
		const userId = this.props.user._id
;		const userToEdit = await fetch(serverUrl + 'api/users/' + userId, {credentials: 'include'});
		
		const parsedUser = await userToEdit.json();
		const newMovieArray = parsedUser.data.favoriteMovies.filter((movie) => {
				if(movie._id !== parsedMovie.data._id){
					return movie
				}
		})
		
		newMovieArray.push(parsedMovie.data);

		const updatedUser = await fetch(serverUrl + 'api/users/' + userId, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				favoriteMovies: newMovieArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
	render(){
		console.log(this.props.movie, '<---MOVIE WITH PROPERTIES');
		return(
			<div>
				<div className='back'>
					<Button onClick={this.props.toggleView}>Back</Button>
				</div>
				<div className='card'>
					<Card>
	   					<Image height="400" width="300" src={this.props.movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{this.props.movie.title}</Card.Header>
	      					<Card.Description>{this.props.movie.description}</Card.Description>
	    				</Card.Content>
	    				<Card.Content extra>
	    					<p>{this.props.movie.runTime}</p>
	      					<p>IMDB Rating: {this.props.movie.imdbRating}</p>
	      					<p>Actors: {this.props.movie.actors}</p>
	    				</Card.Content>
	 				</Card>
	 			</div>	
	 			
 				<Button onClick={this.addToFavorites}>Favorite</Button>
 			
      			<Button>Add to Watchlist</Button>
      			<Button>Recommend</Button>			
			</div>


			)
	}
}





export default DisplayMovie