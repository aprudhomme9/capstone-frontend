import React, {Component} from 'react';
import {Menu, Item, Button, Input, Radio} from 'semantic-ui-react';

class Header extends Component{
	constructor(){
		super()
	}
	// handleClick = (e) => {
	// 	console.log('clicking');
	// 	console.log(e.currentTarget.text);
	// 	this.setState({
	// 		activeItem: e.currentTarget.text
	// 	})
	// }
	render(){
		return(
				<div>
					<Menu secondary>
						<Menu.Item name='home' active={this.props.activeItem == 'Home'} onClick={this.props.handleClick.bind()}/>
						<Menu.Item name='my profile' active={this.props.activeItem == 'My Profile'} onClick={this.props.handleClick.bind()}/>
						<Menu.Item name='movie buds' active={this.props.activeItem == 'Movie Buds'} onClick={this.props.handleClick.bind()}/>
						<Menu.Item name='groups' active={this.props.activeItem == 'Groups'} onClick={this.props.handleClick.bind()}/>
						<Menu.Item name='inbox' active={this.props.activeItem == 'Inbox'} onClick={this.props.handleClick.bind()}/>
						<Menu.Menu position='right'>
							<Menu.Item>
								<Radio toggle label="TV" onChange={this.props.toggle.bind()}/>
							</Menu.Item>
          					<Menu.Item>
            					<Input icon='search' placeholder='Search...' />
          					</Menu.Item>
          					<Menu.Item
           						 name='logout'
            					 active={this.props.activeItem === 'logout'}
           						 onClick={this.props.handleClick.bind()}
          					/>
        				</Menu.Menu>
        			</Menu>
					<h2>Watch With Friends</h2>
				</div>





			)
	}
}

export default Header;