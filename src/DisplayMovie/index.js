import React, {Component} from 'react';
import {Button, Card, Image, Grid} from 'semantic-ui-react';

class DisplayMovie extends Component{
	constructor(){
		super()
	}
	render(){
		console.log(this.props.movie, '<---MOVIE WITH PROPERTIES');
		return(
			<div>
				<Grid container columns={1} text-align='center' vertical='middle'>
					<Grid.Column>
					<Card>
	   					<Image height="400" width="300" src={this.props.movie.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{this.props.movie.title}</Card.Header>
	      					<Card.Description>{this.props.movie.description}</Card.Description>
	    				</Card.Content>
	    				<Card.Content extra>
	      					<p>IMDB Rating: {this.props.movie.imdbRating}</p>
	      					<p>Actors: {this.props.movie.actors}</p>
	    				</Card.Content>
	 				</Card>
	 				</Grid.Column>
	 			</Grid>	
 				<Button>Favorite</Button>
      			<Button>Add to Watchlist</Button>
      			<Button>Recommend</Button>			
				<Button onClick={this.props.toggleView}>Back</Button>
			</div>


			)
	}
}





export default DisplayMovie