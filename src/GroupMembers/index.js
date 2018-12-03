import React, {Component} from 'react';
import {Card, Group, Button, Icon} from 'semantic-ui-react';
import ProfileContainer from '../ProfileContainer';

const serverUrl = 'http://localhost:5000/';


class GroupMembers extends Component{
	constructor(){
		super()

		this.state = {
			viewProfile: false,
			userToView: ''
		}
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
			{this.state.viewProfile ? <ProfileContainer user={this.state.userToView} /> :
			<div>
				<h1>GroupMembers</h1>
				<Card.Group itemsPerRow={5}>
					{userList}
				</Card.Group>
			</div>
			}
			</div>

			)
	}
}

export default GroupMembers