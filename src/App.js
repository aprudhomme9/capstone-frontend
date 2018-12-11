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
import HomeContainer from './HomeContainer';
import serverUrl from './apiUrl';


class App extends Component {
  constructor(){
    super()

    this.state = {
      activeItem: 'Home',
      loggedIn: false,
      movie: true,
      search: false,
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
    // if !loggedIn
    this.fetchUser().then((user) => {

      this.setState({
        user: user.data
      })
    })
  }
  fetchUser = async () => {
    try {
       const activeUser = await fetch(serverUrl + 'auth', {credentials: 'include'});

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

        return parsedShows
      } else {

      }
    } catch (err) {
      // res.send(err)
    }
    

  }
  // Returns search results for either movies or shows depending on state
  // Which is altered by the toggle radio in nav bar
  getResults = async (search) => {
    const query = search;
    if(this.state.movie){
      this.fetchMovies(query).then((movies) => {
        if(movies){
          this.setState({
           movies: movies.data,
           search: true,
           activeItem: 'Home'
          })
        }
      })
    } else {
      this.fetchShows(query).then((shows) => {
        if(shows){
          this.setState({
            shows: shows.data,
            search: true,
            activeItem: 'Home'
          })
        }
      })
    }
    
  }
  // Sets state via active item in navbar
  handleClick = (e) => {
    this.setState({
      activeItem: e.currentTarget.text
    })
    if(e.currentTarget.text === 'Home'){
      this.setState({
        search: false
      })
    }
  }
  toggle = () => {

    this.setState({
      movie: !this.state.movie
    })
  }
  // handleExit will handle going back to home page from search results
  handleExit = () => {
    this.setState({
      search: false
    })
  }
  // activeItem options --> Home, My Profile, Movie Buds, Groups, Inbox, Login, Logout
  // Passing down a ridiculous amount of props. App handling all important global state
  render() {

    return (
      <div className="App">
        <Header user={this.state.user} movie={this.state.movie} getResults={this.getResults} toggle={this.toggle} loggedIn={this.state.loggedIn} activeItem={this.state.activeItem} handleClick={this.handleClick}/>

        {this.state.activeItem === 'Home' && this.state.movie && this.state.search ? <MovieContainer handleGlobalState={this.handleGlobalState} user={this.state.user} movies={this.state.movies} /> : 

        this.state.activeItem ==='Home' && !this.state.movie && this.state.search ? <ShowContainer user={this.state.user} shows={this.state.shows} /> : 

        this.state.activeItem === 'Home' && !this.state.search ? <HomeContainer /> :

        this.state.activeItem === 'My Profile' ? <ProfileContainer ableToEdit={this.state.loggedIn} user={this.state.user} /> : 

        this.state.activeItem === 'Groups' ? <GroupContainer user={this.state.user} /> :

        this.state.activeItem === 'Movie Buds' ? <FriendContainer user={this.state.user}/> : 

        this.state.activeItem === 'Inbox' ? <InboxContainer loggedIn={this.state.loggedIn} handleGlobalState={this.handleGlobalState} user={this.state.user}/> :

        this.state.activeItem === 'Login' ? <LoginContainer handleGlobalState={this.handleGlobalState}/> :

        <LogoutContainer handleGlobalState={this.handleGlobalState} /> }
      </div>
    );
  }
}

export default App;
