import React, {Component} from 'react';
import {Button, Card, Image, Grid, Modal, Header, Dropdown} from 'semantic-ui-react';
import './styles.css';

const serverUrl = 'http://localhost:5000/'
class DisplayMovie extends Component{
	constructor(){
		super()
		this.state = {
			open: false,
			recOpen: false,
			users: [],
			groups: [],
			groupId: '',
			userId: ''
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
	handleRecChange = (e, data) => {
		e.preventDefault();
		const option = data.options.filter((option) => {
			return option.value === data.value
		})
		const userId = option[0].key;
		this.setState({
			userId: userId
		})
	}
	handleRecSubmit = async () => {
		console.log('HANDLINGGGGGGGGGGGGG');
		if(this.props.user){
			this.toggleRecModal();
		this.props.toggleView();
		const movieToAdd = this.props.movie;

		const activeUser = this.props.user.username;
		const userToEdit = await fetch(serverUrl + 'api/users/' + this.state.userId, {credentials: 'include'});

		const parsedUser = await userToEdit.json();
		console.log(parsedUser.data, '<---USER TO EDIT');
		console.log(movieToAdd.title, '<-----MOVIE TO ADD');
		const createdRec = await fetch(serverUrl + 'api/recs', {
			method: 'POST',
			body: JSON.stringify({
				movieTitle: movieToAdd.title,
				author: activeUser,
				type: 'movie'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const parsedRec = await createdRec.json();
		const recArray = parsedUser.data.recommendations;
		recArray.push(parsedRec.data);
		const editedUser = await fetch(serverUrl + 'api/users/' + this.state.userId, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				recommendations: recArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedEditUser = await editedUser.json();
		
		}
		
		

	}
	handleSubmit = async () => {
		const movieToAdd = this.props.movie

		const groupToEdit = await fetch(serverUrl + 'api/groups/' + this.state.groupId);
		const parsedGroupToEdit = await groupToEdit.json();

		const groupMovies = parsedGroupToEdit.data.popularMovies;

		const newArray = groupMovies.filter((movie) => {
			if(movie._id !== movieToAdd._id){
				return movie
			}
		})
		newArray.push(movieToAdd);
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
		this.toggleModal();
		this.props.toggleView();
	}
	toggleRecModal = () => {
		this.setState({
			recOpen: !this.state.recOpen
		})
	}
	
	toggleModal = async (e) => {
		this.setState({
			open: !this.state.open
		})

	}
	fetchGroups = async () => {
		const allGroups = await fetch(serverUrl + 'api/groups');
		const parsedGroups = await allGroups.json();
		return parsedGroups
	}
	fetchUsers = async () => {
		const allUsers = await fetch(serverUrl + 'api/users/all');
		const parsedUsers = await allUsers.json();
		return parsedUsers
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
		this.fetchUsers().then((users) => {
			this.setState({
				users: users.data
			})
		})
	}
	render(){
		const groupOptions = this.state.groups.map((group) => {
			return {key: group._id, value: group.name, text: group.name}

		})
		const userOptions = this.state.users.map((user) => {
			return {key: user._id, value: user.username, text: user.username}
		})
		return(
			<div>
				<Modal open={this.state.open}>
				<Header>Add to Group</Header>
				<Modal.Content>
					<p className="close" onClick={this.toggleModal}>+</p>
					<Dropdown onChange={this.handleChange} clearable fluid search selection placeholder='Select Group' fluid selection options={groupOptions}/>
					<Button onClick={this.handleSubmit}>Submit</Button>
				</Modal.Content>
				</Modal>
				<Modal open={this.state.recOpen}>
				<Header>Select User</Header>
				<Modal.Content>
					<p className="close" onClick={this.toggleRecModal}>+</p>
					<Dropdown onChange={this.handleRecChange} clearable fluid search selection placeholder='Select User' fluid selection options={userOptions}/>
					<Button onClick={this.handleRecSubmit}>Submit</Button>
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
      				<Button onClick={this.toggleModal}>Add to Group</Button>
      				<Button onClick={this.toggleRecModal}>Recommend</Button>	
      			</div>		
			</div>


			)
	}
}





export default DisplayMovie