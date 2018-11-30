import React, {Component} from 'react';
import {Menu, Item, Button, Input, Radio, Segment, Form} from 'semantic-ui-react';
import SearchContainer from '../SearchContainer';
import './styles.css'
class Header extends Component{
	constructor(){
		super()
		this.state = {
			search: '',
			loggedIn: false,
			view: 'Movie View'
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleGlobalState = (isLogged, user) => {
		this.setState({
			loggedIn: isLogged
		})
		this.props.handleGlobalState.bind(isLogged, user);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.getResults(this.state.search);
	}
	render(){
		if(this.state.loggedIn){
			const message = 'Log Out'
		} else {
			const message = 'Log In/Register'
		}
		return(
				<div>
					<Segment inverted>
					<Menu inverted secondary>
						<Menu.Item name='home' active={this.props.activeItem == 'Home'} onClick={this.props.handleClick.bind()}/>
						<Menu.Item name='my profile' active={this.props.activeItem == 'My Profile'} onClick={this.props.handleClick.bind()}/>
						<Menu.Item name='movie buds' active={this.props.activeItem == 'Movie Buds'} onClick={this.props.handleClick.bind()}/>
						<Menu.Item name='groups' active={this.props.activeItem == 'Groups'} onClick={this.props.handleClick.bind()}/>
						<Menu.Item name='inbox' active={this.props.activeItem == 'Inbox'} onClick={this.props.handleClick.bind()}/>
						<Menu.Menu position='right'>
							<Menu.Item>
								<Radio toggle onChange={this.props.toggle.bind()}/>
								{this.props.movie ? <p className="toggle">Movie View</p> :
									<p>TV View</p>
								}
								
							</Menu.Item>
							<Form onSubmit={this.handleSubmit}>
								<Segment inverted>
									<Menu.Item>
          							<Input inverted icon='search' onChange={this.handleChange} type="text" value={this.state.search} name='search' placeholder='Search...'/>
          							<br/>
          							<Button small color="blue" type="submit">Search</Button>
          							</Menu.Item>
          						</Segment>	
      						</Form>
      						{this.props.loggedIn ? 
          					<Menu.Item
           						 name='logout'
            					 active={this.props.activeItem === 'Logout'}
           						 onClick={this.props.handleClick.bind()}
          					/> :
          					<Menu.Item
          						name='login'
          						active={this.props.activeItem === 'Login'}
          						onClick={this.props.handleClick.bind()}
          					/>}
        				</Menu.Menu>
        			</Menu>
        			</Segment>

				</div>





			)
	}
}

export default Header;