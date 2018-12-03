import React, {Component} from 'react';
import {Card, Image, Button, Grid} from 'semantic-ui-react';
import './styles.css';

const serverUrl = 'http://localhost:5000/';

class DisplayShow extends Component{
	constructor(){
		super()

	}
	addToFavorites = async (e) => {
		e.preventDefault();
		const showToAdd = await fetch(serverUrl + 'api/shows/show/add/' + this.props.show._id);
		const parsedShow = await showToAdd.json();
		const userId = this.props.user._id
;		const userToEdit = await fetch(serverUrl + 'api/users/' + userId, {credentials: 'include'});
		
		const parsedUser = await userToEdit.json();
		const newShowArray = parsedUser.data.favoriteShows.filter((show) => {
				if(show._id !== parsedShow.data._id){
					return show
				}
		})
		console.log(parsedUser, '<----userToEdit');
		newShowArray.push(parsedShow.data);

		const updatedUser = await fetch(serverUrl + 'api/users/' + userId, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				favoriteShows: newShowArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		console.log(parsedUser.favoriteShows, '<--USER Favorite Shows');
		const numberFavorites = parsedShow.data.favorites + 1;
		console.log(numberFavorites);
		const updatedshow = await fetch(serverUrl + 'api/shows/show/' + this.props.show._id, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				favorites: numberFavorites
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
	addToWatchlist = async (e) => {
		console.log('ADDING TO WATCHLIST');
		e.preventDefault();
		const showToAdd = await fetch(serverUrl + 'api/shows/show/add/' + this.props.show._id);
		const parsedShow = await showToAdd.json();
		const userId = this.props.user._id
;		const userToEdit = await fetch(serverUrl + 'api/users/' + userId, {credentials: 'include'});
		console.log(userToEdit, '<---USER TO EDIT');
		const parsedUser = await userToEdit.json();
		const newShowArray = parsedUser.data.watchListShows.filter((show) => {
				if(show._id !== parsedShow.data._id){
					return show
				}
		})
		
		newShowArray.push(parsedShow.data);
		console.log(newShowArray, '<--WATCHLIST');
		const updatedUser = await fetch(serverUrl + 'api/users/' + userId, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				watchListShows: newShowArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		// console.log(updatedUser.data);
	}
	render(){
		console.log(this.props.show, '<---show WITH PROPERTIES');
		return(
			<div>
				<div className='back'>
					<Button onClick={this.props.toggleView}>Back</Button>
				</div>
				<div className='card'>
					<Card>
	   					<Image height="400" width="300" src={this.props.show.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{this.props.show.title}</Card.Header>
	      					<Card.Description>{this.props.show.description}</Card.Description>
	    				</Card.Content>
	    				<Card.Content extra>
	    					<p>Seasons: {this.props.show.seasons}</p>
	      					<p>IMDB Rating: {this.props.show.imdbRating}</p>
	      					<p>Actors: {this.props.show.actors}</p>
	    				</Card.Content>
	 				</Card>
	 			</div>	
	 			
 				<Button onClick={this.addToFavorites}>Favorite</Button>
 			
      			<Button onClick={this.addToWatchlist}>Add to Watchlist</Button>
      			<Button>Recommend</Button>			
			</div>


			)
	}
}




export default DisplayShow