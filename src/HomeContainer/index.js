import React, {Component} from 'react';
import {Modal, Grid, Row, Column, Card, Group, Image} from 'semantic-ui-react';
import DisplayMovie from '../DisplayMovie';
import DisplayShow from '../DisplayShow';
import serverUrl from '../apiUrl';
// const serverUrl = 'http://localhost:5000/'

class HomeContainer extends Component{
	constructor(){
		super()
		this.state = {
			popularMovies: [],
			popularShows: [],
			viewMovie: false,
			viewShow: false,
			activeUser: '',
			movieToPass: '',
			showToPass: ''
		}
	}
	fetchPopularMovies = async () => {
		const popularMovies = await fetch(serverUrl + 'api/movies/view/popular');
		const parsedMovies = await popularMovies.json();
		console.log(parsedMovies, '<<-------popular movies');
		return parsedMovies

	}
	fetchPopularShows = async () => {
		const popularShows = await fetch(serverUrl + 'api/shows/view/popular');
		const parsedShows = await popularShows.json();
		return parsedShows
	}
	fetchActiveUser = async () => {
		const activeUser = await fetch(serverUrl + 'api/users', {credentials: 'include'});
		const parsedUser = await activeUser.json();

		return parsedUser
	}
	toggleMovie = async (e) => {
		console.log(e.currentTarget);
		const movieToPass = await fetch(serverUrl + 'api/movies/movie/add/' + e.currentTarget.id);
		const parsedMovie = await movieToPass.json();
		console.log(parsedMovie);

		this.setState({
			movieToPass: parsedMovie.data,
			viewMovie: true
		})
	}
	toggleShow = async (e) => {
		console.log(e.currentTarget);
		const showToPass = await fetch(serverUrl + 'api/shows/show/add/' + e.currentTarget.id);
		const parsedShow = await showToPass.json();

		this.setState({
			showToPass: parsedShow.data,
			viewShow: true
		})
	}
	passBack = async () => {
		this.setState({
			viewMovie: false,
			viewShow: false
		})
	}
	componentDidMount(){
		this.fetchPopularMovies().then((movies) => {
			this.setState({
				popularMovies: movies.data
			})
		})
		this.fetchPopularShows().then((shows) => {
			this.setState({
				popularShows: shows.data
			})
		})
		this.fetchActiveUser().then((user) => {
			this.setState({
				activeUser: user.data
			})
		})
	}
	render(){
		const sortedMovies = this.state.popularMovies.sort((a,b) => {
			return (b.favorites + b.adds) - (a.favorites + a.adds)
		})
		
		const popularMovies = this.state.popularMovies.map((movie) => {
			return(
				<Card id={movie._id} onClick={this.toggleMovie}>
	   					<Image src={movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{movie.title}</Card.Header>
	    				</Card.Content>
	 			</Card>


				)
		})
		const sortedShows = this.state.popularShows.sort((a,b) => {
			return (b.favorites + b.adds) - (a.favorites + a.adds)
		})
		const popularShows = this.state.popularShows.map((show) => {
			return(
				<Card onClick={this.toggleShow} id={show._id}>
	   					<Image src={show.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{show.title}</Card.Header>
	    				</Card.Content>
	 			</Card>


				)
		})
		return(
			<div>
			<Modal open={this.state.viewMovie}>
				
				<Modal.Content>
					<p className="close" onClick={this.passBack}>+</p>
					<DisplayMovie toggleView={this.passBack} user={this.state.activeUser} movie={this.state.movieToPass} />
				</Modal.Content>
				</Modal>

				<Modal open={this.state.viewShow}>
				
				<Modal.Content>
					<p className="close" onClick={this.passBack}>+</p>
					<DisplayShow toggleView={this.passBack} user={this.state.activeUser} show={this.state.showToPass} />
				</Modal.Content>
				</Modal>
				<h1>Watch With Friends</h1>
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


export default HomeContainer;