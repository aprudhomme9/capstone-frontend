import React, {Component} from 'react';
import {Card, Group, Image} from 'semantic-ui-react';
const serverUrl = 'http://localhost:5000/'
class GroupList extends Component{
	constructor(){
		super()

	}
	toggleView = (e) => {
		
		this.props.toggleView(e.currentTarget.id);
			console.log(e.currentTarget.id, '<----HERES TARGET ID');
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
				{groupList}
			</div>

			)
	}
}

export default GroupList