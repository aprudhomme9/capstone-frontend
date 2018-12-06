import React, {Component} from 'react';
import GroupList from '../GroupList';
import GroupDiscussion from '../GroupDiscussion';
import GroupMembers from '../GroupMembers';
import {Grid, Image, Button} from 'semantic-ui-react';
import GroupMeta from '../GroupMeta';
import GroupContent from '../GroupContent';
import serverUrl from '../apiUrl';
// const serverUrl = 'https://watch-with-friends-express.herokuapp.com/' || 'http://localhost:5000/'

class GroupContainer extends Component{
	constructor(){
		super()

		this.state = {
			displayGroup: false,
			groups: [],
			groupToDisplay: null,
			modalOpen: false
		}
	}
	closeModal = () => {
		this.setState({
			modalOpen: false
		})
	}
	openModal = async () => {
		this.setState({
			modalOpen: true
		})
		
	}
	handleBack = () => {
		console.log('CLICKING');
		this.setState({
			displayGroup: false
		})
	}
	handleSubmit = async (groupName) => {
		const groupToCreate = await fetch(serverUrl + 'api/groups', {
			method: 'POST',
			body: JSON.stringify({
				name: groupName

			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		this.closeModal();
		this.fetchGroups().then((groups) => {
			this.setState({
				groups: groups.data
			})
		})
	}
	// will handle editing the group to add user to its members
	handleJoin = async () => {
		console.log('HANDLE JOIN IS HITTING');
		const userToAdd = await fetch(serverUrl + 'api/users', {credentials: 'include'});

		const parsedUser = await userToAdd.json();
		console.log(parsedUser, '<---USER FROM JOIN');
		const groupMembers = this.state.groupToDisplay.members;

		const membersArray = groupMembers.filter((user) => {
			if(parsedUser.data._id !== user._id){
				return user
			}
		})

		membersArray.push(parsedUser.data)
		
			const editedGroup = await fetch(serverUrl + 'api/groups/' + this.state.groupToDisplay._id, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({
					members: membersArray
				}),
				headers: {
					'Content-Type': 'application/json'
				}

			})
		this.fetchDisplayGroup(this.state.groupToDisplay._id).then((group) => {
			this.setState({
				groupToDisplay: group.data
			})
		})

	}
	fetchGroups = async () => {
		const allGroups = await fetch(serverUrl + 'api/groups');
		const parsedGroups = await allGroups.json();

		return parsedGroups
	}
	fetchDisplayGroup = async (id) => {
		const groupToDisplay = await fetch(serverUrl + 'api/groups/' + id);
		const parsedGroupToDisplay = await groupToDisplay.json();
		return parsedGroupToDisplay
	}
	toggleView = (id) => {
		const groupId = id;
		this.fetchDisplayGroup(groupId).then((group) => {
			this.setState({
				groupToDisplay: group.data,
				displayGroup: !this.state.displayGroup
			})
		})
	}
	componentDidMount(){
		this.fetchGroups().then((groups) => {
			this.setState({
				groups: groups.data
			})	
		})
	}
	render(){

		// should have discussion container
		// member container
		// popularMovies container
		// popularShows container
		return(
			<div>
			{this.state.displayGroup ?
			<Grid>
				<Grid.Row>
					<Grid.Column width={16}>
						<GroupMeta handleBack={this.handleBack} handleJoin={this.handleJoin} group={this.state.groupToDisplay} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={16}>
						<GroupContent group={this.state.groupToDisplay} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={8}>
						<Grid.Row>
							<Grid.Column width={8}>
							<GroupMembers group={this.state.groupToDisplay}/>
							</Grid.Column>
						</Grid.Row>
					</Grid.Column>
					<Grid.Column width={8}>
						<GroupDiscussion group={this.state.groupToDisplay} />
					</Grid.Column>
				</Grid.Row>
			</Grid> :
			<GroupList handleSubmit={this.handleSubmit} modalOpen={this.state.modalOpen} closeModal={this.closeModal} openModal={this.openModal} toggleView={this.toggleView} groups={this.state.groups}/>}
			</div>
			)
	}
}


export default GroupContainer