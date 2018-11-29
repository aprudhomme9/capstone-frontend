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

class App extends Component {
  constructor(){
    super()

    this.state = {
      activeItem: 'Home',
      loggedIn: false,
      movie: true
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
  // activeItem options --> Home, My Profile, Movie Buds, Groups, Inbox
  render() {
    console.log(this.state, '<---STATE');
    return (
      <div className="App">
        <Header toggle={this.toggle} loggedIn={this.state.loggedIn} activeItem={this.state.activeItem} handleClick={this.handleClick}/>

        {this.state.activeItem === 'Home' && this.state.movie ? <MovieContainer /> : 

        this.state.activeItem ==='Home' && !this.state.movie ? <ShowContainer /> : 

        this.state.activeItem === 'My Profile' ? <ProfileContainer /> : 

        this.state.activeItem === 'Groups' ? <GroupContainer /> :

        this.state.activeItem === 'Movie Buds' ? <FriendContainer/> : 

        <InboxContainer /> }
      </div>
    );
  }
}

export default App;
