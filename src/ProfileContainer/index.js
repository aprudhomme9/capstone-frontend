import React, {Component} from 'react';

class ProfileContainer extends Component{
	constructor(){
		super()

		this.state = {
			loggedIn: false
		}
	}
	componentDidMount(){
		if(this.props.user){
			this.setState({
				loggedIn: true
			})
		}
	}
	render(){

		return(
			<div>
			{this.state.loggedIn ? <h1>{this.props.user.username}'s Profile</h1> :

				<h1>Please Log In</h1>
			}
			</div>
			)
	}
}


export default ProfileContainer