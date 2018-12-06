import React, {Component} from 'react';

import SearchContainer from '../SearchContainer';

import ShowList from '../ShowList';
import DisplayShow from '../DisplayShow';
import {Modal, Button} from 'semantic-ui-react';

import serverUrl from '../apiUrl';
// const serverUrl = 'http://localhost:5000/'
class ShowContainer extends Component {
	constructor(){
		super();

		this.state = {
			showToDisplay: '',
			showShow: false,
			activeUser: ''
		}
	}
	toggleView = (show) => {
		this.setState({
			showShow: !this.state.showShow,
			showToDisplay: show
		})
	}
	fetchUser = async () => {
		const activeUser = await fetch(serverUrl + 'api/users', {credentials: 'include'})
		const parsedUser = await activeUser.json()
		return parsedUser
	}
	closeModal = () => {
		this.setState({
			showShow: false
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
			<Modal open={this.state.showShow}>
				
			<Modal.Content>
					<p className="close" onClick={this.closeModal}>+</p>
					<DisplayShow toggleView={this.toggleView} user={this.state.activeUser} show={this.state.showToDisplay} />
				</Modal.Content>
			</Modal>


			<ShowList toggleView={this.toggleView} shows={this.props.shows}/>

			</div>

			)
	}
}
export default ShowContainer