import React, {Component} from 'react';
import {Modal, Header, Card, Grid, Image} from 'semantic-ui-react';
import DisplayMovie from '../DisplayMovie';
import DisplayShow from '../DisplayShow';
import serverUrl from '../apiUrl';
// const serverUrl = 'https://watch-with-friends-express.herokuapp.com/' || 'http://localhost:5000/'
class GroupContent extends Component{
	constructor(){
		super()

		this.state = {
			movieToPass: '',
			showToPass: '',
			viewMovie: false,
			viewShow: false
		}
	}
	toggleMovie = async (e) => {
		console.log(e.currentTarget);
		const movieToPass = await fetch(serverUrl + 'api/movies/movie/add/' + e.currentTarget.id);
		const parsedMovie = await movieToPass.json();
		console.log(parsedMovie);

		this.setState({
			movieToPass: parsedMovie.data,
			viewMovie: !this.state.viewMovie
		})
	}
	toggleShow = async (e) => {
		const showToPass = await fetch(serverUrl + 'api/shows/show/add/' + e.currentTarget.id);
		const parsedShow = await showToPass.json();

		this.setState({
			showToPass: parsedShow.data,
			viewShow: !this.state.viewShow
		})
	}
	fetchUser = async () => {
		const user = await fetch(serverUrl + 'api/users', {credentials: 'include'} );
		const parsedUser = await user.json();

		return parsedUser
	}
	closeModal = () => {
		this.setState({
			viewMovie: false,
			viewShow: false
		})
	}
	componentDidMount(){
		this.fetchUser().then((user) => {
			this.setState({
				activeUser: user.data
			})
		})
	}
	render(){
		const popularMovies = this.props.group.popularMovies.map((movie) => {
			return(
				<Card id={movie._id} onClick={this.toggleMovie}>
	   				<Image src={movie.imageUrl} />
	   				<Card.Content>
	      				<Card.Header>{movie.title}</Card.Header>
	    			</Card.Content>
	 			</Card>
				)
		})
		const popularShows = this.props.group.popularShows.map((show) => {
			return(
				<Card id={show._id} onClick={this.toggleShow}>
	   				<Image src={show.imageUrl} />
	   				<Card.Content>
	      				<Card.Header>{show.title}</Card.Header>
	    			</Card.Content>
	 			</Card>
				)
		})
		return(
			<div>
			<Modal open={this.state.viewShow}>
				<Modal.Content>
					<p className="close" onClick={this.closeModal}>+</p>
					<DisplayShow toggleView={this.closeModal} user={this.state.activeUser} show={this.state.showToPass} />
				</Modal.Content>
			</Modal>
			<Modal open={this.state.viewMovie}>
				<Modal.Content>
					<p className="close" onClick={this.closeModal}>+</p>
					<DisplayMovie toggleView={this.closeModal} user={this.state.activeUser} movie={this.state.movieToPass} />
				</Modal.Content>
			</Modal>
			<Grid>
				<Grid.Row textAlign='center'>
					<Grid.Column width={16}>
						<h3>Popular Movies</h3>
						<Card.Group itemsPerRow={5}>
						{popularMovies}
						</Card.Group>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row textAlign='center'>
					<Grid.Column width={16}>
						<h3>Popular Series</h3>
						<Card.Group itemsPerRow={5}>
						{popularShows}
						</Card.Group>
					</Grid.Column>
				</Grid.Row>
				
			</Grid>
			</div>


			)
	}
}





export default GroupContent