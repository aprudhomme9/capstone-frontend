import React, {Component} from 'react';
import DisplayMovie from '../DisplayMovie';
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
			movieToPass: ''
		}
	}
	toggleView = (e) => {
		console.log(e.currentTarget.id);
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
	}
	render(){
		console.log(this.state, '<----STATE');
		if(this.props.user){
			const userFavorites = this.state.favoriteMovies.map((movie) => {
			return (
				<Card >
	   					<Image src={movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{movie.title}</Card.Header>
	    				</Card.Content>
	 			</Card>

				)
		})
			const userWatchList = this.state.watchListMovies.map((movie) => {
				return (
					<Card>
	   					<Image src={movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{movie.title}</Card.Header>
	    				</Card.Content>
	 				</Card>


					)
		})
			const userShowFavorites = this.state.favoriteShows.map((show) => {
				return (
				<Card >
	   					<Image src={show.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{show.title}</Card.Header>
	    				</Card.Content>
	 			</Card>
	 			)
		})
			const userShowWatchlist = this.state.watchListShows.map((show) => {
				return (
				<Card >
	   					<Image src={show.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{show.title}</Card.Header>
	    				</Card.Content>
	 			</Card>
	 			)
			})

			return(
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