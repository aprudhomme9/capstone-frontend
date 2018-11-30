import React, {Component} from 'react';

class DisplayShow extends Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div>
				<h1>{this.props.show.title}</h1>
				<button onClick={this.props.toggleView}>Back</button>
			</div>


			)
	}
}





export default DisplayShow