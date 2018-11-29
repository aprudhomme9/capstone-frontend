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
	fetchShows = async (search) => {
		try {
			const shows = await fetch(serverUrl + 'api/shows/' + search, {
				credentials: 'include'
			})
			if(shows !== undefined) {
				const parsedShows = await shows.json();
				console.log(parsedShows, '<----parsed shows');
				return parsedShows
			} else {

			}
		} catch (err) {
			// res.send(err)
		}
		

	}
	getResults = async (search) => {
		console.log(search, '<--USER SEARCHING SHOWS');
		const query = search;
		this.fetchShows(query).then((shows) => {
			if(shows){
				this.setState({
					shows: shows.data
				})
			}
		})
	}
	render(){ 
		if(this.state.shows != undefined){
			const showPosters = this.state.shows.map((show, i) => {
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
				<SearchContainer placeholder='shows' getResults={this.getResults}/>
				{showPosters}
			</div>
			)
	} else {
		return(
			<div>
				<SearchContainer getResults={this.getResults} />
				<h1>Could Not Find Anything Matching Your Search</h1>
			</div>
			)
	}
}
}
export default ShowContainer