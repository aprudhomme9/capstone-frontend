import React, {Component} from 'react';
import {Button, Card, Image, Grid, Modal, Header, Dropdown} from 'semantic-ui-react';
import './styles.css';

const serverUrl = 'http://localhost:5000/'
class DisplayMovie extends Component{
	constructor(){
		super()
		this.state = {
			open: false,
			groups: [],
			groupId: ''
		}
	}
	handleChange = (e, data) => {
		e.preventDefault();
		console.log(data);
		const option = data.options.filter((option) => {
			return option.value === data.value
		})
		console.log(option[0]);
		const id = option[0].key;
		
		this.setState({
			groupId: id
		})

	}
	handleSubmit = async () => {
		const movieToAdd = await fetch(serverUrl + 'api/movies/movie/add/' + this.props.movie._id);
		const parsedMovie = await movieToAdd.json();

		const groupToEdit = await fetch(serverUrl + 'api/groups/' + this.state.groupId);
		const parsedGroupToEdit = await groupToEdit.json();

		const groupMovies = parsedGroupToEdit.data.popularMovies;

		const newArray = groupMovies.filter((movie) => {
			if(movie._id !== parsedMovie.data._id){
				return movie
			}
		})
		newArray.push(parsedMovie.data);
		console.log(newArray, '<----NEW ARRAY');
		const editGroup = await fetch(serverUrl + 'api/groups/' + this.state.groupId, {
			method: 'PUT',
			body: JSON.stringify({
				popularMovies: newArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}

		})
		const parsedEditGroup = await editGroup.json();
		console.log(parsedEditGroup.data);
		this.closeModal();
		this.props.toggleView();
	}
	openModal = async (e) => {
		e.preventDefault();
		this.setState({
			open: true
		})

	}
	closeModal = async () => {
		this.setState({
			open: false
		})
	}
	fetchGroups = async () => {
		const allGroups = await fetch(serverUrl + 'api/groups');
		const parsedGroups = await allGroups.json();
		return parsedGroups
	}
	addToFavorites = async (e) => {
		if(this.props.user){
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
		const numberFavorites = parsedMovie.data.favorites + 1;
		const updatedMovie = await fetch(serverUrl + 'api/movies/movie/' + this.props.movie._id, {
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
		
		this.props.toggleView();
	}
	addToWatchlist = async (e) => {
		if(this.props.user){
			e.preventDefault();
		const movieToAdd = await fetch(serverUrl + 'api/movies/movie/add/' + this.props.movie._id);
		const parsedMovie = await movieToAdd.json();
		const userId = this.props.user._id;
		const userToEdit = await fetch(serverUrl + 'api/users/' + userId, {credentials: 'include'});
		
		const parsedUser = await userToEdit.json();
		const newMovieArray = parsedUser.data.watchListMovies.filter((movie) => {
				if(movie._id !== parsedMovie.data._id){
					return movie
				}
		})
		
		newMovieArray.push(parsedMovie.data);
		console.log(newMovieArray, '<--WATCHLIST');
		const updatedUser = await fetch(serverUrl + 'api/users/' + userId, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				watchListMovies: newMovieArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const numberAdds = parsedMovie.data.adds + 1;
		const updatedMovie = await fetch(serverUrl + 'api/movies/movie/' + this.props.movie._id, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				adds: numberAdds
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		}
		
		this.props.toggleView();
	}
	componentDidMount(){
		this.fetchGroups().then((groups) => {
			this.setState({
				groups: groups.data
			})
		})
	}
	render(){
		const groupOptions = this.state.groups.map((group) => {
			return {key: group._id, value: group.name, text: group.name}

		})

		return(
			<div>
				<Modal open={this.state.open}>
				<Header>Add to Group</Header>
				<Modal.Content>
					<p className="close" onClick={this.closeModal}>+</p>
					<Dropdown onChange={this.handleChange} clearable fluid search selection placeholder='Select Group' fluid selection options={groupOptions}/>
					<Button onClick={this.handleSubmit}>Submit</Button>
				</Modal.Content>
				</Modal>
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
	      					<p>{this.props.movie.genre}</p>
	      					<p>Actors: {this.props.movie.actors}</p>
	    				</Card.Content>
	 				</Card>
	 			</div>	
	 			<div className='buttonGroup'>
 					<Button onClick={this.addToFavorites}>Favorite</Button>
 			
      				<Button onClick={this.addToWatchlist}>Add to Watchlist</Button>
      				<Button onClick={this.openModal}>Add to Group</Button>	
      			</div>		
			</div>


			)
	}
}





export default DisplayMovie