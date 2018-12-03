import React, {Component} from 'react';
import GroupList from '../GroupList';
import GroupDiscussion from '../GroupDiscussion';
import GroupMembers from '../GroupMembers';
import {Grid, Image, Button} from 'semantic-ui-react';
import GroupMeta from '../GroupMeta'
const serverUrl = 'http://localhost:5000/'

class GroupContainer extends Component{
	constructor(){
		super()

		this.state = {
			displayGroup: false,
			groups: [],
			groupToDisplay: null
		}
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
		

	}
	fetchGroups = async () => {
		const allGroups = await fetch(serverUrl + 'api/groups');
		const parsedGroups = await allGroups.json();

		return parsedGroups
	}
	fetchDisplayGroup = async (id) => {
		console.log(id, 'ID PASSING THROUGH');
		const groupToDisplay = await fetch(serverUrl + 'api/groups/' + id);
		console.log(groupToDisplay, 'GETTING TEH GROUP TO DISPLAY');
		const parsedGroupToDisplay = await groupToDisplay.json();
		return parsedGroupToDisplay
	}
	toggleView = (id) => {
		console.log(id, 'HERES TEH ID');
		console.log(this.state);
		const groupId = id;
		this.fetchDisplayGroup(groupId).then((group) => {
			console.log(group.data, 'group in fetch');
			this.setState({
				groupToDisplay: group.data,
				displayGroup: !this.state.displayGroup
			})
		})
		
		console.log(this.state, '<---- STATE');
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
						<GroupMeta handleJoin={this.handleJoin} group={this.state.groupToDisplay} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={8}>
						<GroupMembers group={this.state.groupToDisplay}/>
					</Grid.Column>
					<Grid.Column width={8}>
						<GroupDiscussion />
					</Grid.Column>
				</Grid.Row>
			</Grid> :
			<GroupList toggleView={this.toggleView} groups={this.state.groups}/>}
			</div>
			)
	}
}


export default GroupContainer