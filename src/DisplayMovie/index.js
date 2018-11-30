import React, {Component} from 'react';

class DisplayMovie extends Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div>
				<h1>{this.props.movie.title}</h1>
				<button onClick={this.props.toggleView}>Back</button>
			</div>


			)
	}
}





export default DisplayMovie