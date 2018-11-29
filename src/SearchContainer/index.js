import React, {Component} from 'react';
import {Form, Button, Input} from 'semantic-ui-react'

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
		console.log(this.state.search);
		return(

			<div>
				<Form onSubmit={this.handleSubmit}>
          			<Input icon='search' onChange={this.handleChange} type="text" value={this.state.search} name='search' placeholder="search movies here"/>
          			<Button type="submit">Search</Button>

      			</Form>
			</div>

		)
	}
}








export default SearchContainer;