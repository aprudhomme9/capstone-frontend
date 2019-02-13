import React, {Component} from 'react';
import {Form, Button, Input, Segment, Container} from 'semantic-ui-react'

class SearchContainer extends Component {
	constructor(){
		super();

		this.state = {
			search: ''
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.getResults(this.state.search);
	}
	render(){
		const message = 'Search ' + this.props.placeholder + ' here...';
		return(

			<div>	
				<Form onSubmit={this.handleSubmit}>
					<Segment inverted>
          				<Input inverted icon='search' onChange={this.handleChange} type="text" value={this.state.search} name='search' placeholder={message}/>
          				<Button type="submit">Search</Button>
          			</Segment>
      			</Form>
			</div>
		)
	}
}








export default SearchContainer;