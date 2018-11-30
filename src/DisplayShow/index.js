import React, {Component} from 'react';
import {Card, Image, Button, Grid} from 'semantic-ui-react';
class DisplayShow extends Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div>
				<Grid container columns={1} text-align='center' vertical='middle'>
					<Grid.Column>
					<Card height="600" width="500">
	   					<Image height="400" width="300"src={this.props.show.imageUrl} />
	   					<Card.Content>
	      					<Card.Header>{this.props.show.title}</Card.Header>
	      					<Card.Description>{this.props.show.description}</Card.Description>
	    				</Card.Content>
	    				<Card.Content extra>
	      					<p>IMDB Rating: {this.props.show.imdbRating}</p>
	      					<p>Seasons: {this.props.show.seasons}</p>
	      					<p>Actors: {this.props.show.actors}</p>
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





export default DisplayShow