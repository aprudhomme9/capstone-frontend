import React, {Component} from 'react';
import SearchContainer from '../SearchContainer';
import MovieList from '../MovieList';
import DisplayMovie from '../DisplayMovie';
import {Modal, Header, Button} from 'semantic-ui-react'
const serverUrl = 'http://localhost:5000/'


class MovieContainer extends Component {
	constructor(){
		super();

		this.state = {
			movieToDisplay: '',
			showMovie: false,
			activeUser: ''
		}
	}
	fetchUser = async () => {
		const activeUser = await fetch(serverUrl + 'api/users', {credentials: 'include'})
		const parsedUser = await activeUser.json()
		return parsedUser
	}
	closeModal = () => {
		this.setState({
			showMovie: false
		})
	}
	toggleView = (movie) => {
		this.setState({
			showMovie: !this.state.showMovie,
			movieToDisplay: movie
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
		return(
			<div>
			<Modal open={this.state.showMovie}>
				
				<Modal.Content>
					<p className="close" onClick={this.closeModal}>+</p>
					<DisplayMovie handleGlobalState={this.props.handleGlobalState} toggleView={this.closeModal} user={this.state.activeUser} movie={this.state.movieToDisplay} />
				</Modal.Content>
			</Modal>

				<MovieList toggleView={this.toggleView} movies={this.props.movies}/>	

			</div>


			)
		
	}
}

export default MovieContainer;