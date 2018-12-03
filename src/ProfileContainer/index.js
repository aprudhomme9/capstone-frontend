import React, {Component} from 'react';
import DisplayMovie from '../DisplayMovie';
const serverUrl = 'http://localhost:5000/';


class ProfileContainer extends Component{
	constructor(){
		super()

		this.state = {
			loggedIn: false,
			movies: [],
			movieToPass: ''
		}
	}
	toggleView = (e) => {
		console.log(e.currentTarget.id);
	}
	fetchMovies = async () => {
		const userMovies = await fetch(serverUrl + 'api/users', {
			credentials: 'include'
		})
			const parsedUser = await userMovies.json();
			if(parsedUser.data){
				const parsedMovies = parsedUser.data.favoriteMovies;
				return parsedMovies
			}
	}
	componentDidMount(){
		this.fetchMovies().then((movie) => {
			console.log(movie);
			this.setState({
				loggedIn: true,
				movies: movie
			})	
		})
	}
	render(){
		console.log(this.state.movies);
		if(this.props.user){
			const userFavorites = this.state.movies.map((movie) => {
			return (
				<div className='movieContainer'>
					<h2>{movie.title}</h2>
					<img id={movie._id} onClick={this.toggleView} src={movie.imageUrl}/>

				</div>

				)
			})

			return(
				<div>
					<h1>{this.props.user.username}'s Profile</h1>
					{userFavorites}
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