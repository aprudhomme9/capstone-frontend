console.log(Object.keys(process.env));

let serverUrl;

if(Object.keys(process.env).findIndex((key)=>key=='REACT_APP_DEPLOYED_VERSION') === -1){
	serverUrl = 'https://watch-with-friends-express.herokuapp.com/'
} else {
	serverUrl = 'http://localhost:5000/'
}

export default serverUrl