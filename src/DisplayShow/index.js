import React, {Component} from 'react';
import {Card, Image, Button, Grid, Modal, Header, Dropdown} from 'semantic-ui-react';
import './styles.css';
import serverUrl from '../apiUrl';
// const serverUrl = 'https://watch-with-friends-express.herokuapp.com/' || 'http://localhost:5000/'

class DisplayShow extends Component{
	constructor(){
		super()

		this.state = {
			groups: [],
			groupId: '',
			recOpen: false,
			open: false,
			userId: '',
			users: []
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
		
			this.toggleRecModal();
		this.props.toggleView();
		const showToAdd = this.props.show;

		const activeUser = this.props.user.username;
		const userToEdit = await fetch(serverUrl + 'api/users/' + this.state.userId, {credentials: 'include'});

		const parsedUser = await userToEdit.json();
		
		const createdRec = await fetch(serverUrl + 'api/showrecs', {
			method: 'POST',
			body: JSON.stringify({
				showTitle: showToAdd.title,
				author: activeUser
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const parsedRec = await createdRec.json();
		console.log(parsedRec, '<---PARSED REC');
		const recArray = parsedUser.data.showRecommendations;
		recArray.push(parsedRec.data);
		const editedUser = await fetch(serverUrl + 'api/users/' + this.state.userId, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				showRecommendations: recArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedEditUser = await editedUser.json();
		

		
		

	}
	handleSubmit = async () => {
		const showToAdd = await fetch(serverUrl + 'api/shows/show/add/' + this.props.show._id);
		const parsedShow = await showToAdd.json();

		const groupToEdit = await fetch(serverUrl + 'api/groups/' + this.state.groupId);
		const parsedGroupToEdit = await groupToEdit.json();

		const groupShows = parsedGroupToEdit.data.popularShows;

		const newArray = groupShows.filter((show) => {
			if(show._id !== parsedShow.data._id){
				return show
			}
		})
		newArray.push(parsedShow.data);
		console.log(newArray, '<----NEW ARRAY');
		const editGroup = await fetch(serverUrl + 'api/groups/' + this.state.groupId, {
			method: 'PUT',
			body: JSON.stringify({
				popularShows: newArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}

		})
		const parsedEditGroup = await editGroup.json();

		this.closeModal();
		this.props.toggleView();
		
	}
	toggleRecModal = () => {
		this.setState({
			recOpen: !this.state.recOpen
		})
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
	fetchUsers = async () => {
		const allUsers = await fetch(serverUrl + 'api/users/all');
		const parsedUsers = await allUsers.json();
		return parsedUsers
	}
	fetchGroups = async () => {
		const allGroups = await fetch(serverUrl + 'api/groups');
		const parsedGroups = await allGroups.json();
		return parsedGroups
	}
	addToFavorites = async (e) => {
		if(this.props.user){
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
		
		this.props.toggleView();
	}
	addToWatchlist = async (e) => {
		if(this.props.user){
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
		const numberAdds = parsedShow.data.adds + 1;
		console.log(numberAdds);
		const updatedshow = await fetch(serverUrl + 'api/shows/show/' + this.props.show._id, {
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
		
		// console.log(updatedUser.data);
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
				<Modal open={this.state.recOpen}>
				<Modal.Content>
					<p className="close" onClick={this.toggleRecModal}>+</p>
					<Dropdown onChange={this.handleRecChange} clearable fluid search selection placeholder='Select User' fluid selection options={userOptions} />
					<Button onClick={this.handleRecSubmit}>Submit</Button>
				</Modal.Content>
				</Modal>
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
	 			<div className='buttonGroup'>
 				<Button onClick={this.addToFavorites}>Favorite</Button>
 			
      			<Button onClick={this.addToWatchlist}>Add to Watchlist</Button>
      			<Button onClick={this.openModal}>Add to Group</Button>
      			<Button onClick={this.toggleRecModal}>Recommend</Button>		
      			</div>	
			</div>


			)
	}
}




export default DisplayShow