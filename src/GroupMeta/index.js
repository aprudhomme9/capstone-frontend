import React, {Component} from 'react';
import {Button, Grid, Icon, Modal, Header, Form, Label} from 'semantic-ui-react';

class GroupMeta extends Component{
	constructor(){
		super()
		this.state = {
			groupName: ''
		}
	}
	handleJoin = () => {
		this.props.handleJoin();
	}
	handleBack = () => {
		console.log('hitting');
		this.props.handleBack();
	}
	render(){
		console.log(this.props);
		return(
			<div>
			<Grid>
				<Grid.Row>
					<Grid.Column width={16}>
						<p onClick={this.handleBack} className='close'>+</p>
					</Grid.Column>
					<Grid.Column width={2}>
						<Button color="blue" onClick={this.handleJoin}><Icon name='user'/>Join</Button>
					</Grid.Column>
					<Grid.Column width={16}>
						<h3>{this.props.group.name}</h3>
					
					</Grid.Column>
					
				</Grid.Row>
			</Grid>
			</div>


			)
	}
}

export default GroupMeta