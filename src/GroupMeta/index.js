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

	render(){
		console.log(this.props);
		return(
			<div>

			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<h1>{this.props.group.name}</h1>
					</Grid.Column>
					<Grid.Column width={8}>
						<Button color="blue" onClick={this.handleJoin}><Icon name='user'/>Join</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			</div>


			)
	}
}

export default GroupMeta