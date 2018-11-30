import React, {Component} from 'react';

import SearchContainer from '../SearchContainer';

const serverUrl = 'http://localhost:5000/'
class ShowContainer extends Component {
	constructor(){
		super();

		this.state = {
			shows: []
		}
	}
	render(){ 
		if(this.props.shows != undefined){
			const showPosters = this.props.shows.map((show, i) => {
			if(show.imageUrl == 'N/A'){
				return (
					<div>
						<br/>
						<h4>{show.title}</h4>
						<br/>
						<img height="400" width="300" key={i} src='https://bighugelabs.com/img/poster-light.jpg'/>
					</div>
				)
			} else {
				return (
					<div>
						<br/>
						<h4>{show.title}</h4>
						<br/>
						<img height="400" width="300" key={i} src={show.imageUrl}/>
					</div>
				)
			}
			
		}
)
		return(
			<div>
				{showPosters}
			</div>
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
export default ShowContainer