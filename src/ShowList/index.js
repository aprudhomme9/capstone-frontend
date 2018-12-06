import React, {Component} from 'react';
import {Grid, Card, Image} from 'semantic-ui-react';

import serverUrl from '../apiUrl';
// const serverUrl = 'http://localhost:5000/'

class ShowList extends Component{
	constructor(){
		super()
	}
	toggleView = async (e) => {
		console.log(e.currentTarget.id, '<----ID OF SHOW');
		const selectedShow = await fetch(serverUrl + 'api/shows/show/' + e.currentTarget.id);
		const parsedShow = await selectedShow.json();

		this.props.toggleView(parsedShow.data);
	}
	render(){
		if(this.props.shows != undefined){
			const showPosters = this.props.shows.map((show, i) => {
			if(show.imageUrl == 'N/A'){
				return(
				<Card id={show.imdbID} onClick={this.toggleView}>
	   				<Image src='https://bighugelabs.com/img/poster-light.jpg' />
	   				<Card.Content>
	      				<Card.Header>{show.title}</Card.Header>
	    			</Card.Content>
	 			</Card>
				)
			} else {
				return (
					<Card id={show.imdbID} onClick={this.toggleView}>
	   					<Image src={show.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{show.title}</Card.Header>
	    				</Card.Content>
	 				</Card>
				)
			}
			
		}
)
		return(
			<Grid>
				<Grid.Row textAlign='center'>
						<Grid.Column width={16}>
							<Card.Group itemsPerRow={5}>
							{showPosters}
							</Card.Group>
						</Grid.Column>
					</Grid.Row>
			</Grid>
			)
	} else {
		return(
			<div>
				<h1>Could Not Find Anything Matching Your Search</h1>
			</div>
			)
	}
	}
}



export default ShowList