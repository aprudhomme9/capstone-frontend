import React, {Component} from 'react';
import {Card, Image, Button, Grid, Modal, Header, Dropdown} from 'semantic-ui-react';
import './styles.css';

const serverUrl = 'http://localhost:5000/';

class DisplayShow extends Component{
	constructor(){
		super()

		this.state = {
			groups: [],
			groupId: '',

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
      			</div>	
			</div>


			)
	}
}




export default DisplayShow