import React, {Component} from 'react';

import SearchContainer from '../SearchContainer';

import ShowList from '../ShowList';
import DisplayShow from '../DisplayShow';

const serverUrl = 'http://localhost:5000/'
class ShowContainer extends Component {
	constructor(){
		super();

		this.state = {
			showToDisplay: '',
			showShow: false
		}
	}
	toggleView = (show) => {
		this.setState({
			showShow: !this.state.showShow,
			showToDisplay: show
		})
	}
	render(){ 
		return(
			<div>
			{this.state.showShow ? <DisplayShow user={this.props.user} show={this.state.showToDisplay} toggleView={this.toggleView}/> :

			<ShowList toggleView={this.toggleView} shows={this.props.shows}/>

			}
			</div>

			)
	}
}
export default ShowContainer