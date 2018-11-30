import React, {Component} from 'react';
import {Card, Image, Button, Grid} from 'semantic-ui-react';
import './styles.css';
class DisplayShow extends Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div>
				<div className='back'>
					<Button className='back' onClick={this.props.toggleView}>Back</Button>
				</div>
				<div className='card'>
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
	 			</div>
 				<Button>Favorite</Button>
      			<Button>Add to Watchlist</Button>
      			<Button>Recommend</Button>			
			</div>


			)
	}
}





export default DisplayShow