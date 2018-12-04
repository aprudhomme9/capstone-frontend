import React, {Component} from 'react';
import DisplayMovie from '../DisplayMovie';
import DisplayShow from '../DisplayShow';
import {Modal, Card, Group, Image, Grid, Column, Row, Button} from 'semantic-ui-react';

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
	closeModal = () => {
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
	handleFavorites = async (e) => {
		e.preventDefault();
		console.log(e.currentTarget.id);
		const movieToRemove = await fetch(serverUrl + 'api/movies/movie/add/' + e.currentTarget.id);
		const parsedMovie = await movieToRemove.json();

		const userMovies = this.state.favoriteMovies;
		const newMovieArray = this.state.favoriteMovies.filter((movie) => {
			if(movie._id !== parsedMovie.data._id){
				return movie
			} 
		})
		const updatedUser = await fetch(serverUrl + 'api/users/' + this.state.activeUser._id, {
			method: 'PUT',
			body: JSON.stringify({
				favoriteMovies: newMovieArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		this.setState({
			viewMovie: false,
			favoriteMovies: newMovieArray
		})
	}
	handleWatchList = async (e) => {
		console.log(e.currentTarget.id);
		e.preventDefault();
		console.log(e.currentTarget.id);
		const movieToRemove = await fetch(serverUrl + 'api/movies/movie/add/' + e.currentTarget.id);
		const parsedMovie = await movieToRemove.json();

		const userMovies = this.state.watchListMovies;
		const newMovieArray = this.state.watchListMovies.filter((movie) => {
			if(movie._id !== parsedMovie.data._id){
				return movie
			} 
		})
		const updatedUser = await fetch(serverUrl + 'api/users/' + this.state.activeUser._id, {
			method: 'PUT',
			body: JSON.stringify({
				watchListMovies: newMovieArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		this.setState({
			viewMovie: false,
			watchListMovies: newMovieArray
		})
	}
	handleShowFavorites = async (e) => {
		console.log(e.currentTarget.id);
		e.preventDefault();
		console.log(e.currentTarget.id);
		const showToRemove = await fetch(serverUrl + 'api/shows/show/add/' + e.currentTarget.id);
		const parsedShow = await showToRemove.json();

		
		const newShowArray = this.state.favoriteShows.filter((show) => {
			if(show._id !== parsedShow.data._id){
				return show
			} 
		})
		const updatedUser = await fetch(serverUrl + 'api/users/' + this.state.activeUser._id, {
			method: 'PUT',
			body: JSON.stringify({
				favoriteShows: newShowArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		this.setState({
			viewShow: false,
			favoriteShows: newShowArray
		})
	}
	handleShowWatchList = async (e) => {
		console.log(e.currentTarget.id);
		console.log(e.currentTarget.id);
		e.preventDefault();
		console.log(e.currentTarget.id);
		const showToRemove = await fetch(serverUrl + 'api/shows/show/add/' + e.currentTarget.id);
		const parsedShow = await showToRemove.json();

		
		const newShowArray = this.state.watchListShows.filter((show) => {
			if(show._id !== parsedShow.data._id){
				return show
			} 
		})
		const updatedUser = await fetch(serverUrl + 'api/users/' + this.state.activeUser._id, {
			method: 'PUT',
			body: JSON.stringify({
				watchListShows: newShowArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		this.setState({
			viewShow: false,
			watchListShows: newShowArray
		})
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
		console.log(this.props.ableToEdit, 'ABLE TO EDIT??');
		console.log(this.st, '<----STATE');
		if(this.props.user){
			const userFavorites = this.state.favoriteMovies.map((movie) => {
			return (
				<Card onClick={this.toggleMovie} id={movie._id}>
	   					<Image src={movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{movie.title}</Card.Header>
	    				</Card.Content>
	    				{this.props.ableToEdit ? 
	   					<Card.Content extra>
	   						<p id={movie._id} onClick={this.handleFavorites} className='close2'>+</p>
         				</Card.Content> :
         				null
	   					}
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
	   				{this.props.ableToEdit ? 
	   					<Card.Content extra>
	   						<p id={movie._id} onClick={this.handleWatchList} className='close2'>+</p>
         				</Card.Content> :
         				null
	   				}
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
	    				{this.props.ableToEdit ? 
	   					<Card.Content extra>
	   						<p id={show._id} onClick={this.handleShowFavorites} className='close2'>+</p>
         				</Card.Content> :
         				null
	   					}
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
	    				{this.props.ableToEdit ? 
	   					<Card.Content extra>
	   						
           					<p id={show._id} onClick={this.handleShowWatchList} className='close2'>+</p>
         					 
         				</Card.Content> :
         				null
	   				}
	 			</Card>
	 			)
			})

			return(
				<div>
				<Modal open={this.state.viewMovie}>
				
				<Modal.Content>
					<p className="close" onClick={this.closeModal}>+</p>
					<DisplayMovie toggleView={this.closeModal} user={this.state.activeUser} movie={this.state.movieToPass} />
				</Modal.Content>
				</Modal>

				<Modal open={this.state.viewShow}>
				
				<Modal.Content>
					<p className="close" onClick={this.closeModal}>+</p>
					<DisplayShow toggleView={this.closeModal} user={this.state.activeUser} show={this.state.showToPass} />
				</Modal.Content>
				</Modal>
				

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