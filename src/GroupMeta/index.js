import React, {Component} from 'react';
import {Button, Grid} from 'semantic-ui-react';

class GroupMeta extends Component{
	constructor(){
		super()
	}
	handleJoin = () => {
		this.props.handleJoin();
	}
	render(){
		console.log(this.props);
		return(
			<Grid>
				<Grid.Row>
					<Grid.Column width={4}>
						{this.props.group.name}
					</Grid.Column>
					<Grid.Column width={4}>
						Col 2
					</Grid.Column>
					<Grid.Column width={4}>
						<Button onClick={this.handleJoin} color="green">Join</Button>
					</Grid.Column>
					<Grid.Column width={4}>
						<Button color="blue">Create New Group</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>


			)
	}
}

export default GroupMeta