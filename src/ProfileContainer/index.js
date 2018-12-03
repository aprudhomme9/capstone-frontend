import React, {Component} from 'react';
import DisplayMovie from '../DisplayMovie';
import DisplayShow from '../DisplayShow';
import {Card, Group, Image, Grid, Column, Row} from 'semantic-ui-react';

const serverUrl = 'http://localhost:5000/';


class ProfileContainer extends Component{
	constructor(){
		super()

		this.state = {
			loggedIn: false,
			favoriteMovies: [],
			watchListMovies: [],
			favoriteShows: [],
			watchListShows: [],
			movieToPass: '',
			viewMovie: false,
			showToPass: '',
			viewShow: false,
			activeUser: ''
		}
	}
	fetchActiveUser = async () => {
		const activeUser = await fetch(serverUrl + 'api/users', {credentials: 'include'});
		const parsedUser = await activeUser.json();

		return parsedUser
	}
	toggleMovie = async (e) => {
		console.log(e.currentTarget.id);
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
	passBack = () => {
		this.setState({
			viewMovie: false,
			viewShow: false
		})
	}
	fetchFavoriteShows = async () => {
		const userShows = await fetch(serverUrl + 'api/users/' + this.props.user._id, {
			credentials: 'include'
		})
		const parsedUser = await userShows.json();
		if(parsedUser.data){
			const parsedShows = parsedUser.data.favoriteShows;
			return parsedShows
		}
	}
	fetchWatchListShows = async () => {
		const userShows = await fetch(serverUrl + 'api/users/'+ this.props.user._id, {
			credentials: 'include'
		})
		const parsedUser = await userShows.json();
		if(parsedUser.data){
			const parsedShows = parsedUser.data.watchListShows;
			return parsedShows
		}
	}
	fetchFavorites = async () => {
		const userMovies = await fetch(serverUrl + 'api/users/' + this.props.user._id, {
			credentials: 'include'
		})
			const parsedUser = await userMovies.json();
			if(parsedUser.data){
				const parsedMovies = parsedUser.data.favoriteMovies;
				return parsedMovies
			}
	}
	fetchWatchlist = async () => {
		const userMovies = await fetch(serverUrl + 'api/users/' + this.props.user._id, {
			credentials: 'include'
		})
		const parsedUser = await userMovies.json();
		if(parsedUser.data){
			const parsedMovies = parsedUser.data.watchListMovies;
			return parsedMovies
		}
	}
	componentDidMount(){
		this.fetchFavorites().then((movie) => {
			console.log(movie);
			this.setState({
				loggedIn: true,
				favoriteMovies: movie
			})	
		})
		this.fetchWatchlist().then((movie) => {
			this.setState({
				watchListMovies: movie
			})
		})
		this.fetchFavoriteShows().then((show) => {
			this.setState({
				favoriteShows: show
			})
		})
		this.fetchWatchListShows().then((show) => {
			this.setState({
				watchListShows: show
			})
		})
		this.fetchActiveUser().then((user) => {
			this.setState({
				activeUser: user.data
			})
		})
	}
	render(){
		console.log(this.state, '<----STATE');
		if(this.props.user){
			const userFavorites = this.state.favoriteMovies.map((movie) => {
			return (
				<Card onClick={this.toggleMovie} id={movie._id}>
	   					<Image src={movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{movie.title}</Card.Header>
	    				</Card.Content>
	 			</Card>

				)
		})
			const userWatchList = this.state.watchListMovies.map((movie) => {
				return (
					<Card onClick={this.toggleMovie} id={movie._id}>
	   					<Image src={movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{movie.title}</Card.Header>
	    				</Card.Content>
	 				</Card>


					)
		})
			const userShowFavorites = this.state.favoriteShows.map((show) => {
				return (
				<Card onClick={this.toggleShow} id={show._id}>
	   					<Image src={show.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{show.title}</Card.Header>
	    				</Card.Content>
	 			</Card>
	 			)
		})
			const userShowWatchlist = this.state.watchListShows.map((show) => {
				return (
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
				{this.state.viewMovie ?  <DisplayMovie toggleView={this.passBack} user={this.state.activeUser} movie={this.state.movieToPass}/> :
				this.state.viewShow ? <DisplayShow toggleView={this.passBack} user={this.state.activeUser} show={this.state.showToPass}/> :

				<div>
					<h1>{this.props.user.username}'s Profile</h1>
					<Grid>
					<Grid.Row>
						<Grid.Column width={8}>
							<h3>Favorite Movies</h3>
							<Card.Group itemsPerRow={3}>
							{userFavorites}
							</Card.Group>
						</Grid.Column>
						<Grid.Column width={8}>
							<h3>Movie Watchlist</h3>
							<Card.Group itemsPerRow={3}>
							{userWatchList}
							</Card.Group>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8}>
							<h3>Favorite Series</h3>
							<Card.Group itemsPerRow={3}>
							{userShowFavorites}
							</Card.Group>
						</Grid.Column>
						<Grid.Column width={8}>
							<h3>Series Watchlist</h3>
							<Card.Group itemsPerRow={3}>
							{userShowWatchlist}
							</Card.Group>
						</Grid.Column>
					</Grid.Row>
					</Grid>

				</div>
			}
			</div>
			)
		} else {
			console.log('NOT LOGGED IN');
			return(
				<h1>Please Log In</h1>

				)
		}
			
	}
}


export default ProfileContainer