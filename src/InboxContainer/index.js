import React, {Component} from 'react';
import {Card, Image, Grid, Button} from 'semantic-ui-react';

const serverUrl = 'http://localhost:5000/'

class InboxContainer extends Component{
	constructor(){
		super()

		this.state = {
			user: '',
			recs: []
		}
	}
	fetchRecs = async () => {
		const user = await fetch(serverUrl + 'api/users', {credentials: 'include'})
		const parsedUser = await user.json();

		this.setState({
			user: parsedUser.data,
			recs: parsedUser.data.recommendations
		})
	}
	markRead = async (e) => {
		console.log(e.currentTarget.id, "<----CURRENT TARGET");
		const newUserRecArray = this.state.recs.filter((rec) => {
			if(rec.movie._id !== e.currentTarget.id){
				return rec
			}
		})
		console.log(newUserRecArray, '<---USER REC ARRAY NEW');
		const updatedUser = await fetch(serverUrl + 'api/users/' + this.props.user._id, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				recommendations: newUserRecArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		this.fetchRecs();
	}

	componentDidMount(){
		this.fetchRecs();
	}
	render(){
		if(this.props.loggedIn){
			const userMovieRecommendations = this.state.recs.map((rec) => {
			return (
					<Card id={rec.movie._id}>
	   					<Image src={rec.movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{rec.movie.title}</Card.Header>
	    				</Card.Content>
	   					<Card.Content extra>
	   						
           					<p id={rec.movie._id} onClick={this.markRead} className='close2'>+</p>
         					 
         				</Card.Content>
	 			</Card>
	 				)
		})
		return(
			<div>
				<div>
				<h1>Your Inbox</h1>
				<Grid.Row>
						<Grid.Column width={16}>
							<h3>Recommended Movies</h3>
							<Card.Group itemsPerRow={5}>
							{userMovieRecommendations}
							</Card.Group>
						</Grid.Column>
				</Grid.Row>
				<br/>
				<Grid.Row>
					<Grid.Column width={16}>
							<h3>Recommended Shows</h3>
							<Card.Group itemsPerRow={5}>
							</Card.Group>
					</Grid.Column>
				</Grid.Row>
				</div>
			</div>
			
			
			)
		} else {
			return(
				<h1>PLEASE LOG IN</h1>
				)
		}

	}
}


export default InboxContainer