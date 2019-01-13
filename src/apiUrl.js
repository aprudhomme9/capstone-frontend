console.log(Object.keys(process.env), '<----OBJECT KEYS');

let serverUrl;

if(Object.keys(process.env)[2]==='REACT_APP_DEPLOYED_VERSION'){
	serverUrl = 'https://watch-with-friends-express.herokuapp.com/'
} else {
	serverUrl='http://localhost:5000/'
}
if(Object.keys(process.env).findIndex((key)=>key==='REACT_APP_DEPLOYED_VERSION') === -1){
	console.log('matching');
	serverUrl = 'https://watch-with-friends-express.herokuapp.com/'
} else {
	serverUrl = 'http://localhost:5000/'
}

export default serverUrl;