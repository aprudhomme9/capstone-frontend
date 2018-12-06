import React, {Component} from 'react';
import {Card, Group, Image, Modal, Label, Form, Header, Button, Grid} from 'semantic-ui-react';
import serverUrl from '../apiUrl';
// const serverUrl = 'https://watch-with-friends-express.herokuapp.com/' || 'http://localhost:5000/'
class GroupList extends Component{
	constructor(){
		super()
		this.state = {
			groupName: ''
		}
	}
	toggleView = (e) => {
		
		this.props.toggleView(e.currentTarget.id);
			console.log(e.currentTarget.id, '<----HERES TARGET ID');
	}
	openModal = () => {
		console.log('opening modalllllll');
		this.props.openModal();
	}
	handleSubmit = () => {
		this.props.handleSubmit(this.state.groupName);
	}
	closeModal = () => {
		console.log('closing modal');
		this.props.closeModal()
	}
	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
		console.log(this.state.groupName);
	}
	render(){
		const source = 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png'
		const groupList = this.props.groups.map((group) => {
			return(
				<Card id={group._id} onClick={this.toggleView}>
					<Image src={source}/>
					<Card.Content>
						<Card.Header>{group.name}</Card.Header>
					</Card.Content>
				</Card>

				)
		})
		return(
			<div>
			<Modal open={this.props.modalOpen}>
				<Header>Make Your Group</Header>
				<Modal.Content>
					<p className="close" onClick={this.closeModal}>+</p>
					<Form onSubmit={this.handleSubmit}>
						<Label>
						Group Name
						</Label>
						<Form.Input onChange={this.handleChange} type='text' name='groupName' value={this.state.groupName}/>
						<Button type='submit' color='blue'>Submit</Button>
					</Form>
					
				</Modal.Content>
			</Modal>
			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<h1>Browse Some Groups!</h1>
						<Card.Group itemsPerRow={4}>
						{groupList}
						</Card.Group>
					</Grid.Column>
					<Grid.Column width={8}>
						<Button color="blue" onClick={this.openModal}>Create New Group</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			</div>

			)
	}
}

export default GroupList