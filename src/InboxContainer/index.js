import React, {Component} from 'react';
import {Card, Image, Grid, Button, Modal} from 'semantic-ui-react';
import DisplayMovie from '../DisplayMovie';
import DisplayShow from '../DisplayShow';

const serverUrl = 'http://localhost:5000/'

class InboxContainer extends Component{
	constructor(){
		super()

		this.state = {
			user: '',
			recs: [],
			showRecs: [],
			viewMovie: false,
			movieToPass: '',
			showToPass: '',
			viewShow: false
		}
	}
	handleView = async (e) => {
		const movie = await fetch(serverUrl + 'api/movies/movie/add/' + e.currentTarget.id)
		const parsedMovie = await movie.json();
		this.toggleModal();
		this.setState({
			movieToPass: parsedMovie.data
		})
	}
	handleShowView = async (e) => {
		const show = await fetch(serverUrl + 'api/shows/show/add/' + e.currentTarget.id)
			const parsedShow = await show.json();
		this.togggleShowModal();
		this.setState({
			showToPass: parsedShow.data
		})

	}
	toggleShowModal = () => {
		this.setState({
			viewShow: !this.state.showModal
		})
	}
	closeShowModal = () => {
		this.setState({
			viewShow: false,
			viewMovie: false
		})
	}
	toggleModal = () => {
		this.setState({
			viewMovie: !this.state.viewMovie,
			viewShow: false
		})
	}
	fetchRecs = async () => {
		const user = await fetch(serverUrl + 'api/users', {credentials: 'include'})
		const parsedUser = await user.json();

		this.setState({
			user: parsedUser.data,
			recs: parsedUser.data.recommendations,
			showRecs: parsedUser.data.showRecommendations
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
		const parsedUser = await updatedUser.json();

		this.fetchRecs();
		
		// this.props.handleGlobalState(true, parsedUser)
	}
	markShowRead = async (e) => {
		console.log(e.currentTarget.id, "<----CURRENT TARGET");
		const newUserRecArray = this.state.showRecs.filter((rec) => {
			if(rec.show._id !== e.currentTarget.id){
				return rec
			}
		})
		console.log(newUserRecArray, '<---USER REC ARRAY NEW');
		const updatedUser = await fetch(serverUrl + 'api/users/' + this.props.user._id, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				showRecommendations: newUserRecArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedUser = await updatedUser.json();

		this.fetchRecs();
		
		// this.props.handleGlobalState(true, parsedUser)
	}

	componentDidMount(){
		this.fetchRecs();
	}
	render(){
		if(this.props.loggedIn){
			const userMovieRecommendations = this.state.recs.map((rec) => {
			return (
				<div>
					<Card onClick={this.handleView} id={rec.movie._id}>
	   					<Image src={rec.movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{rec.movie.title}</Card.Header>
	    				</Card.Content>
	   					<Card.Content extra>
	   						Recommended By: {rec.author}
         					 
	   						
         				</Card.Content>
	 			</Card>
	 			<Button  id={rec.movie._id} onClick={this.markRead} color='blue'>Mark Read</Button>
	 			</div>
	 				)
		})
			const userShowRecommendations = this.state.showRecs.map((rec) => {
			return (
				<div>
					<Card onClick={this.handleShowView} id={rec.show._id}>
	   					<Image src={rec.show.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{rec.show.title}</Card.Header>
	    				</Card.Content>
	   					<Card.Content extra>
	   						Recommended By: {rec.author}
         					 
	   						
         				</Card.Content>
	 			</Card>
	 			<Button  id={rec.show._id} onClick={this.markShowRead} color='blue'>Mark Read</Button>
	 			</div>
	 				)
		})
		return(
			<div>
			<Modal open={this.state.viewShow}>
				
				<Modal.Content>
					<p className="close" onClick={this.closeShowModal}>+</p>
					<DisplayShow toggleView={this.toggleShowModal} user={this.props.user} show={this.state.showToPass} />
				</Modal.Content>
			</Modal>
			<Modal open={this.state.viewMovie}>
				
				<Modal.Content>
					<p className="close" onClick={this.toggleModal}>+</p>
					<DisplayMovie toggleView={this.toggleModal} user={this.props.user} movie={this.state.movieToPass} />
				</Modal.Content>
			</Modal>
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
							{userShowRecommendations}
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