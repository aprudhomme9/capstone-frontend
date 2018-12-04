import React, {Component} from 'react';
import {Card, Group, Image, Icon} from 'semantic-ui-react';
import ProfileContainer from '../ProfileContainer';

const serverUrl = 'http://localhost:5000/'

class FriendContainer extends Component{
	constructor(){
		super()

		this.state = {
			users: [],
			viewProfile: false,
			userToView: '',
			ableToEdit: false
		}
	}
	fetchUsers = async () => {
		const allUsers = await fetch(serverUrl + 'api/users/all', {credentials: 'include'});

		const parsedUsers = await allUsers.json();

		return parsedUsers	
	}
	fetchTargetUser = async (id) => {
		const targetUser = await fetch(serverUrl + 'api/users/' + id);
		const parsedUser = await targetUser.json();
		return parsedUser
	}
	handleClick = (e) => {
		console.log(e.currentTarget.id);
		this.fetchTargetUser(e.currentTarget.id).then((user) => {
			this.setState({
				viewProfile: true,
				userToView: user.data
			})
		})
	}
	componentDidMount(){
		this.fetchUsers().then((users) => {
			this.setState({
				users: users.data
			})
		})
	}
	render(){
		console.log(this.state.userToView, '<---USER TO VIEW');
		const extra = (
				<div>
					<a>
					<Icon name='user'/>
					</a>
				</div>
			)
		const userList = this.state.users.map((user) => {
			const favorites = 'Favorites: ' + (user.favoriteShows.length + user.favoriteMovies.length);
			return(
				<Card id={user._id} onClick={this.handleClick}
    				image='https://www.mashtraxx.com/static/images/generic-user.png'
    				header={user.username}
    				meta='Friend'
    				description={favorites}
    				extra={extra}
  				/>
				)
		})
		return(
			<div>
			{this.state.viewProfile ? <ProfileContainer ableToEdit={this.state.ableToEdit} user={this.state.userToView} /> :
			<div>
				<h1>Movie Buds</h1>
				<Card.Group itemsPerRow={5}>
					{userList}
				</Card.Group>
			</div>
			}
			</div>
			)
	}
}


export default FriendContainer