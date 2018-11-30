import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieContainer from './MovieContainer';
import Header from './Header';
import ProfileContainer from './ProfileContainer';
import FriendContainer from './FriendContainer';
import GroupContainer from './GroupContainer';
import InboxContainer from './InboxContainer';
import ShowContainer from './ShowContainer';
import LoginContainer from './LoginContainer';
import LogoutContainer from './LogoutContainer';

const serverUrl = 'http://localhost:5000/'

class App extends Component {
  constructor(){
    super()

    this.state = {
      activeItem: 'Home',
      loggedIn: false,
      movie: true,
      movies: [],
      shows: [],
      user: ''
    }
  }
  handleGlobalState = (loggedIn, user) => {
    console.log('HANDLING GLOBAL STATE');
      this.setState({
        activeItem: 'Home',
        loggedIn: loggedIn
     })
      this.fetchUser().then((user) => {
        console.log(user.data, '<--------USER DATA');
        this.setState({
          user: user.data
        })
      })
  }
  fetchUser = async () => {
    try {
       const activeUser = await fetch(serverUrl + 'auth', {credentials: 'include'});
       console.log(activeUser, '<---ACTIVE USER');
       if(activeUser.status === 200) {
        const parsedUser = activeUser.json();
        console.log(parsedUser, '<----PARSED USER');
        return parsedUser
       }
       
     } catch (err) {
       // res.send(err)
     } 
  }
  fetchMovies = async (search) => {
    try {
      const movies = await fetch(serverUrl + 'api/movies/' + search, {
        credentials: 'include'
      })

      const parsedMovies = await movies.json();
      return parsedMovies
    } catch (err) {
      // res.send(err)
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
    const query = search;
    if(this.state.movie){
      this.fetchMovies(query).then((movies) => {
        if(movies){
          this.setState({
           movies: movies.data
          })
        }
      })
    } else {
      this.fetchShows(query).then((shows) => {
        if(shows){
          this.setState({
            shows: shows.data
          })
        }
      })
    }
    
  }

  handleClick = (e) => {
    this.setState({
      activeItem: e.currentTarget.text
    })
  }
  toggle = () => {
    console.log('TOGGLE');
    this.setState({
      movie: !this.state.movie
    })
  }
  // activeItem options --> Home, My Profile, Movie Buds, Groups, Inbox, Login, Logout
  // Passing down a ridiculous amount of props. App handling all important global state
  render() {
    console.log(this.state, '<---STATE');
    return (
      <div className="App">
        <Header movie={this.state.movie} getResults={this.getResults} toggle={this.toggle} loggedIn={this.state.loggedIn} activeItem={this.state.activeItem} handleClick={this.handleClick}/>

        {this.state.activeItem === 'Home' && this.state.movie ? <MovieContainer user={this.state.user} movies={this.state.movies} /> : 

        this.state.activeItem ==='Home' && !this.state.movie ? <ShowContainer user={this.state.user} shows={this.state.shows} /> : 

        this.state.activeItem === 'My Profile' ? <ProfileContainer user={this.state.user} /> : 

        this.state.activeItem === 'Groups' ? <GroupContainer user={this.state.user} /> :

        this.state.activeItem === 'Movie Buds' ? <FriendContainer user={this.state.user}/> : 

        this.state.activeItem === 'Inbox' ? <InboxContainer user={this.state.user}/> :

        this.state.activeItem === 'Login' ? <LoginContainer handleGlobalState={this.handleGlobalState}/> :

        <LogoutContainer handleGlobalState={this.handleGlobalState} /> }
      </div>
    );
  }
}

export default App;
