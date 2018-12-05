import React, { Component } from 'react';
import { Form, Label, Button, Input, Grid, Segment } from 'semantic-ui-react'


const serverUrl = 'http://localhost:5000/'


class LoginContainer extends Component {
	constructor(){
	    super();
	    this.state = {
	        username: '',
	        fullname: '',
	        password: '',
	        register: true,
	        message: ''
	    }
	}
	handleGlobalState = (loggedIn, user) => {
		this.props.handleGlobalState(loggedIn, user);
	}
	handleRegister = async (e) => {
		e.preventDefault()

		const registerResponse = await fetch(serverUrl + 'auth/register', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
			
		})
		const parsedResponse = await registerResponse.json()
		console.log(parsedResponse, '<---register response');
		if(parsedResponse.data){
			this.handleGlobalState(true)
			
		} else {
			this.setState({
				message: 'Username taken'
			})
		}
	}
	handleLogin = async (e) => {
		e.preventDefault()

		const loginResponse = await fetch(serverUrl + 'auth', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedResponse = await loginResponse.json()
		console.log(parsedResponse, '<----LOGIN RESPONSE');
		console.log(parsedResponse.status);
		console.log(parsedResponse.message, '<---MESSAGE');
		if(parsedResponse.message == 'Success'){
			console.log('log in successful');
			console.log(parsedResponse.data);
			this.handleGlobalState(true);
		} else {
			this.setState({
				message: 'Username or Password Incorrect'
			})
		}
	}
	toggle = () => {
		this.setState({
			register: !this.state.register
		})	
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
    render(){
        return(
        	<div>
        	<h4>{this.state.message}</h4>
        	<Grid container columns={1} textAlign='center' vertical='middle' style={{height: '100%'}}>
        		<Grid.Column style={{maxWidth: 450}}>
        		{this.state.register ? 
	        		<Segment>
	        		<h2>Register</h2>
	            	<Form onSubmit={this.handleRegister}>
	            		<Label>Full Name</Label>
		            	<Form.Input type="text" name="fullname" onChange={this.handleChange}/>
		            	<Label>Username</Label>
		            	<Form.Input type="text" name="username" onChange={this.handleChange}/>
		            	<Label>Password</Label>
		            	<Form.Input type="password" name="password" onChange={this.handleChange}/>
		            	<Button type="submit" color="green">Register</Button>
		            	<a href='#!' onClick={this.toggle}>Already have an account? Log in here</a>
	            	</Form>
	            	</Segment> :

	            	<Segment>
	        		<h2>Login</h2>
	            	<Form onSubmit={this.handleLogin}>
		            	<Label>Username</Label>
		            	<Form.Input type="text" name="username" onChange={this.handleChange}/>
		            	<Label>Password</Label>
		            	<Form.Input type="password" name="password" onChange={this.handleChange}/>
		            	<Button type="submit" color="blue">Log In</Button>
		            	<a href='#!' onClick={this.toggle}>New to Watch With Friends? Register here</a>
	            	</Form>
	            	</Segment>}
            	</Grid.Column>
           </Grid>
           </div>
        )
    }
}

export default LoginContainer