import React, {Component} from 'react';
import {Card, Group, Button, Icon, Modal, Header} from 'semantic-ui-react';
import ProfileContainer from '../ProfileContainer';
import serverUrl from '../apiUrl';
// const serverUrl = 'https://watch-with-friends-express.herokuapp.com/' || 'http://localhost:5000/'


class GroupMembers extends Component{
	constructor(){
		super()

		this.state = {
			viewProfile: false,
			userToView: '',
			ableToEdit: false
		}
	}
	fetchTargetUser = async (id) => {
		const targetUser = await fetch(serverUrl + 'api/users/' + id);
		const parsedUser = await targetUser.json();
		return parsedUser
	}
	closeModal = () => {
		this.setState({
			viewProfile: false
		})
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
	render(){
		console.log(this.props.group, "<---GROUP FROM PROPS");
		const extra = (
				<div>
					<a>
					<Icon name='user'/>
					</a>
				</div>
			)
		
		const userList = this.props.group.members.map((user) => {
			if(user){
			const favorites = 'Favorites: ' + (user.favoriteShows.length + user.favoriteMovies.length);
			return (
				<Card id={user._id} onClick={this.handleClick}
    				image='https://www.mashtraxx.com/static/images/generic-user.png'
    				header={user.username}
    				meta='Friend'
    				description={favorites}
    				extra={extra}
  				/>
				)
		} else {
			return (
				<h1>error</h1>
				)
		}
		})
		return(
			<div>
			<Modal open={this.state.viewProfile}>
				<Header>{this.state.userToView.username}</Header>
				<Modal.Content>
					<p className="close" onClick={this.closeModal}>+</p>
					<ProfileContainer ableToEdit={this.state.ableToEdit} user={this.state.userToView} />
				</Modal.Content>
			</Modal>
			<div>
				<h3>Group Members</h3>
				<Card.Group itemsPerRow={5}>
					{userList}
				</Card.Group>
			</div>
			</div>

			)
	}
}

export default GroupMembers