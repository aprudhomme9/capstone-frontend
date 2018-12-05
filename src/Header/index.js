import React, {Component} from 'react';
import {Menu, Item, Button, Input, Radio, Segment, Form} from 'semantic-ui-react';
import SearchContainer from '../SearchContainer';
import './styles.css'

const serverUrl = 'http://localhost:5000/'
class Header extends Component{
	constructor(){
		super()
		this.state = {
			search: '',
			loggedIn: false,
			view: 'Movie View',
			user: ''
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
	fetchUser = async () => {
		const user = await fetch(serverUrl + 'api/users', {credentials: 'include'});
		const parsedUser = await user.json();
		return parsedUser
	}
	componentDidMount(){
		this.fetchUser().then((user) => {
			this.setState({
				user: user.data
			})
		})
	}
	render(){
		let inboxIcon = <i class="envelope outline icon"></i>
		let number = null;
		if(this.props.user){
			this.props.user.recommendations.forEach(() => {
			number += 1;
			this.props.user.showRecommendations.forEach(() => {
			number += 1;
			})
		})
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
						{this.props.user ? 
							<div>
							{inboxIcon}
							<p>{number}</p>
							</div> :
							<div>
						{inboxIcon}
						</div>

						}
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