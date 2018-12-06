import React, {Component} from 'react';
import serverUrl from '../apiUrl';
// const serverUrl = 'http://localhost:5000/'


class LogoutContainer extends Component{
	constructor(){
		super()
	}
	componentDidMount = async () => {
		const logoutResponse = await fetch(serverUrl + 'auth/logout', {
			credentials: 'include'
		})
		console.log(logoutResponse, '<-----Logout response');

		this.props.handleGlobalState(false);
	}
	render(){
		return(

			null

			)
	}
}


export default LogoutContainer