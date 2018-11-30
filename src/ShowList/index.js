import React, {Component} from 'react';
const serverUrl = 'http://localhost:5000/'

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
				return (
					<div>
						<br/>
						<h4>{show.title}</h4>
						<br/>
						<img id={show.imdbID} onClick={this.toggleView} height="400" width="300" key={i} src='https://bighugelabs.com/img/poster-light.jpg'/>
					</div>
				)
			} else {
				return (
					<div>
						<br/>
						<h4>{show.title}</h4>
						<br/>
						<img id={show.imdbID} onClick={this.toggleView} height="400" width="300" key={i} src={show.imageUrl}/>
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



export default ShowList